import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'aaa_user'
})
export class User {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        name: 'aaa_name',
        length: 50
    })
    name: string;
}
