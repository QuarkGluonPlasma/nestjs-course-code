import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  
  @InjectEntityManager()
  private manager: EntityManager;

  create(createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    this.manager.save(User, createUserDto);
  }

  findAll() {
    return this.manager.find(User)
  }

  findOne(id: number) {
    return this.manager.findOne(User, {
      where: { id }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.manager.save(User, {
      id: id,
      ...updateUserDto
    })
  }

  remove(id: number) {
    this.manager.delete(User, id);
  }
}
