import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        nullable: false,
        enum: Tipo_documento,
        //default: Tipo_documento.CC
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
        enum:Genero
    })
    genero: Genero


    
    @Column({
        nullable:false,
        length:20,
        type:"varchar"  
    })
    telefono: string



    @Column({
        type:"text"  
    })
    direccion: string



    @Column({
        nullable:false,
        length:150,
        type:"varchar"
    })
    email: string



    @Column({
        type:"datetime"   
    })
    fecha_creacion: Date //PENDIENTE



    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}