import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";
import { AppointmentDto, CustomError } from "../../domain";

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

}