import { Code } from "typeorm/driver/mongodb/bson.typings.js"
import { User } from "../../data"
import { RegisterUserDto } from "../../domain"

enum Estado{
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}

export class UserService{
    constructor(){}


    async registerUser(userData: RegisterUserDto){
        const user = new User()

        user.nombre = userData.nombre
        user.username = userData.username
        user.email = userData.email
        user.clave = userData.clave

        try {
            return user.save()
        } catch (error) {
            throw new Error ('Internal Server Error 🧨')
        }
    }

}