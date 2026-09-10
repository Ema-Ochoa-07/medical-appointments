import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { env } from "node:process";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";

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

        //MIDDLWARE DE PROTECCIÓN DE RUTAS, si se coloca arriba de todas las rutas de ahí para abajo las protege
        //router.use(AuthMiddleware.protect)

        //RUTAS USER
        router.post('', controller.registerUser)
        router.get('/validate-email/:token', controller.validateEmail)
        router.post('/login', controller.loginUser)

        //capturar el usuario
        router.get('/profile', AuthMiddleware.protect, controller.getProfile) // Solo protege a esa ruta en específico
       
        router.patch('/update-rol/:id', AuthMiddleware.protect , controller.updateRol)

        return router
    }
}