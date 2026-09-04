import jwt, { SignOptions } from 'jsonwebtoken'
import { envs } from './env'

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
}