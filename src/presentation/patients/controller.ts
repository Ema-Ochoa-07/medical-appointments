import { Request, Response } from "express";
import { PatientService } from "../services/patient.service";
import { CreatePatientDto, CustomError } from "../../domain";
import { UpdatePatientDto } from "../../domain/dtos/patients/update-patient.dto";
import { json } from "node:stream/consumers";

export class PatientsController{
    
    constructor(
        public readonly patientService: PatientService
    ){}

    createPatients = (req: Request, res: Response) => {
        
        
        const [error, createPatientDto] = CreatePatientDto.create(req.body)
        if( error ) return res.status(422).json({message:error})
         
        this.patientService.createPatient(createPatientDto!)

        // POR OBTIMIZACIÓN SE EVITA ASYN-AWAIT
        // POR SI LLEGA A PASAR ALGO QUE NO CONTROLE Y FALLE
        .then(patient => {
            return res.status(201).json(patient)
        })
         .catch ((error) => {
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({message: error.message})
            }
            return res.status(500).json({message:'Internal Server Error 🧨'})                
        })
    }

    


     getPatients = (req: Request, res: Response) => {

        this.patientService.getAllPatients()
         
        .then(patients =>{
            return res.status(200).json(patients)
        })
         .catch ((error) => {
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({message: error.message})
            }
            return res.status(500).json({message:'Internal Server Error 🧨'})                
        })
    }



    getPatientById = (req: Request, res: Response) =>{
        const {id} = req.params

        //if( !id|| isNaN(+id)){ una forma de validad de que sea Número
        if(isNaN(Number(id))){
            return res.status(400).json({message:`El id debe ser un número`})
        }

        this.patientService.getPatientById(Number(id))
        .then(patient => {
            console.log(patient)
            return res.status(200).json(patient)
        })

         .catch ((error) => {
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({message: error.message})
            }
            return res.status(500).json({message:'Internal Server Error 🧨'})                
        })
    }




    updatePatientById = (req: Request, res: Response) =>{
        const {id} = req.params
        if(isNaN(Number(id))){
            return res.status(400).json('El id debe ser un número')
        }

        const [error, updatePatientDto] = UpdatePatientDto.update(req.body)
        if( error) return res.status(422).json({message: error})
         
        this.patientService.updatePatient( Number(id), updatePatientDto)

        .then(patient => {
            console.log(patient)
            return res.status(200).json(patient)
        })

         .catch ((error) => {
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({message: error.message})
            }
            return res.status(500).json({message:'Internal Server Error 🧨'})                
        })

    }




    deletePatientById = (req: Request, res: Response) =>{
        const {id} = req.params

        if(isNaN(Number(id))){
            return res.status(400).json({message:"El id debe ser un número"})
        }

        this.patientService.deletePatient(Number(id))

        .then(() =>{
            return res.status(204).json()
        })
         .catch ((error) => {
            console.log(error)
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({message: error.message})
            }
            return res.status(500).json({message:'Internal Server Error 🧨'})                
        })

    }
}