import { FriendAddDto } from './dto/friend-add.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendshipService {

    @Inject(PrismaService)
    private prismaService: PrismaService;

    async add(friendAddDto: FriendAddDto, userId: number) {
        return await this.prismaService.friendRequest.create({
            data: {
                fromUserId: userId,
                toUserId: friendAddDto.friendId,
                reason: friendAddDto.reason,
                status: 0
            }
        })
    }

    async list(userId: number) {
        return this.prismaService.friendRequest.findMany({
            where: {
                fromUserId: userId
            }
        })
    }

    async agree(friendId: number, userId: number) {
        await this.prismaService.friendRequest.updateMany({
            where: {
                fromUserId: userId,
                toUserId: friendId,
                status: 0
            },
            data: {
                status: 1
            }
        })
        await this.prismaService.friendship.create({
            data: {
                userId,
                friendId
            }
        })
        return '添加成功'
    }

    async reject(friendId: number, userId: number) {
        await this.prismaService.friendRequest.updateMany({
            where: {
                fromUserId: userId,
                toUserId: friendId,
                status: 0
            },
            data: {
                status: 2
            }
        })
        return '已拒绝'
    }

    async getFriendship(userId: number) {
        const foundUser = await this.prismaService.user.findUnique({
          where: {
            id: userId
          },
          include: {
            friends: true,
          }
        });
    
        return this.prismaService.user.findMany({
          where: {
            id: {
              in: foundUser.friends.map(item => item.friendId)
            }
          },
          select: {
            id: true,
            username: true,
            nickName: true,
            email: true
          }
        })
    }

    async remove(friendId: number, userId: number) {
        await this.prismaService.friendship.deleteMany({
            where: {
                userId,
                friendId,
            }
        })
        return '删除成功';
    }
}
