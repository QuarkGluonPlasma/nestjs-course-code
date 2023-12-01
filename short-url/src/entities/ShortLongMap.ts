import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShortLongMap {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 10,
        comment: '压缩码'
    })
    shortUrl: string;

    @Column({
        length: 200,
        comment: '原始 url'
    })
    longUrl: string;

    @CreateDateColumn()
    createTime: Date;
}
