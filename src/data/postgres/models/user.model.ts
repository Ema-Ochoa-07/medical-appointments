import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./appointment.model";
import { Attention } from "./attention.model";

enum Estado{
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}

export enum Rol{
    Administrador = 'Administrador',
    Supervisor = 'Supervisor',
    Colaborador = 'Colaborador'
} 


@Entity()

export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number


    @Column({
        nullable:false,
        length:100,
        type:"varchar"
    })
    nombre: string



    @Column({
        unique:true, //INDICA QUE TIENE QUE SER ÚNICO
        nullable:false, //EN FALSE INDICA QUE NO PUEDE SER NULO
        length:20,
        type:"varchar"
    })
    username: string



     @Column({
        nullable:false,
        length:150,
        type:"varchar"
    })
    clave: string

    

    @Column({
        unique: true,
        nullable:false,
        length:150,
        type:"varchar"
    })
    email: string


    @Column({
        type: "boolean",
        default: false
    })
    emailValidado: boolean


    @Column({
        nullable: false,
        enum: Estado,
        default: Estado.Activo,
        type: 'enum'
    })
    estado: Estado

    @Column({
            nullable: false,
            enum: Rol,
            default: Rol.Colaborador,
            type: 'enum'
        })
        rol: Rol
    
    @Column({
        nullable: true,
        default:"https://cdn-icons-png.flaticon.com/512/6326/6326055.png",
        type:"varchar"
    })
    avatar: string


    @OneToMany(() => Appointment, (appointmet) => appointmet.user)
    appointmets: Appointment[] 

    @OneToMany(() => Attention, (attention) => attention.user)
    attentions: Attention[] 


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}