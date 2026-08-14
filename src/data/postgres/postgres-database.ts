import { DataSource } from "typeorm";

interface Options {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string
}

export class PostgresDatabase{
    private datasource: DataSource

    constructor(options: Options) {
        this.datasource = new DataSource({
            type:"postgres",
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,        
            database: options.database,
            //entities

            synchronize: true,   // En producción no se recomienda SYNCRHONIZE sino migraciones
            //ssl:{rejectUnauthorized: false}   SE UTILIZA PAR REALIZAR CONEXIONES WEB DE BASES DE DATOS
        })
    }

    async connect(){
        try {
            await this.datasource.initialize()
            console.log('Connected to database 👌')
        } catch(error){
            console.log(error)
        }
    }
}
