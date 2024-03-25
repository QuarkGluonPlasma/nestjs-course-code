import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User, user => user.following)
    @JoinTable()
    followers: User[];

    @ManyToMany(() => User, user => user.followers)
    following: User[];
}
