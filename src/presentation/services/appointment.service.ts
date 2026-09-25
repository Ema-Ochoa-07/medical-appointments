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



     //******PROCESO DE CARGUE DEL ACHIVO********** */

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
                        nombreSistema: patientExist.nombre
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
        appointments.observacion = importAppointmentDto.observacion

        appointments.patient = patients
        appointments.user = sesionUser

        try {
        await appointments.save()
        return{
            tipo: tipoPaciente
        }
        } catch (error) {
            console.log(error)
            throw CustomError.internalServer("Internal Server Error 🧨")
        }
    }


    public async procesarExcel(file: Express.Multer.File, sesionUser: User){

        const filas = readExcel(file.buffer)

        let citasCreadas = 0
        let pacientesNuevos = 0
        let pacientesExistentes = 0
        const inconsistencias: any[] = []

        for(const fila of filas){
            console.log(fila)
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
        return{
            citasCreadas,
            pacientesNuevos,
            pacientesExistentes,
            inconsistencias
        }
    }


}