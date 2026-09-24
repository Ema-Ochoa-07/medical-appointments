enum Tipo_documento {
    CC = 'CC',
    TI = 'TI',
    CE = 'CE',
    PAS = 'PAS'
}

enum Genero {
    Masculino = 'Masculino',
    Femenino = 'Femenino',
    Otro = 'Otro'
}


export class CreatePatientDto {
    private constructor(
        public readonly numero_documento: string,
        public readonly nombres: string,
        public readonly apellidos: string,
        public readonly telefono: string,
        readonly direccion?: string,
        //public readonly tipo_documento: Tipo_documento,      
        //public readonly fecha_nacimiento: Date,
        //public readonly genero: Genero,
        //public readonly email: string
    ){}

    static create(object: {[key: string]: any}): [string | undefined, CreatePatientDto?]{
        const { numero_documento, nombres, apellidos, telefono, direccion } = object


        if(!numero_documento) return ['Falta el numero de documento']
        if(!nombres) return ['Faltan los nombres']
        if(!apellidos) return ['Faltan los apellidos']
        if(!telefono) return ['Falta el telefono']

        if( direccion.length > 15 ) return ['La dirección exede los 15 caracteres permitidos']
        
        return [undefined, new CreatePatientDto(numero_documento, nombres,
            apellidos, telefono, direccion )]
    }

}