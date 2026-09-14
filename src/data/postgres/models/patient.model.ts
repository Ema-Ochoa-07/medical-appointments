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


    @OneToMany(() => Appointment, (appointmet) => appointmet.patient)
    appointmets: Appointment[] 

    @Column({
        unique:true, //INDICA QUE TIENE QUE SER ÚNICO
        nullable:false, //EN FALSE INDICA QUE NO PUEDE SER NULO
        length:20,
        type:"varchar"
    })
    numero_documento: string



    @Column({
        nullable: false,
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
    nombres: string



    @Column({
        nullable:false,
        length:100,
        type:"varchar" 
    })
    apellidos: string


        
    @Column({
        nullable:false,
        type:"date"   
    })
    fecha_nacimiento: Date


    @Column({
        nullable:false,
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
        type:"text"  
    })
    direccion: string



    @Column({
        unique: true,
        nullable:false,
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



    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}