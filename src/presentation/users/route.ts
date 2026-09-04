import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { env } from "node:process";
import { envs } from "../../config";
//import { PatientsController } from "./controller";
//import { PatientService } from "../services/patient.service";

export class UsersRoutes{
    
    static get routes(): Router{
        
        const router = Router()

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY
        )
        const userService = new UserService(emailService)
        const controller = new UserController(userService)

        //RUTAS USER

        router.post('', controller.registerUser)

        return router
    }
}