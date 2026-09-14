import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.model";

enum Estado{
    Programada = 'Programada',
    Atendida = 'Atendida',
    Cancelada = 'Cancelada',
    No_asistio = 'No_asistio'
}


@Entity()

export class Attention extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    
    @Column({
       nullable:false,
       type:"integer"
    })
    triaje: number



    @Column({
        nullable: false,
        enum: Estado,
        default: Estado.Programada,
        type: 'enum'
    })
    estado: Estado


    
    @Column({
        nullable:false,
        length:100,
        type:"varchar" 
    })
    profesional: string
   
        
    @Column({
        nullable:false,
        type:"date"   
    })
    llegada: Date


    @Column({
        type:"date"   
    })
    salida: Date

    
    @Column({
       length:100,
       type:"varchar"
    })
    observacion: string


    @ManyToOne(() => User, (user) => user.attentions)
    user:User


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}