import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CustomError, RegisterUserDto, UpdatePatientDto, UpdateRolDto } from "../../domain";
import { json } from "node:stream/consumers";
import { error } from "node:console";
import { LoginUserDto } from "../../domain/dtos/users/login-user.dto";

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

    loginUser = ( req: Request, res: Response ) => {

        const [ error, loginUserDto] = LoginUserDto.inicioSesion(req.body)
        if( error ) return res.status(400).json({message: error})

        this.userService.login(loginUserDto!)
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch((error) =>{
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({message: error.message})
            }
            return res.status(500).json({message: 'Internal Server Error 🧨'})
        })
    }

    updateRol = (req: Request, res: Response) =>{
        const { id } = req.params

        if(isNaN(Number(id))){
            return res.status(400).json({message:'El id debe ser un número'})
        }

        const [ error, updateRolDto ] = UpdateRolDto.editar(req.body)
        if(error) return res.status(422).json({message:error})

        this.userService.updateRolUser(Number(id), updateRolDto!)
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch((error) =>{
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({message: error.message})
            }
            return res.status(500).json({message:'Error internal server Error 🧨'})
        })
    }

    //Capturar el usuario
    getProfile =(req:Request, res: Response) => {
     
        console.log('controlador', req.body.sesionUser.id)
        const { id } = req.body.sesionUser

        if(isNaN(Number(id))){
            return res.status(400).json({message:'El id debe ser un número'})
        }

     this.userService.getProfile(Number(id))
     .then(data =>{
            return res.status(200).json(data)
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
