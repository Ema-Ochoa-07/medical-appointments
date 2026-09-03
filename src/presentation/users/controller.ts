import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CustomError, RegisterUserDto } from "../../domain";
import { json } from "node:stream/consumers";

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
    
}  
