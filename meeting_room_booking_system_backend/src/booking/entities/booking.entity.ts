import { MeetingRoom } from "src/meeting-room/entities/meeting-room.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '会议开始时间'
    })
    startTime: Date;

    @Column({
        comment: '会议结束时间'
    })
    endTime: Date;

    @Column({
        length: 20,
        comment: '状态（申请中、审批通过、审批驳回、已解除）',
        default: '申请中'
    })
    status: string;

    @Column({
        length: 100,
        comment: '备注',
        default: ''
    })
    note: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => MeetingRoom)
    room: MeetingRoom;

    @CreateDateColumn({
        comment: '创建时间'
    })
    createTime: Date;

    @UpdateDateColumn({
        comment: '更新时间'
    })
    updateTime: Date;
}
