import { Code } from "typeorm/driver/mongodb/bson.typings.js"
import { User } from "../../data"
import { CustomError, RegisterUserDto } from "../../domain"
import { bcryptAdapter, envs } from "../../config"
import { JwtAdapter } from "../../config/jwt.adapter"
import { EmailService } from "./email.service"
import { Subject } from "typeorm/persistence/Subject.js"
import { LoginUserDto } from "../../domain/dtos/users/login-user.dto"

enum Estado{
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}


export class UserService{
    constructor(
        private readonly  emailService: EmailService

    ){}


    public async registerUser(userData: RegisterUserDto) {

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
        await user.save()
        
        await this.sendEmailValidationEmail(user.email)

        //El id que se va a pasar al token solo aparece en el momento que se crea el user
        const token = await  JwtAdapter.generateToken({id: user.id})
        if ( !token ) throw CustomError.internalServer('Error al crear el JWT ')
        return {
            //SE LA COMENTÓ POR QUE SOLO ES VÁLIDA EN APP QUE UNA VEZ SE REGISTRE SE LOGGEE AUTOMATICAMENTE
            //PERO ACÁ NO TIENE SENTIDO QUE TE LOGUEES SI AÚN NO HAS ACTIVADO LA CUENTA
            //token: token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
            }
    }

    } catch (error) {
        throw new Error('Internal Server Error 🧨')
      }
    }   



    public sendEmailValidationEmail = async (email: string) => {
        const token = await JwtAdapter.generateToken({email})
        if( !token ) throw CustomError.internalServer('Error al generar el token')

        const link = `${envs.WEBSERVICE_URL}/users/validate-email/${token}`
        const html = `
        <h1> Validación de correo </h1>
        <p> Click aquí para validar el correo </p>
        <a href="${link}"> Validación de correo  ${email} </a>
        `
   
        const isSent = this.emailService.sendEmail({
                to: email,
                subject: 'Validación de correo',
                htmlBody: html
        })

        if(!isSent) throw CustomError.internalServer('Error al enviar el correo')

        return true
    }

    public validateEmail = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token)
        if(!payload) throw CustomError.unAuthorized('Token Inválido')

        const { email } = payload as { email: string }
        if(!email) throw CustomError.internalServer('El correo no tuvo el token')

        const user = await User.findOne({
            where:{
                email: email
            }
        })
        if( !user ) throw CustomError.internalServer('El correo no existe')
            user.emailValidado = true

        try {
            await user.save()
            return true
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }

    }

    public async login(loginUserDto: LoginUserDto){

     const user = await User.findOne({
        where:{
            username: loginUserDto.username,
            estado: Estado.Activo
        }
     })
        if(!user) throw CustomError.unAuthorized('Credenciales inválidas')

        //COMPARAR SI LAS CONTRASEAS SON IGUALES
        const isMatching = bcryptAdapter.compare(loginUserDto.clave, user.clave )
        if(!isMatching) throw CustomError.unAuthorized('Credenciales inválidas')
        // GENERAR TOKEN
        const token = await JwtAdapter.generateToken({id: user.id})
        if(!token) throw CustomError.internalServer('Error al crear el token')

        return {
            token: token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
            }
        }
    }
}

