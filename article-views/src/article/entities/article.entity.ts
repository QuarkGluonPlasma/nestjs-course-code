import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        comment: '文章名字',
        length: 50
    })
    title: string;

    @Column({
        comment: '内容',
        type: 'text'
    })
    content: string;

    @Column({
        comment: '阅读量',
        default: 0
    })
    viewCount: number;

    @Column({
        comment: '点赞量',
        default: 0
    })
    likeCount: number;

    @Column({
        comment: '收藏量',
        default: 0
    })
    collectCount: number;
}
