import { Appointment, Patient } from "../../data";
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
            console.log('❌ ERROR AL GUARDAR CITA:', error)
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

        try {
            const appointment = Appointment.findOne({
                where:{
                    id: id,
                    estado: Estado.Programada
                }
            })
            return await appointment
        } catch (error) {
            throw CustomError.internalServer("Internal Server Error 🧨")
        }
    }

}