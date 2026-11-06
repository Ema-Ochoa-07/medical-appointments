import { Between } from "typeorm";
import { readExcel } from "../../config";
import { Appointment, Patient, Rol, User } from "../../data";
import { AppointmentDto, CustomError } from "../../domain";
import { ImportAppointmentDto } from "../../domain/dtos/appointments/import-appointment.dto";
import { PatientService } from "./patient.service";
import { UserService } from "./user.service";


enum Estado{
    Programada = 'Programada',
    Atendida = 'Atendida',
    Cancelada = 'Cancelada',
    No_asistio = 'No_asistio'
}

export class AppointmentService {

    constructor(
        public readonly patientService: PatientService,
        public readonly userService: UserService
    ){}

    public async createAppointment(appointmentDto: AppointmentDto){
        
        //RESOLVER 2 PROMESAS A LA VEZ
        const patientPromise = this.patientService.getPatientById(appointmentDto.patientId)
        const userPromise = this.userService.getProfile(appointmentDto.userId)
        const arrPromise = await Promise.all([patientPromise, userPromise])

        const appointment = new Appointment()
        
        appointment.patient = arrPromise[0]
        appointment.user = arrPromise[1]

        appointment.especialidad = appointmentDto.especialidad
        appointment.especialista = appointmentDto.especialista
        appointment.fecha_cita = appointmentDto.fecha_cita
        appointment.observacion = appointmentDto.observacion
        try {
            return await appointment.save()
        } catch (error) {
            throw CustomError.internalServer('Internal server Error')
        }
    }   


    public async getAppointments(){

        try {
            return await Appointment.find({
                where:{
                    estado: Estado.Programada
                }
            })
        } catch (error) {
            throw CustomError.internalServer("Internal Server Error 🧨")
        }
    }


    public async getAppointmentById(id: number){

        const appointment = await Appointment.findOne({
            where:{
                id: id,
                  estado: Estado.Programada
            },
                relations: { user: true, patient: true },
                select:{
                    user:{
                        id:true,
                        nombre: true,
                        username:true
                    },
                    patient:{
                       id: true ,
                       numero_documento: true,
                       tipo_documento: true,
                       nombre: true,
                       fecha_nacimiento:true,
                       genero: true,
                       direccion: true,
                       email: true 
                    }
                }
        })
        if(!appointment) throw CustomError.notFound("Cita no encontrada")
          return  appointment
    }


    public async deleteAppointment(id: number, userSesion: User){

        const appointment = await this.getAppointmentById(id)
        if( userSesion.rol == Rol.Colaborador) throw CustomError.unAuthorized('Error!! usted no tiene permisos para ejecutrar esta acción') 
        appointment.estado = Estado.Cancelada

        try {
            await appointment.save()
            return 'Cita Cancelada'
        } catch (error) {
             throw CustomError.internalServer("Internal Server Error 🧨")
        }

    }   


     //******ESTIPULAR PREFIJOS A ESPECIALIDADES********** */
    
    public obtenerPrefijos(especialidad: string){
        const prefijos: { [key: string]: string } = {
            'Medicina General': 'MG',
            'Pediatria': 'PED',
            'Traumatologia': 'TR',
            'Urología': 'UR',
        }
        if(prefijos[especialidad])
            return prefijos[especialidad]
        else{
            return especialidad.trim().substring(0,3).toUpperCase()
        }
    }


    //******GENERCIÓN AUTOMÁTICA DEL CÓDIGO********** */
    public async generarCodigoTurno(especialidad: string, fechaAtencion: Date){
        
        const prefijo = this.obtenerPrefijos(especialidad)

        // Capturamos la fecha de Atención original para luego poder modificarla
        const inicioDia = new Date(fechaAtencion)

        //Modificamos nuestra fecha de atención como la hora exacta en donde INICIA EL DÍA
        // (0 horas, 0 minutos, 0 segundos, 0 milisegundos) 
        inicioDia.setHours(0, 0, 0, 0)

        const finDia = new Date(inicioDia)
        finDia.setHours(23,59,59,999)
        
        //CONSULTAR LAS CITAS EXISTENTES EN ESE DÍA
        const citasExistentes = await Appointment.find({
            where:{
                especialidad: especialidad,
                fecha_cita: Between(inicioDia, finDia)
            }
        })

        //ENCONTRAR EL CONSECUTIVO MAYOR
        let consecutivo = 0
        for( const cita of citasExistentes){
            
            //SE COMPRUEBA QUE EL CONSECUTIVO COMIENCE CON EL PREFIJO CORRESPONDIENTE (STARTSWITH)
            if( cita.codigo_turno.startsWith(prefijo)){

                //EXTRAE EL NÚMERO DEL TAMAÑO DEL PREFIJO
                const numero = Number(cita.codigo_turno.substring(prefijo.length))

                if(numero > consecutivo){
                    consecutivo = numero
                }
            }               
        }
        consecutivo = consecutivo +1
        return prefijo+consecutivo
    }


    //******ESTANDARIZAR FORMATO DE FECHA********** */
    /** en-CA — Inglés de Canadá     Año - Mes - Día  2026-11-05
        es-CO — Español de Colombia  Día / Mes / Año  05/11/2026
        es-ES — Español de España    Día / Mes / Año  05/11/2026
        en-US — Inglés de USA        Mes / Día / Año  11/29/2026
        en-GB — Inglés británico     Día / Mes / Año  05/11/2026*/
     
    public darFormatoFecha (fechaAtencion: Date){
        const formatoFecha  = new Intl.DateTimeFormat('en-CA',{
            timeZone: 'America/Bogota',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })      
        return formatoFecha.format(fechaAtencion) 

    }

    

    //******PROCESOMIENTO INDIVIDUAL DE CARGUE DEL ACHIVO********** */
    public async importAppointments(importAppointmentDto: ImportAppointmentDto, sesionUser: User){
        
        //console.log(sesionUser.id)

        const patientExist = await Patient.findOne({
            where:{
                numero_documento: importAppointmentDto.numero_documento
            }
        })
        // PACIENTE EXISTENTE
        let patients: Patient
        let tipoPaciente: string

        if(patientExist) {
            if(patientExist.nombre !== importAppointmentDto.paciente){
                return{
                    tipo: 'Inconsistencia',
                    paciente:{
                        numero_documento: importAppointmentDto.numero_documento,
                        nombreExcel: importAppointmentDto.paciente,
                        nombreSistema: patientExist.nombre,
                        motivo: `El nombre del paciente en el archivo Ecxel no coincide con su # identificación en nuestra Base de Datos  ${importAppointmentDto.numero_documento}`
                    }
                }
            }
            patients = patientExist 
            tipoPaciente = 'Existente'
        } 
        // PACIENTE NUEVO
        else{
            patients = new Patient()
            patients.numero_documento = importAppointmentDto.numero_documento
            patients.nombre = importAppointmentDto.paciente
            patients.telefono = importAppointmentDto.telefono
            await patients.save()
            tipoPaciente = 'Nuevo'
        }       
        
        const appointments = new Appointment()
        appointments.especialidad = importAppointmentDto.especialidad
        appointments.especialista = importAppointmentDto.especialista
        appointments.fecha_cita = importAppointmentDto.hora

        appointments.codigo_turno = await this.generarCodigoTurno( 
            appointments.especialidad, appointments.fecha_cita)

        appointments.observacion = importAppointmentDto.observacion

        appointments.patient = patients
        appointments.user = sesionUser

        try {
        await appointments.save()
        console.log('Cita guardada:', appointments)
        return{
            tipo: tipoPaciente
        }
        } catch (error) {
            console.log(error)
            throw CustomError.internalServer("Internal Server Error 🧨")
        }
    }


 //******PROCESOMIENTO MASIVO DE CARGUE DEL ACHIVO********** */

    public async procesarExcel(file: Express.Multer.File, sesionUser: User, fechaAtencion: Date){

    const filas = readExcel(file.buffer)

    let citasCreadas = 0
    let pacientesNuevos = 0
    let pacientesExistentes = 0
    const inconsistencias: any[] = []
    //Convertir el objeto fechaSeleccionada a string y luego escoger sus primero 10 caracteres YYYY-MM-DD   
    const fechaSeleccionadaUser = fechaAtencion.toString().substring(0, 10)

    for(const fila of filas){

        const fechaCita = new Date(fila.hora)
        const fechaExcel = this.darFormatoFecha(fechaCita) //Estandarizar las fechas de cada cita
        const fechaSeleccionada = fechaSeleccionadaUser

        if(fechaExcel !== fechaSeleccionada){

            inconsistencias.push({
                paciente: fila.paciente,
                fechaSeleccionada: fechaSeleccionada,
                fechaExcel: fechaExcel,
                motivo: 'La fecha de la CITA no coincide con la fecha de ATENCIÓN seleccionada'
            })

        } else {

            const resultado = await this.importAppointments(fila, sesionUser)

            if(resultado.tipo == 'Nuevo'){
                citasCreadas++
                pacientesNuevos++
            }

            if(resultado.tipo == 'Existente'){
                citasCreadas++
                pacientesExistentes++
            }

            if(resultado.tipo == 'Inconsistencia'){
                inconsistencias.push(resultado.paciente)
            }
        }
    }

    return {
        citasCreadas,
        pacientesNuevos,
        pacientesExistentes,
        inconsistencias
    }
}
            

}