import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserVo } from './vo/user.vo';

const database = [];
let id = 0;

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);

    user.id = id++;

    database.push(user);

    return user;
  }

  findAll() {
    return database;
  }

  findOne(id: number) {
    return database.filter(item =>  item.id === id).at(0);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
/*
.map(item => {
      return new UserVo({
        id: item.id,
        username: item.username,
        email: item.email
      });
    })
*/
