import { Request, Response, Router } from "express";

export class AppRoutes{

    //Método estático no necesita ser instanciado para usarlo
    static get routes(): Router{

        const router = Router()

        //RUTAS CONSULTOR
        router.get ('/consultants',(req: Request, res: Response) =>{
            res.send('consultants')
        })             
       
        router.get ('/consultants/:id',(req: Request, res: Response) =>{
            res.send('consultants')
        })

        router.post ('/consultants',(req: Request, res: Response) =>{
            res.send('consultants')
        })
        
        router.patch ('/consultants',(req: Request, res: Response) =>{
            res.send('consultants')
        })
        router.delete ('/consultants',(req: Request, res: Response) =>{
            res.send('consultants')
        })



        //RUTAS PACIENTE
        router.get ('/patients',(req: Request, res: Response) =>{
            res.send()
        })
        router.get ('/patients/:id',(req: Request, res: Response) =>{
            res.send('patients')
        })
        router.post ('/patients',(req: Request, res: Response) =>{
            res.send('patients')
        })
        router.patch ('/patients',(req: Request, res: Response) =>{
            res.send('patients')
        })
        router.delete ('/patients',(req: Request, res: Response) =>{
            res.send('patients')
        })

        return router
    }
}
 