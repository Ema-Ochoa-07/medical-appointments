import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CustomError, RegisterUserDto } from "../../domain";
import { json } from "node:stream/consumers";
import { error } from "node:console";

export class UserController{
   
    constructor(
        public readonly userService: UserService
    ){}
    
    registerUser = ( req: Request, res: Response )=>{
        const [ error, registerUserDto] = RegisterUserDto.register(req.body)
        if(error) return res.status(422).json({meesage: error})

        this.userService.registerUser(registerUserDto!)
        .then(user =>{
            return res.status(201).json(user)
        })
        .catch((error) =>{
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({message: error.message})
            }
            return res.status(500).json({message: 'Internal Server Error 🧨'})
        })
    }


    validateEmail = ( req: Request, res: Response )=>{
        const { token } = req.params

        //validación para que TypeScript entienda que si o si llega un string
        if (!token || Array.isArray(token)) {
        return res.status(400).json({
            message: 'Token inválido'
        })
    }

        this.userService.validateEmail( token )
        .then(() =>{
            res.json('El coreo fue validado satisfactoriamente')
        })
        .catch((error) =>{
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({message: error.message})
            }
            return res.status(500).json({message: 'Internal Server Error 🧨'})
        })
    }
    
}  
