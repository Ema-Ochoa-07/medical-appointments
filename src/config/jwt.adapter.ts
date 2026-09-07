import jwt, { SignOptions } from 'jsonwebtoken'
import { envs } from './env'
import { IsNull } from 'typeorm'

export class JwtAdapter {

    static async generateToken( payload: any, duration: SignOptions['expiresIn'] = '3h' ) {
        return new Promise((resolve) => {

            jwt.sign(
                payload,
                envs.JWT_SEED,
                { expiresIn: duration },
                (err, token) => {

                    if (err) return resolve(null)

                    resolve(token)
                }
            )
        })
    }

    static async validateToken<T>(token:string): Promise <T | null >{
        return new Promise ((resolve) =>{

            jwt.verify(token, envs.JWT_SEED, (err, decode) =>{
                if( err) return resolve(null)
                
                resolve(decode as T)
            })
        })
    }
}