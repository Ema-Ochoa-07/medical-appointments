import { Appointment, Patient } from "../../data";
import { AppointmentDto, CustomError } from "../../domain";
import { PatientService } from "./patient.service";
import { UserService } from "./user.service";

export class AppointmentService {

    constructor(
        public readonly patientService: PatientService,
        public readonly userService: UserService
    ){}

    public async createAppointment(appointmentDto: AppointmentDto){
        
        //RESOLVER 2 PROMESAS A LA VEZ
        const patientPromise = this.patientService.getPatientById(appointmentDto.pattientId)
        const userPromise = this.userService.getProfile(appointmentDto.userId)
        await Promise.all([patientPromise, userPromise])

        const appointment = new Appointment()
        appointment.cargar_archivo = appointmentDto.cargar_archivo
        appointment.especialidad = appointmentDto.especialidad
        appointment.especialista = appointmentDto.especialista
        appointment.fecha_cita = appointmentDto.fecha_cita
        try {
            return await appointment.save()
        } catch (error) {
            throw CustomError.internalServer('Internal server Error')
        }

        

        return await console.log('asdsa')
    }
}