import "reflect-metadata"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"
import { PostgresDatabase } from "./data"
import { envs } from "./config/env"

//FUNCIÓN  AUTO INVOCADA -> No necesita que la llamen para que se ejecute
( async()  => {
    main()
} ) ()



async function main() {

    const postgres = new PostgresDatabase({
        host:envs.DB_HOST,
        port:envs.DB_PORT,
        username: envs.DB_USERNAME,
        database: envs.DB_DATABASE,
        password: envs.DB_PASSWORD

    })

    await postgres.connect()


    
    //Instanciar la clase -> En este caso el SERVER
    const server = new Server({
        port: envs.PORT,
        routes:AppRoutes.routes
    })

    //AHORA QUE YA TENGO ACCESO A LOS MÉTODOS DE SERVER
    //Devolución de la promesa del método ASYNCRONO DE START -> PÚBLICO
    await server.start()

}  