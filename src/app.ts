import "reflect-metadata"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"
import { PostgresDatabase } from "./data"

//FUNCIÓN  AUTO INVOCADA -> No necesita que la llamen para que se ejecute
( async()  => {
    main()
} ) ()



async function main() {

    const postgres = new PostgresDatabase({
        host:'localhost',
        port:5432,
        username: 'postgres',
        password: 'postgresEma07',
        database: 'appointment_db'
    })

    await postgres.connect()


    
    //Instanciar la clase -> En este caso el SERVER
    const server = new Server({
        port: 3000,
        routes:AppRoutes.routes
    })

    //AHORA QUE YA TENGO ACCESO A LOS MÉTODOS DE SERVER
    //Devolución de la promesa del método ASYNCRONO DE START -> PÚBLICO
    await server.start()

}  