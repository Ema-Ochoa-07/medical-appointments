import express from 'express'

interface Options {
    port: number
}

export class Server{
    
    private readonly port: number
    public readonly app = express()

    constructor(options: Options){
        this.port = options.port
    }


    /*Método (start) PARA LANZAR LA APLICACIÓN
    Este método va hacer AZÍNCRONO para que se vuelva una promesa
    */
    async start(){
        //Middleware 
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true})) //Con esto angular puede recibir paquetes en un formato reconocible

        this.app.listen(this.port,() =>{
            console.log(`Server is running on port ${this.port} 😎`)
        })
    }
}

