import { Inject, Injectable } from '@nestjs/common';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AaaService {
  create(createAaaDto: CreateAaaDto) {
    return 'This action adds a new aaa';
  }

  @Inject(EventEmitter2)
  private eventEmitter: EventEmitter2;

  findAll() {
    this.eventEmitter.emit('aaa.find',{
      data: 'xxxx'
    })
  
    this.eventEmitter.emit("aaa.find2",{
      data: 'xxxx2'
    })
    return `This action returns all aaa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aaa`;
  }

  update(id: number, updateAaaDto: UpdateAaaDto) {
    return `This action updates a #${id} aaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} aaa`;
  }
}
