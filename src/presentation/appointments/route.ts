import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AppointmentController } from "./controller";

export class AppointmentRoutes{
    
    static get routes(): Router{
        
        const router = Router()

        const controller = new AppointmentController()
        

        //RUTAS APPOINTEMENT
        router.post('', controller.createAppointment)

        return router
    }
}