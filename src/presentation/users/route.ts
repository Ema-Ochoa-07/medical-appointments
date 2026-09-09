import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { env } from "node:process";
import { envs } from "../../config";

export class UsersRoutes{
    
    static get routes(): Router{
        
        const router = Router()

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        )
        const userService = new UserService(emailService)
        const controller = new UserController(userService)

        //RUTAS USER

        router.post('', controller.registerUser)
        router.get('/validate-email/:token', controller.validateEmail)
        router.post('/login', controller.loginUser)
        router.patch('/update-rol/:id', controller.updateRol)

        return router
    }
}