import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./appointment.model";

enum Tipo_documento{
    CC = 'CC',
    TI = 'TI',
    CE = 'CE',
    PAS = 'PAS'
}

enum Genero{
    Masculino = 'Masculino',
    Femenino = 'Femenino',
    Otro = 'Otro'
}

enum Estado{
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}


@Entity()

export class Patient extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number


    @Column({
        unique:true, //INDICA QUE TIENE QUE SER ÚNICO
        nullable:false, //EN FALSE INDICA QUE NO PUEDE SER NULO
        length:20,
        type:"varchar"
    })
    numero_documento: string



    @Column({
        nullable: true,
        enum: Tipo_documento,
        //default: Tipo_documento.CC
        type: 'enum'
    })
    tipo_documento: Tipo_documento



    @Column({
        nullable:false,
        length:100,
        type:"varchar"
    })
    nombre: string

    
    @Column({
        nullable:true,
        type:"date"   
    })
    fecha_nacimiento: Date


    @Column({
        nullable:true,
        enum:Genero,
        type: 'enum'
    })
    genero: Genero


    
    @Column({
        length:20,
        type:"varchar"  
    })
    telefono: string



    @Column({
        nullable:true,
        type:"text"  
    })
    direccion: string



    @Column({
        //unique: true,
        nullable:true,
        length:150,
        type:"varchar"
    })
    email: string


        @Column({
        nullable: false,
        enum: Estado,
        default: Estado.Activo,
        type: 'enum'
    })
    estado: Estado


    @OneToMany(() => Appointment, (appointmet) => appointmet.patient)
    appointmets: Appointment[] 


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}