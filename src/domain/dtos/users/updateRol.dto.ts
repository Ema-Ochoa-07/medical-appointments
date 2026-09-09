import { Rol } from "../../../data"

export class UpdateRolDto {
    private constructor(
        public readonly rol: Rol
    ){}

    static editar(object: {[key: string]: any}): [string | undefined, UpdateRolDto?]{
        const { rol } = object

        if(!rol) return ['Falta el rol']  

        //Por si alguien entra como desarrollador y coloca algo fuera del enum
        if(!Object.values(Rol).includes(rol)) return ['Rol no válido'] 

        
        return [undefined, new UpdateRolDto( rol )]
    }

}