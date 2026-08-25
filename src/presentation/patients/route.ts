import { Router } from "express";
import { PatientsController } from "./controller";
import { PatientService } from "../services/patient.service";

export class PatientsRoutes{
    
    static get routes(): Router{
        
        const router = Router()

        const patientService = new PatientService()
        const controller = new PatientsController(patientService)

        //RUTAS PACIENTE
        router.post('', controller.createPatients)
        router.get('/', controller.getPatients)
        router.get('/:id', controller.getPatientById)
        router.patch('/:id', controller.updatePatientById)
        router.delete('/:id', controller.deletePatientById)

        return router
    }
}