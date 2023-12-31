import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { And, Between, EntityManager, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class BookingService {

  @InjectEntityManager()
  private entityManager: EntityManager;

  async initData() {
    const user1 = await this.entityManager.findOneBy(User, {
      id: 1
    });
    const user2 = await this.entityManager.findOneBy(User, {
      id: 2
    });

    const room1 = await this.entityManager.findOneBy(MeetingRoom, {
      id: 3
    });
    const room2 = await await this.entityManager.findOneBy(MeetingRoom, {
      id: 6
    });
    
    const booking1 = new Booking();
    booking1.room = room1;
    booking1.user = user1;
    booking1.startTime = new Date();
    booking1.endTime = new Date(Date.now() + 1000 * 60 * 60);
  
    await this.entityManager.save(Booking, booking1);

    const booking2 = new Booking();
    booking2.room = room2;
    booking2.user = user2;
    booking2.startTime = new Date();
    booking2.endTime = new Date(Date.now() + 1000 * 60 * 60);
  
    await this.entityManager.save(Booking, booking2);

    const booking3 = new Booking();
    booking3.room = room1;
    booking3.user = user2;
    booking3.startTime = new Date();
    booking3.endTime = new Date(Date.now() + 1000 * 60 * 60);
  
    await this.entityManager.save(Booking, booking3);

    const booking4 = new Booking();
    booking4.room = room2;
    booking4.user = user1;
    booking4.startTime = new Date();
    booking4.endTime = new Date(Date.now() + 1000 * 60 * 60);
  
    await this.entityManager.save(Booking, booking4);
  }

  async find(pageNo: number, pageSize: number, username: string, meetingRoomName: string, meetingRoomPosition: string, bookingTimeRangeStart: number, bookingTimeRangeEnd: number ) {
    const skipCount = (pageNo - 1) * pageSize;

    const condition: Record<string, any> = {};

    if(username) {
      condition.user = {
        username: Like(`%${username}%`)
      }
    }

    if(meetingRoomName) {
      condition.room =  {
        name: Like(`%${meetingRoomName}%`)
      }
    }

    if(meetingRoomPosition) {
      if (!condition.room) {
        condition.room = {}
      }
      condition.room.location = Like(`%${meetingRoomPosition}%`)
    }

    if(bookingTimeRangeStart) {
      if(!bookingTimeRangeEnd) {
        bookingTimeRangeEnd = bookingTimeRangeStart + 60 * 60 * 1000
      }
      condition.startTime = Between(new Date(+bookingTimeRangeStart), new Date(+bookingTimeRangeEnd))
    }

    const [bookings, totalCount] = await this.entityManager.findAndCount(Booking, {
      where: condition,
      relations: {
        user: true,
        room: true,
      },
      skip: skipCount,
      take: pageSize
    });

    return {
      bookings: bookings.map(item => {
        delete item.user.password;
        return item;
      }),
      totalCount
    }
  }

  async add(bookingDto: CreateBookingDto, userId: number) {
    const meetingRoom = await this.entityManager.findOneBy(MeetingRoom, {
      id: bookingDto.meetingRoomId
    });

    if(!meetingRoom) {
      throw new BadRequestException('会议室不存在');
    }

    const user = await this.entityManager.findOneBy(User, {
      id: userId
    });

    const booking = new Booking();
    booking.room = meetingRoom;
    booking.user = user;
    booking.startTime = new Date(bookingDto.startTime);
    booking.endTime = new Date(bookingDto.endTime);

    const res = await this.entityManager.findOneBy(Booking, {
      room: {
        id: meetingRoom.id
      },
      startTime: LessThanOrEqual(booking.startTime),
      endTime: MoreThanOrEqual(booking.endTime)
    });

    if(res) {
      throw new BadRequestException('该时间段已被预定');
    }
    
    await this.entityManager.save(Booking, booking);
  }

  async apply(id: number) {
    await this.entityManager.update(Booking, {
      id
    }, {
      status: '审批通过'      
    });
    return 'success'
  }

  async reject(id: number) {
    await this.entityManager.update(Booking, {
      id
    }, {
      status: '审批驳回'      
    });
    return 'success'
  }

  async unbind(id: number) {
    await this.entityManager.update(Booking, {
      id
    }, {
      status: '已解除'
    });
    return 'success'
  }

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(EmailService)
  private emailService: EmailService;

  async urge(id: number) {
    const flag = await this.redisService.get('urge_' + id);

    if(flag) {
      return '半小时内只能催办一次，请耐心等待';
    }

    let email = await this.redisService.get('admin_email');

    if(!email) { 
      const admin = await this.entityManager.findOne(User, {
        select: {
          email: true
        },
        where: {
          isAdmin: true
        }
      });

      email = admin.email
  
      this.redisService.set('admin_email', admin.email);
    }

    this.emailService.sendMail({
      to: email,
      subject: '预定申请催办提醒',
      html: `id 为 ${id} 的预定申请正在等待审批`
    });
    
    this.redisService.set('urge_' + id, 1, 60 * 30);
  }
}
