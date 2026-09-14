import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        length:100,
        type:"varchar" 
    })
    cargar_archivo: string



     @Column({
        nullable:false,
        length:100,
        type:"varchar" 
    })
    especialidad: string


     @Column({
        nullable:false,
        length:100,
        type:"varchar" 
    })
    especialista: string



    @Column({
        nullable: false,
        enum: Estado,
        default: Estado.Programada,
        type: 'enum'
    })
    estado: Estado
   
    
        
    @Column({
        nullable:false,
        type:"date"   
    })
    fecha_cita: Date

    
    @Column({
       nullable:false,
       length:100,
       type:"varchar"
    })
    observacion: string



    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


}