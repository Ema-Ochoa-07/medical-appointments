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

enum Estado{
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}


export class UpdatePatientDto {
    private constructor(
        public readonly numero_documento: string,
        public readonly tipo_documento: Tipo_documento,
        public readonly nombres: string,
        public readonly apellidos: string,
        public readonly fecha_nacimiento: Date,
        public readonly genero: Genero,
        public readonly telefono: string,
        public readonly direccion: string,
        public readonly email: string,
        public readonly estado: Estado
    ){}

    static update(object: {[key: string]: any}): [string | undefined, UpdatePatientDto?]{
        const {
            numero_documento, tipo_documento, nombres, 
            apellidos, fecha_nacimiento, genero, telefono, 
            direccion, email, estado
        } = object


        if(!numero_documento) return ['Falta el numero de documento']
        if(!tipo_documento) return ['Falta el tipo de documento']
        if(!nombres) return ['Faltan los nombres']
        if(!apellidos) return ['Faltan los apellidos']
        if(!fecha_nacimiento) return ['Falta la fecha de nacimiento']
        if(!genero) return ['Falta el genero']
        if(!telefono) return ['Falta el telefono']

        if(!direccion) return ['Falta la dirección']
        if( direccion.length > 15 ) return ['La dirección exede los 15 caracteres permitidos']

        if(!email) return ['Falta el email']   
        if(!estado) return ['Falta el email']
        
        return [undefined, new UpdatePatientDto(numero_documento, tipo_documento, nombres,
            apellidos, fecha_nacimiento, genero, telefono, direccion, email, estado )]
    }

}