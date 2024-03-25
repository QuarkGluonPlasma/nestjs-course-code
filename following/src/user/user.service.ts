import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {

  @InjectEntityManager()
  entityManager: EntityManager;

  async initData() {    
    const user2 = new User();
    user2.name = '李四';

    const user3 = new User();
    user3.name = '王五';

    const user4 = new User();
    user4.name = '赵六';

    const user5 = new User();
    user5.name = '刘七';

    await this.entityManager.save(user2);
    await this.entityManager.save(user3);
    await this.entityManager.save(user4);
    await this.entityManager.save(user5);

    const user1 = new User();
    user1.name = '张三';

    user1.followers = [user2, user3, user4];

    user1.following = [user2, user5];

    await this.entityManager.save(user1);
  }

  @Inject(RedisService)
  redisService: RedisService;

  async findUserByIds(userIds: string[] | number[]) {
    let users = [];

    for(let i = 0; i< userIds.length; i ++) {
      const user = await this.entityManager.findOne(User, {
        where: {
          id: +userIds[i]
        }
      });
      users.push(user);
    }
  
    return users;
  }

  async getFollowRelationship(userId: number) {
    const exists = await this.redisService.exists('followers:' + userId);
    if(!exists) {
      const user = await this.entityManager.findOne(User, {
        where: {
          id: userId
        },
        relations: ['followers', 'following']
      });

      if(!user.followers.length || !user.following.length) {
        return {
          followers: user.followers,
          following: user.following,
          followEachOther: []
        }
      }

      await this.redisService.sAdd('followers:' + userId, ...user.followers.map(item => item.id.toString()));
  
      await this.redisService.sAdd('following:' + userId, ...user.following.map(item => item.id.toString()))
  
      await this.redisService.sInterStore('follow-each-other:' + userId, 'followers:' + userId, 'following:' + userId);

      const followEachOtherIds = await this.redisService.sMember('follow-each-other:' + userId);
      
      const followEachOtherUsers = await this.findUserByIds(followEachOtherIds);

      return {
        followers: user.followers,
        following: user.following,
        followEachOther: followEachOtherUsers
      }
    } else {

      const followerIds = await this.redisService.sMember('followers:' + userId);
      
      const followUsers = await this.findUserByIds(followerIds);
      
      const followingIds = await this.redisService.sMember('following:' + userId);
      
      const followingUsers = await this.findUserByIds(followingIds);
  
      const followEachOtherIds = await this.redisService.sMember('follow-each-other:' + userId);
      
      const followEachOtherUsers =await this.findUserByIds(followEachOtherIds);

      return {
        followers: followUsers,
        following: followingUsers,
        followEachOtherUsers: followEachOtherUsers
      }
    }
  }

  async follow(userId: number, userId2: number){
    const user = await this.entityManager.findOne(User, {
      where: {
        id: userId
      },
      relations: ['followers', 'following']
    });

    const user2 = await this.entityManager.findOne(User, {
      where: {
        id: userId2
      }
    });

    user.followers.push(user2);

    await this.entityManager.save(User, user);

    const exists = await this.redisService.exists('followers:' + userId);

    if(exists) {
      await this.redisService.sAdd('followers:' + userId, userId2.toString());
      await this.redisService.sInterStore('follow-each-other:' + userId, 'followers:' + userId, 'following:' + userId);
    }

    const exists2 = await this.redisService.exists('following:' + userId2);

    if(exists2) {
      await this.redisService.sAdd('following:' + userId2, userId.toString());
      await this.redisService.sInterStore('follow-each-other:' + userId2, 'followers:' + userId2, 'following:' + userId2);
    }
  }

}
