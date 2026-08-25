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
                
        return res.status(200).json({message:'Listado de pacientes'})
    }

    getPatientById = (req: Request, res: Response) =>{
        const {id} = req.params
        return res.status(200).json({message:`Paciente con id ${id} encontrado`})
    }

    updatePatientById = (req: Request, res: Response) =>{
        const {id} = req.params
        const {documento, tipo_doc, nombres, apellidos} = req.body
        return res.status(200).json({messge:`Paaciente con id ${id} actualizado`})
    }

    deletePatientById = (req: Request, res: Response) =>{
        const {id} = req.params
        return res.status(204).json()
    }
}