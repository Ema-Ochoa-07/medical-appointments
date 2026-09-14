import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum Estado{
    Programada = 'Programada',
    Atendida = 'Atendida',
    Cancelada = 'Cancelada',
    No_asistio = 'No_asistio'
}


@Entity()

export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number


    @Column({
       nullable:false,
       type:"number"
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



    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}