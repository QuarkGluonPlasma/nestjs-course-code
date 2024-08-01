import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomDto } from './create-chatroom.dto';

export class UpdateChatroomDto extends PartialType(CreateChatroomDto) {
  id: number;
}
