import { Request, Response } from "express";

export class SpecialistsController{
    
    consturctor(){}

    createSpecialists = (req: Request, res: Response) => {
        const { nombres,  apellidos, estado } = req.body
        return res.status(201).json({nombres, apellidos, estado})
    }

    getSpecialists = (req: Request, res:Response) =>{
        return res.status(200).json({message:'Listado de especialistas'})
    }

    getSpecialistById = (req:Request, res:Response) =>{
        const { id } = req.params
        return res.status(200).json({message:`Especialista con id ${id} fue encontrada`}) 
    }

    updtateSpecialistById = (req: Request, res:Response) =>{
        const {id} = req.params
        return res.status(200).json({message:`Especialista con id ${id} fue acualizada`})
    }

    deleteSpecialistById = (req: Request, res: Response) =>{
        const { id } = req.params
        return res.status(204).json()
    }

}