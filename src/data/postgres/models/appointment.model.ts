import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.model";
import { Patient } from "./patient.model";

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
        default: true,
        type:"boolean" 
    })
    cargar_archivo: boolean

 
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


    @ManyToOne(() => User, (user) => user.appointmets)
    user:User

    @ManyToOne(() => Patient, (patient) => patient.appointmets)
    patient:Patient


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date    

    
}