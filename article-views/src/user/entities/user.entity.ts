import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '用户名'
    })
    username: string;

    @Column({
        comment: '密码'
    })
    password: string;
}
