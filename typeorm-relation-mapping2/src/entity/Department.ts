import { Employee } from './Employee';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @OneToMany(() => Employee, (employee) => employee.department, {
        cascade: true
    })
    employees: Employee[];
}
