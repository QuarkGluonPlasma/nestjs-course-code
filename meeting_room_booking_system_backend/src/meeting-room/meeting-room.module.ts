import { Module } from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { MeetingRoomController } from './meeting-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingRoom } from './entities/meeting-room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeetingRoom])
  ],
  controllers: [MeetingRoomController],
  providers: [MeetingRoomService]
})
export class MeetingRoomModule {}
