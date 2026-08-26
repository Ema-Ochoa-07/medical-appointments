export class CustomError extends Error{

    
    /**
     * EL MÉTODO CONSTRUCTOR PRÁCTICAMENTE ES UN MÉTODO ESPECIAL 
     * QUE SE EJECUTA CUANDO CUANDO SE INSTANCIA LA CLASE
     * PREMITIENDO ENVIAR ATRIBUTOS, INYECCIÓN DE DEPENDENCIAS, MÉTODOS ETC
     */    
    constructor(
        public readonly message: string, //Va hacer el mensaje de Error que quiera enviar
        public readonly statusCode:number //Código estado del error
    ){
        //MÉTODO ESPECIAL QUE HACE UN LLAMADO A LA CLASE ERROR
        super(message)
    }

    //Cuando volvemos un método estático (STATIC) no es necesario instanciar la clase 

    static badRequest(message:string){
        return new CustomError(message, 400)
    }

    static unAuthorized(message:string){
        return new CustomError(message, 401)
    }

    static notFound(message: string){
        return new CustomError(message, 404)
    }

    //ESTE SE VA A CAMBIAR LUEGO
    static internalServer(message: string){
        return new CustomError(message, 500)
    }
}