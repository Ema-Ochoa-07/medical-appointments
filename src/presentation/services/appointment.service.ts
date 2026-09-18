import { Appointment, Patient, Rol, User } from "../../data";
import { AppointmentDto, CustomError } from "../../domain";
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

        appointment.cargar_archivo = appointmentDto.cargar_archivo
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
                       nombres: true,
                       apellidos: true,
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

}