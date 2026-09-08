import { compareSync, genSaltSync, hashSync } from "bcrypt" 

/**
 * Se va a encriptar la contraseña en 12 saltos
 */
export const bcryptAdapter = {
    hash: (password: string) =>{
        const salt = genSaltSync(12) //su valor por defecto son 10 saltos
        return hashSync(password, salt)
    },
    compare:(bodyPassword: string, bdPassword: string) =>{
        return compareSync(bodyPassword, bdPassword)
    }
}