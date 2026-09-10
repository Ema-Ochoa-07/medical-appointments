import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { User } from "../../data";


enum Estado{
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}

enum Rol{
    Administrador = 'Administrador',
    Supervisor = 'Supervisor',
    Colaborador = 'Colaborador'
} 


export class AuthMiddleware {
    static async protect( req: Request, res: Response, next: NextFunction){
        const authorization = req.header('Authorization')
        if(!authorization) return res.status(401).json({message:'No se ha proveido ningún token'})        
        //console.log(authorization)

        //VALIDAR QUE SI NO LLEGA EL FORMATO PRIMERO BEARER INVALIDE EL TOKEN
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({message: 'Token Inválido'})

        //QUITAMOS LOS ESPACIOS Y CADA SECCIÓN SE VUELVE UN ELMENTO DE UN ARREGLO 0->'BEARER' 1->'*****'PARA OBT. SOLO TOKEN
        const token = authorization.split(' ').at(1) || ''
        console.log(token)    
        
        try {
            //Validar el token extraido en authorization y nos trae el payload con el id del usuarios con la fecha inicio expiración del token
            const payload = await JwtAdapter.validateToken<{id: number}>(token) 
            if(!payload) return res.status(401).json({message:'Token inválido'}) 
                console.log("PAYLOAD",payload)

            //Validar si el usuario aún existe ya que puede pasar que el halla eliminado el usuario aún activo el token
            const user = await User.findOne({
                where:{
                    id: payload.id, 
                    estado: Estado.Activo,
                    emailValidado: true
                }
            })

            if(!user) return res.status(401).json({message: 'Usuario inválido'})
            //USUARIO QUE QUIERE INGRESAR CON EL ID DEL TOKEN
            
            //SE especificó QUE la req.body es un objeto por que estaba llgando undefined y por eso no pasaba
            if (!req.body) {
            req.body = {}
            }

            //Ahora Se puede agregar propiedades al req.body "sesionUser" que va a ser igual al usuario dueño del token""
            req.body.sesionUser = user
            next()
            
        } catch (error) {
            return res.status(500).json({message:'Internal server error'})
        }
    }

    //SI SE CREA UN ENDPOINT PARA CAMBIAR LA CONTRASEÑA, SE DEBE VALIDAD EL TIEMPO  CON UN CAMPO EN EL QU SE HIZO EL CAMBIO EN LA BD
    //LUEGO COMPARAR ESE TIEMPO DE EXPIRACIÓN DEL TOKEN Y AHÍ DEFINIR SI SE DEBE O NO MANDAR UN ERROR 
}


