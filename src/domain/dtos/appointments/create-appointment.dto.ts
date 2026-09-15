
export class AppointmentDto {
    private constructor(
        public readonly userId: number,
        public readonly patientId: number,
        public readonly cargar_archivo: boolean,
        public readonly especialidad: string,
        public readonly especialista: string,
        public readonly fecha_cita: Date,
        public readonly observacion: string

    ){}

    static create(object: {[key: string]: any}): [string | undefined, AppointmentDto?]{
        const { 
            userId, patientId, cargar_archivo, especialidad, 
            especialista, fecha_cita, observacion
        } = object


        if(!userId) return ['Falta el id del usuario']
        if(typeof(userId) !== 'number') return ['El id del usuario debe ser un número']

        if(!patientId) return ['Falta el id del paciente']
        if(typeof (patientId) !== 'number') return ['El id del paciente debe ser un número']


        if(cargar_archivo == false) return ['Falta cargar el archivo']
        if(!especialidad) return ['Falta la especialidad']
        if(!especialista) return ['Falta el especialista']
        if(!fecha_cita) return ['Falta la fecha de la cita']
         
        return [undefined, new AppointmentDto(userId, patientId, cargar_archivo, especialidad,
            especialista, fecha_cita, observacion
        )]
    }

}                                  