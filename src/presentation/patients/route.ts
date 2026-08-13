import { Router } from "express";
import { PatientsController } from "./controller";

export class PatientsRoutes{
    
    static get routes(): Router{
        
        const router = Router()
        const controller = new PatientsController()

        //RUTAS PACIENTE
        router.post('', controller.createPatients)
        router.get('/', controller.getPatients)
        router.get('/:id', controller.getPatientById)
        router.patch('/:id', controller.updatePatientById)
        router.delete('/:id', controller.deletePatientById)

        return router
    }
}