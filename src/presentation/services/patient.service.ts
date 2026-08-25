

export class PatientService {
    constructor(){}

    //Luego hay que cambiar ese tipo de dato any
    async createPatient(patientData: any){
        console.log("Se ejecutó el service")
    }

}