import { Request, Response, Router } from "express";
import { PatientsRoutes } from "./patients/route";

export class AppRoutes{

    //Método estático no necesita ser instanciado para usarlo
    static get routes(): Router{

        const router = Router()

        
        router.use('/api/v1/patients', PatientsRoutes.routes)
                 
         
        //RUTAS ESPECIALISTA
        router.get ('/specialists',(req: Request, res: Response) =>{
            res.send('specialists')
        })             
       
        router.get ('/specialists/:id',(req: Request, res: Response) =>{
            res.send('specialists')
        })

        router.post ('/specialists',(req: Request, res: Response) =>{
            res.send('specialists')
        })
        
        router.patch ('/specialists/:id',(req: Request, res: Response) =>{
            res.send('specialists')
        })
        router.delete ('/specialists/:id',(req: Request, res: Response) =>{
            res.send('specialists')
        })



        //RUTAS ESPECIALIDAD
        router.get ('/specialties',(req: Request, res: Response) =>{
            res.send('specialties')
        })             
       
        router.get ('/specialties/:id',(req: Request, res: Response) =>{
            res.send('specialties')
        })

        router.post ('/specialties',(req: Request, res: Response) =>{
            res.send('specialties')
        })
        
        router.patch ('/specialties/:id',(req: Request, res: Response) =>{
            res.send('specialties')
        })
        router.delete ('/specialties/:id',(req: Request, res: Response) =>{
            res.send('specialties')
        })



        //RUTAS CONSULTORIO
        router.get ('/consultingrooms',(req: Request, res: Response) =>{
            res.send('consultingrooms')
        })             
       
        router.get ('/consultingrooms/:id',(req: Request, res: Response) =>{
            res.send('consultingrooms')
        })

        router.post ('/consultingrooms',(req: Request, res: Response) =>{
            res.send('consultingrooms')
        })
        
        router.patch ('/consultingrooms/:id',(req: Request, res: Response) =>{
            res.send('consultingrooms')
        })
        router.delete ('/consultingrooms/:id',(req: Request, res: Response) =>{
            res.send('consultingrooms')
        })



        //RUTAS EPSs
        router.get ('/eps_s',(req: Request, res: Response) =>{
            res.send('eps_s')
        })             
       
        router.get ('/eps_s/:id',(req: Request, res: Response) =>{
            res.send('eps_s')
        })

        router.post ('/eps_s',(req: Request, res: Response) =>{
            res.send('eps_s')
        })
        
        router.patch ('/eps_s/:id',(req: Request, res: Response) =>{
            res.send('eps_s')
        })
        router.delete ('/eps_s/:id',(req: Request, res: Response) =>{
            res.send('eps_s')
        })
          
        
        //RUTAS CITAS
        router.get ('/appointments',(req: Request, res: Response) =>{
            res.send('appointments')
        })
        router.get ('/appointments/:id',(req: Request, res: Response) =>{
            res.send('appointments')
        })
        router.post ('/appointments',(req: Request, res: Response) =>{
            res.send('appointments')
        })
        router.patch ('/appointments/:id',(req: Request, res: Response) =>{
            res.send('appointments')
        })
        router.delete ('/appointments/:id',(req: Request, res: Response) =>{
            res.send('appointments')
        })


        //RUTAS CE ESPERA FACTURACIÓN
        router.get ('/cewait_billings',(req: Request, res: Response) =>{
            res.send('cewait_billings')
        })
        router.get ('/cewait_billings/:id',(req: Request, res: Response) =>{
            res.send('cewait_billings')
        })
        router.post ('/cewait_billings',(req: Request, res: Response) =>{
            res.send('cewait_billings')
        })
        router.patch ('/cewait_billings/:id',(req: Request, res: Response) =>{
            res.send('cewait_billings')
        })
        router.delete ('/cewait_billings/:id',(req: Request, res: Response) =>{
            res.send('cewait_billings')
        })



        //RUTAS CE ESPERA POR CONSULTA
        router.get ('/cewait_doctoroffices',(req: Request, res: Response) =>{
            res.send('cewait_doctoroffices')
        })
        router.get ('/cewait_doctoroffices/:id',(req: Request, res: Response) =>{
            res.send('cewait_doctoroffices')
        })
        router.post ('/cewait_doctoroffices',(req: Request, res: Response) =>{
            res.send('cewait_doctoroffices')
        })
        router.patch ('/cewait_doctoroffices/:id',(req: Request, res: Response) =>{
            res.send('cewait_doctoroffices')
        })
        router.delete ('/cewait_doctoroffices/:id',(req: Request, res: Response) =>{
            res.send('cewait_doctoroffices')
        })


        //RUTAS URG ESPERA POR TIRAGE
        router.get ('/urgwait_triages',(req: Request, res: Response) =>{
            res.send('urgwait_triages')
        })
        router.get ('/urgwait_triages/:id',(req: Request, res: Response) =>{
            res.send('urgwait_triages')
        })
        router.post ('/urgwait_triages',(req: Request, res: Response) =>{
            res.send('urgwait_triages')
        })
        router.patch ('/urgwait_triages/:id',(req: Request, res: Response) =>{
            res.send('urgwait_triages')
        })
        router.delete ('/urgwait_triages/:id',(req: Request, res: Response) =>{
            res.send('urgwait_triages')
        })



        //RUTAS URG ESPERA POR CONSULTA
        router.get ('/urgwait_doctoroffices',(req: Request, res: Response) =>{
            res.send('urgwait_doctoroffices')
        })
        router.get ('/urgwait_doctoroffices/:id',(req: Request, res: Response) =>{
            res.send('urgwait_doctoroffices')
        })
        router.post ('/urgwait_doctoroffices',(req: Request, res: Response) =>{
            res.send('urgwait_doctoroffices')
        })
        router.patch ('/urgwait_doctoroffices/:id',(req: Request, res: Response) =>{
            res.send('urgwait_doctoroffices')
        })
        router.delete ('/urgwait_doctoroffices/:id',(req: Request, res: Response) =>{
            res.send('urgwait_doctoroffices')
        })



        //RUTAS ROLES
        router.get ('/roles',(req: Request, res: Response) =>{
            res.send('roles')
        })
        router.get ('/roles/:id',(req: Request, res: Response) =>{
            res.send('roles')
        })
        router.post ('/roles',(req: Request, res: Response) =>{
            res.send('roles')
        })
        router.patch ('/roles/:id',(req: Request, res: Response) =>{
            res.send('roles')
        })
        router.delete ('/roles/:id',(req: Request, res: Response) =>{
            res.send('roles')
        })


        //RUTAS USUARIOS
        router.get ('/users',(req: Request, res: Response) =>{
            res.send('users')
        })
        router.get ('/users/:id',(req: Request, res: Response) =>{
            res.send('users')
        })
        router.post ('/users',(req: Request, res: Response) =>{
            res.send('users')
        })
        router.patch ('/users/:id',(req: Request, res: Response) =>{
            res.send('users')
        })
        router.delete ('/users/:id',(req: Request, res: Response) =>{
            res.send('users')
        })



        //RUTAS ACTIONS
        router.get ('/actions',(req: Request, res: Response) =>{
            res.send('actions')
        })
        router.get ('/actions/:id',(req: Request, res: Response) =>{
            res.send('actions')
        })
        router.post ('/actions',(req: Request, res: Response) =>{
            res.send('actions')
        })
        router.patch ('/actions/:id',(req: Request, res: Response) =>{
            res.send('actions')
        })
        router.delete ('/actions/:id',(req: Request, res: Response) =>{
            res.send('actions')
        })
        

        //PARÉMETROS DEL SISTEMA
        router.get ('/sistemparams',(req: Request, res: Response) =>{
            res.send('sistemparams')
        })
        router.get ('/sistemparams/:id',(req: Request, res: Response) =>{
            res.send('sistemparams')
        })
        router.post ('/sistemparams',(req: Request, res: Response) =>{
            res.send('sistemparams')
        })
        router.patch ('/sistemparams/:id',(req: Request, res: Response) =>{
            res.send('sistemparams')
        })
        router.delete ('/sistemparams/:id',(req: Request, res: Response) =>{
            res.send('sistemparams')
        })
        
     
        return router
    }
}
 