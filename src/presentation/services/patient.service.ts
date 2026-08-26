import { Code } from "typeorm/driver/mongodb/bson.typings.js"
import { Patient } from "../../data"
import { CustomError } from "../../domain"

enum Estado{
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}

export class PatientService {
    constructor(){}
    
    
    //Luego hay que cambiar ese tipo de dato any
    async createPatient(patientData: any){
        //COSAS DENTRO Y FUERAS DE TRY-CATCH ASYNC - SINCRONO

        //CÓDIGO SINCRONO - INSTANCIAR CLASES, ALAMACENAR EN VARIABLE

        //console.log("Se ejecutó el service")
        const patient = new Patient()

        patient.numero_documento = patientData.documento
        patient.tipo_documento = patientData.tipo_doc
        patient.nombres = patientData.nombres.toLowerCase().trim()
        patient.apellidos = patientData.apellidos.toLowerCase().trim()
        patient.fecha_nacimiento = patientData.fecha_nac
        patient.genero = patientData.genero
        patient.telefono = patientData.telefono.toLowerCase().trim()
        patient.direccion = patientData.direccion.toLowerCase().trim()
        patient.email = patientData.correo

        try {
        //CÓDIGO ASÍNCRONO - GUARDADO DE BD               
        return patient.save()

        } catch (error) {
            //SI LA EJECUCIÓN FALLA ES UN ERROR  500
            throw CustomError.internalServer("Internal Server Error 🧨")
        }

    }


    async getAllPatients(){
        try {
            return  await Patient.find({
                where:{
                    estado: Estado.Activo
                }
            })
        } catch (error) {
            throw CustomError.internalServer("Internal Server Error 🧨")
        }
    }


    async getPatientById(id: number){
        //EVITAR EL TRY CATCH LO MÁS QUE SE PUEDA POR OPTIMIZACIÓN

        const patient = await Patient.findOne({
            where:{
                id: id,
                estado: Estado.Activo
            }                
        })
            
        if(!patient){
            throw CustomError.notFound(`Patient with id ${id} not found`)
        }
        return patient
    }


    async updatePatient(id: number, patientData: any){
            const patient = await this.getPatientById(id)

            patient.numero_documento = patientData.documento
            patient.tipo_documento = patientData.tipo_doc
            patient.nombres = patientData.nombres.toLowerCase().trim()
            patient.apellidos = patientData.apellidos.toLowerCase().trim()
            patient.fecha_nacimiento = patientData.fecha_nac
            patient.genero = patientData.genero
            patient.telefono = patientData.telefono.toLowerCase().trim()
            patient.direccion = patientData.direccion.toLowerCase().trim()
            patient.email = patientData.correo
            patient.estado = patientData.estado

        try {             
            return await patient.save()

        } catch (error) {
            throw CustomError.internalServer("Internal Server Error 🧨")
        }
    }


    async deletePatient(id: number){
        const patient = await this.getPatientById(id)

        patient.estado = Estado.Inactivo

        try {            
        return await patient.save()

        } catch (error) {
            throw CustomError.internalServer("Internal Server Error 🧨")
        }

    }

}