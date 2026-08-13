import { Request, Response } from "express";

export class PatientsController{
    
    consturctor(){}

    createPatients = (req: Request, res: Response) => {
        
        const {documento, tipo_doc, nombres, apellidos} = req.body        
        return res.status(201).json({documento, tipo_doc, nombres, apellidos})
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