import { Router } from "express";
import { PatientsController } from "./controller";
import { PatientService } from "../services/patient.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { uploadSingle } from "../../config";

export class PatientsRoutes{
    
    static get routes(): Router{
        
        const router = Router()

        const patientService = new PatientService()
        const controller = new PatientsController(patientService)
        

        //MIDDLWARE DE PROTECCIÓN DE RUTAS, si se coloca arriba de todas las rutas de ahí para abajo las protege
        router.use(AuthMiddleware.protect)

        //RUTAS PACIENTE
        router.post('', controller.createPatients)
        //Middleware-MUlter para subir archivos
        router.post('/register', uploadSingle('archivo'), controller.createPatients) //TODO LUEGO CAMBIAR EL MÉTODO A IMPOR-PATIENT

        router.get('/', controller.getPatients)
        router.get('/:id', controller.getPatientById)
        router.patch('/:id', controller.updatePatientById)
        router.delete('/:id', controller.deletePatientById)

        return router
    }
}