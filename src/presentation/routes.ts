import { Request, Response, Router } from "express";
import { PatientsRoutes } from "./patients/route";
import { UsersRoutes } from "./users/route";
import { AppointmentRoutes } from "./appointments/route";

export class AppRoutes{

    //Método estático no necesita ser instanciado para usarlo
    static get routes(): Router{

        const router = Router()

        
        //RUTAS PACIENTES
        router.use('/api/v1/patients', PatientsRoutes.routes)

        //RUTAS USURAIOS
        router.use('/api/v1/users', UsersRoutes.routes)
       
        //RUTAS CITAS
        router.use('/api/v1/appointments', AppointmentRoutes.routes)

        //RUTAS ATENCIÓN URG

      
        //RUTAS CONSULTORIO
        //RUTAS EPSs
        //RUTAS CE ESPERA FACTURACIÓN
        //RUTAS CE ESPERA POR CONSULTA
        //RUTAS URG ESPERA POR TIRAGE
        //RUTAS URG ESPERA POR CONSULTA
        //RUTAS ROLES
        //RUTAS ACTIONS
        //PARÉMETROS DEL SISTEMA
             
        return router
    }
}
 