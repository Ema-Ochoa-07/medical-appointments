import express, { Router } from 'express'

interface Options {
    port: number
    routes: Router
}

export class Server{
    
    private readonly port: number
    public readonly app = express()
    private readonly routes: Router

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
        
        
        //EJECUCIÓN LAS RUTAS GLOBALES
        this.app.use(this.routes)

        this.app.listen(this.port,() =>{
            console.log(`Server is running on port ${this.port} 😎`)
        })
    }
}

