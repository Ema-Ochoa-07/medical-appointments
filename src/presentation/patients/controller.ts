import { Request, Response } from "express";
import { PatientService } from "../services/patient.service";
import { error } from "node:console";

export class PatientsController{
    
    constructor(
        public readonly patientService: PatientService
    ){}

    createPatients = (req: Request, res: Response) => {
        
        const {
            documento, tipo_doc, nombres, apellidos,
            fecha_nac, genero, telefono, direccion, correo
        } = req.body        
         
        this.patientService.createPatient({documento, tipo_doc, nombres, apellidos,
             fecha_nac, genero, telefono, direccion, correo
        })

        // POR OBTIMIZACIÓN SE EVITA ASYN-AWAIT
        // POR SI LLEGA A PASAR ALGO QUE NO CONTROLE Y FALLE
        .then(patient => {
            return res.status(201).json(patient)
        })
         .catch ((error) => {
            return res.status(500).json(error)
        })
    }

    


     getPatients = (req: Request, res: Response) => {

        this.patientService.getAllPatients()
         
        .then(patients =>{
            return res.status(200).json(patients)
        })
        .catch((error) => {
            return res.status(500).json(error)
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

        .catch((error) =>{
            console.log(error)
            return res.status(500).json(error)
        })
    }




    updatePatientById = (req: Request, res: Response) =>{
        const {id} = req.params
        if(isNaN(Number(id))){
            return res.status(400).json('El id debe ser un número')
        }

        const {
            documento, tipo_doc, nombres, apellidos,
            fecha_nac, genero, telefono, direccion, correo
        } = req.body   
        
        this.patientService.updatePatient( Number(id), {documento, tipo_doc, nombres, apellidos,
             fecha_nac, genero, telefono, direccion, correo })

        .then(patient => {
            console.log(patient)
            return res.status(200).json(patient)
        })

        .catch((error) =>{
            console.log(error)
            return res.status(500).json(error)
        })

    }




    deletePatientById = (req: Request, res: Response) =>{
        const {id} = req.params
        return res.status(204).json()
    }
}