import { Server } from "./presentation/server"

//FUNCIÓN  AUTO INVOCADA -> No necesita que la llamen para que se ejecute
( async()  => {
    main()
} ) ()



async function main() {
    
    //Instanciar la clase -> En este caso el SERVER
    const server = new Server({port: 3000})

    //AHORA QUE YA TENGO ACCESO A LOS MÉTODOS DE SERVER
    //Devolución de la promesa del método ASYNCRONO DE START -> PÚBLICO
    await server.start()

}  