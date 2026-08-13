import { Router } from "express";
import { SpecialtiesController } from "./controller"

export class SpecialtiesRoutes{
    
    static get routes(): Router{
        
        const router = Router()
        const controller = new SpecialtiesController()

        //RUTAS ESPECIALIDADES
        router.post('/', controller.createSpecialties)
        router.get('/', controller.getSpecialties)
        router.get('/:id', controller.getSpecialtieById)
        router.patch('/:id',controller.updtateSpecialtieById)
        router.delete('/:id', controller.deleteSpecialtieById)

        return router
    }
}