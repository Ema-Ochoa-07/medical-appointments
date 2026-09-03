
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
        if(!clave) return ['Falta la contraseña']        
        if(!email) return ['Falta el email']   
        
        return [undefined, new RegisterUserDto(nombre, username, clave, email )]
    }

}