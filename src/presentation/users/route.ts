import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
//import { PatientsController } from "./controller";
//import { PatientService } from "../services/patient.service";

export class UsersRoutes{
    
    static get routes(): Router{
        
        const router = Router()

        const userService = new UserService()
        const controller = new UserController(userService)

        //RUTAS USER

        router.post('', controller.registerUser)

        return router
    }
}