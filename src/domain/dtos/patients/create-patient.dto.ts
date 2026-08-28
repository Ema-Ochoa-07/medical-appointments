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
        public readonly tipo_documento: Tipo_documento,
        public readonly nombres: string,
        public readonly apellidos: string,
        public readonly fecha_nacimiento: Date,
        public readonly genero: Genero,
        public readonly telefono: string,
        public readonly direccion: string,
        public readonly email: string
    ){}

    static create(object: {[key: string]: any}): [string | undefined, CreatePatientDto?]{
        const {
            numero_documento, tipo_documento, nombres, 
            apellidos, fecha_nacimiento, genero, telefono, 
            direccion, email
        } = object


        if(!numero_documento) return ['Falta el numero de documento']
        if(!tipo_documento) return ['Falta el tipo de documento']
        if(!nombres) return ['Faltan los nombres']
        if(!apellidos) return ['Faltan los apellidos']
        if(!fecha_nacimiento) return ['Falta la fecha de nacimiento']
        if(!genero) return ['Falta el genero']
        if(!telefono) return ['Falta el telefono']
        if(!direccion) return ['Falta la dirección']
        if(!email) return ['Falta el email']   
        
        return [undefined, new CreatePatientDto(numero_documento, tipo_documento, nombres,
            apellidos, fecha_nacimiento, genero, telefono, direccion, email )]
    }

}