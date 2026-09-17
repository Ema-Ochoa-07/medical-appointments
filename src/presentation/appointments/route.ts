import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AppointmentController } from "./controller";
import { AppointmentService } from "../services/appointment.service";
import { PatientService } from "../services/patient.service";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";

export class AppointmentRoutes{
    
    static get routes(): Router{
        
        const router = Router()

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL,
        )
        const userService = new UserService(emailService)
        const patientService = new PatientService()
        const appointmentService = new AppointmentService(patientService, userService)
        const controller = new AppointmentController(appointmentService)
        
        //RUTAS APPOINTEMENT
        router.post('', controller.createAppointment)
        router.get('/', controller.getAppointmets)
        router.get('/:id', controller.getAppointmentId)
        router.delete('/:id',AuthMiddleware.protect, controller.deleteAppointmentId)

        return router
    }
}