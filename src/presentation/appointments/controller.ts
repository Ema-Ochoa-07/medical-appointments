import { Request, Response } from "express";
import { PatientService } from "../services/patient.service";

export class AppointmentController{
    
    constructor(
        //public readonly patientService: PatientService
    ){}

    createAppointment = (req: Request, res: Response) => {
        return res.status(201).json()

    }

}