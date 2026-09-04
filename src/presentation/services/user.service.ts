import { Code } from "typeorm/driver/mongodb/bson.typings.js"
import { User } from "../../data"
import { CustomError, RegisterUserDto } from "../../domain"
import { bcryptAdapter } from "../../config"

enum Estado{
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}

export class UserService{
    constructor(){}


    async registerUser(userData: RegisterUserDto) {

    const existeEmail = await User.findOne({
        where: {email: userData.email }
    })

    if (existeEmail) {
        if (existeEmail.estado === Estado.Inactivo) {
            throw CustomError.badRequest('El email pertenece a un usuario inactivo')
        }
        throw CustomError.badRequest('El email ya está registrado')
    }

    const existeUsername = await User.findOne({
        where: { username: userData.username }
    })

    if (existeUsername) {
        if (existeUsername.estado === Estado.Inactivo) {
            throw CustomError.badRequest('El username pertenece a un usuario inactivo')
        }
        throw CustomError.badRequest('El username ya está registrado')
    }
    
    const user = new User()

    user.nombre = userData.nombre
    user.username = userData.username
    user.email = userData.email
    user.clave = bcryptAdapter.hash(userData.clave)

    try {
        return await user.save()

    } catch (error) {
        throw new Error('Internal Server Error 🧨')
      }
    }   
}

