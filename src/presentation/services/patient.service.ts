import { Code } from "typeorm/driver/mongodb/bson.typings.js"
import { Patient } from "../../data"


export class PatientService {
    constructor(){}
    
    
    //Luego hay que cambiar ese tipo de dato any
    async createPatient(patientData: any){

        try {
            
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

        await patient.save()

        return patient

        } catch (error) {
            console.log(error)//TODO: Ojo luego agregar manejo de ERRORES
        }

    }


    async getAllPatients(){
        try {
            return  await Patient.find()
        } catch (error) {
            return console.log(error)
        }
    }


    async getPatientById(id: number){
        try {
            const patient = await Patient.findOne({
                where:{
                    id: id
                }                
            })
            
            if(!patient){
                throw new Error("El paciente no existe")
            }
            return patient
        } catch (error) {
            throw new Error("Internal Server Error")
            console.log(error)
        }
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

        try {                     
            return await patient.save()

        } catch (error) {
            throw new Error("Internal Server Error")
        }
    }

}