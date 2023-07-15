import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        comment: '用户名'
    })
    username: string;

    @Column({
        length: 50,
        comment: '密码'
    })
    password: string;

    @Column({
        length: 50,
        comment: '邮箱地址'
    }) 
    email: string;
}
