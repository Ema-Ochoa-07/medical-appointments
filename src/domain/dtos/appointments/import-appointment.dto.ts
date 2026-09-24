export class ImportAppointmentDto {
    private constructor(
        public readonly numero_documento: string,
        public readonly paciente: string,
        public readonly hora: Date,
        public readonly especialista: string,
        public readonly especialidad: string,
        public readonly telefono: string,
        public readonly observacion?: string
    ){}

    static create(object: {[key: string]: any}): [string | undefined, ImportAppointmentDto?]{

        const { numero_documento, paciente, hora, especialista,
            especialidad, telefono, observacion } = object

        if(!numero_documento) return ['Falta el número de documento']
        if(!paciente) return ['Falta el nombre del paciente']
        if(!hora) return ['Falta la hora']
        if(!especialista) return ['Falta el especialista']
        if(!especialidad) return ['Falta la especialidad']
        if(!telefono) return ['Falta el teléfono']

        return [ undefined, new ImportAppointmentDto( numero_documento, paciente, hora,
            especialista, especialidad, telefono, observacion )
        ]
    }
}