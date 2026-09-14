import express, { Router } from 'express'
import cors from 'cors'
import helmet from 'helmet'

interface Options {
    port: number
    routes: Router
}

export class Server{
    
    private readonly port: number
    public readonly app = express()
    private readonly routes: Router
    private readonly aceptedOrigin: string[] = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4200']

    constructor(options: Options){
        this.port = options.port
        this.routes = options.routes
    }


    /*Método (start) PARA LANZAR LA APLICACIÓN
    Este método va hacer AZÍNCRONO para que se vuelva una promesa
    */
    async start(){
        //Middleware 
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true})) //Con esto angular puede recibir paquetes en un formato reconocible
        
        //IMPLEMENTAR CORS
        this.app.use( cors ({
            origin: (origin, callback) => {

                if(!origin){
                    return callback(null, true)
                }

                if(this.aceptedOrigin.includes(origin!)){
                    return callback(null, true)
                }
                return callback( new Error ('Not allowed by CORS'))
            }
        }))

        //AUMENTAR SEGURIDAD
        this.app.use( helmet() )

        //EJECUCIÓN LAS RUTAS GLOBALES
        this.app.use(this.routes)

        this.app.listen(this.port,() =>{
            console.log(`Server is running on port ${this.port} 😎`)
        })
    }
}

