import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";
import { AppointmentDto, CustomError } from "../../domain";
import { error } from "node:console";

export class AppointmentController{
    
    constructor(
        public readonly appointmentService: AppointmentService
    ){}

    createAppointment = (req: Request, res: Response) => {
        const  [ error, appointmentDto  ] =  AppointmentDto.create(req.body)
        if(error) return res.status(422).json({message: error})

        this.appointmentService.createAppointment(appointmentDto!)
        .then(appointment =>{
            return res.status(201).json(appointment)
        })
        .catch((error) =>{
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json(error.message)
            }
            return res.status(500).json({message:'Internal server Error'})
        })
        
    }


    getAppointmets = (req:Request, res: Response) =>{
        this.appointmentService.getAppointments()

        .then(appointments =>{
            return res.status(200).json({message:appointments})
        })
        .catch((error) =>{
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json(error.message)
            }
            return res.status(500).json({message:'Internal server Error'})
        })
    }


    getAppointmentId = (req:Request, res: Response) =>{
        const  { id } = req.params
        if(!Number(id)) return res.status(400).json({message:'El id debe ser un número'})
        
        this.appointmentService.getAppointmentById(Number(id))
        .then(appointment =>{
            return res.status(200).json(appointment)
        })
        .catch((error) =>{
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json(error.message)
            }
            return res.status(500).json({message:'Internal server Error'})
        })
    }
}