import { regularExps } from "../../../config"

export class RegisterUserDto {
    private constructor(
        public readonly nombre: string,
        public readonly username: string,
        public readonly clave: string,
        public readonly email: string
    ){}

    static register(object: {[key: string]: any}): [string | undefined, RegisterUserDto?]{
        const { nombre, username, clave, email } = object


        if(!nombre) return ['Falta el nombre']
        if(!username) return ['Faltan el username']

        if(!email) return ['Falta el correo']
        if(!regularExps.email.test(email)) return ['Correo inválido']

        if(!clave) return ['Falta la contraseña']     
        if(!regularExps.clave.test(clave)) return ['La contraseña debe tener mínimo 6 caracteres, al menos una Mayúsculua, una minúsculas,un número y un caracter especial']     
        
        return [undefined, new RegisterUserDto(nombre, username, clave, email )]
    }

}