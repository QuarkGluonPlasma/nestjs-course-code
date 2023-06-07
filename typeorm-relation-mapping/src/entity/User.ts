import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from "typeorm"
import { IdCard } from "./IdCard"

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToOne(() => IdCard, (idCard) => idCard.user)
    idCard: IdCard
}
