import { Request, Response } from "express";

export class SpecialtiesController{
    
    consturctor(){}

    createSpecialties = (req: Request, res: Response) => {
        const { nombre,  estado } = req.body
        return res.status(201).json({nombre, estado})
    }

    getSpecialties = (req: Request, res:Response) =>{
        return res.status(200).json({message:'Listado de especialidades'})
    }

    getSpecialtieById = (req:Request, res:Response) =>{
        const { id } = req.params
        return res.status(200).json({message:`Especialidad con id ${id} fue encontrada`}) 
    }

    updtateSpecialtieById = (req: Request, res:Response) =>{
        const {id} = req.params
        return res.status(200).json({message:`Especialidad con id ${id} fue acualizada`})
    }

    deleteSpecialtieById = (req: Request, res: Response) =>{
        const { id } = req.params
        return res.status(204).json()
    }

}