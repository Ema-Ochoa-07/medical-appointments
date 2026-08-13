import { Router } from "express";
import { SpecialistsController } from "./controller"

export class SpecialtiesRoutes{
    
    static get routes(): Router{
        
        const router = Router()
        const controller = new SpecialistsController()

        //RUTAS ESPECIALIDADES
        router.post('/', controller.createSpecialists)
        router.get('/', controller.getSpecialists)
        router.get('/:id', controller.getSpecialistById)
        router.patch('/:id',controller.updtateSpecialistById)
        router.delete('/:id', controller.deleteSpecialistById)

        return router
    }
}