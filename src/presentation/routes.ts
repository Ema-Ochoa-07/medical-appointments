import { Request, Response, Router } from "express";
import { PatientsRoutes } from "./patients/route";
import { SpecialtiesRoutes } from "./specialties/route";

export class AppRoutes{

    //Método estático no necesita ser instanciado para usarlo
    static get routes(): Router{

        const router = Router()

        
        //RUTAS PACIENTES
        router.use('/api/v1/patients', PatientsRoutes.routes)

        //RUTAS ESPECIALIDAD
        router.use('/api/v1/specialties', SpecialtiesRoutes.routes)
         
        //RUTAS ESPECIALISTA
        router.use('/api/v1/specialists', SpecialtiesRoutes.routes)

        
        //RUTAS CONSULTORIO
        //RUTAS EPSs
        //RUTAS CITAS
        //RUTAS CE ESPERA FACTURACIÓN
        //RUTAS CE ESPERA POR CONSULTA
        //RUTAS URG ESPERA POR TIRAGE
        //RUTAS URG ESPERA POR CONSULTA
        //RUTAS ROLES
        //RUTAS USUARIOS
        //RUTAS ACTIONS
        //PARÉMETROS DEL SISTEMA
             
        return router
    }
}
 