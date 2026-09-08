
export class LoginUserDto {
    private constructor(
        public readonly username: string,
        public readonly clave: string,
    ){}

    static inicioSesion(object: {[key: string]: any}): [string | undefined, LoginUserDto?]{
        const { username, clave } = object


        if(!username) return ['Falta el usuario']
        if(!clave) return ['Falta la contraseña']     
        
        return [undefined, new LoginUserDto( username, clave )]
    }

}