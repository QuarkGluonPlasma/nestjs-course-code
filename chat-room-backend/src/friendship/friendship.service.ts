import { FriendAddDto } from './dto/friend-add.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendshipService {

    @Inject(PrismaService)
    private prismaService: PrismaService;

    async add(friendAddDto: FriendAddDto, userId: number) {
        const friend = await this.prismaService.user.findUnique({
            where: {
                username: friendAddDto.username
            }
        });

        if(!friend) {
            throw new BadRequestException('要添加的 username 不存在');
        }

        if(friend.id === userId) {
            throw new BadRequestException('不能添加自己为好友');
        }

        const found = await this.prismaService.friendship.findMany({
            where: {
                userId,
                friendId: friend.id
            }
        })

        if(found.length) {
            throw new BadRequestException('该好友已经添加过');
        }
    
        return await this.prismaService.friendRequest.create({
            data: {
                fromUserId: userId,
                toUserId: friend.id,
                reason: friendAddDto.reason,
                status: 0
            }
        })
    }

    async list(userId: number) {
        const fromMeRequest = await this.prismaService.friendRequest.findMany({
            where: {
                fromUserId: userId
            }
        })

        const toMeRequest =  await this.prismaService.friendRequest.findMany({
            where: {
                toUserId: userId
            }
        })

        const res = {
            toMe: [],
            fromMe: []
        }

        for (let i = 0; i < fromMeRequest.length; i++) {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: fromMeRequest[i].toUserId
                },
                select: {
                    id: true,
                    username: true,
                    nickName: true,
                    email: true,
                    headPic: true,
                    createTime: true
                }
            })
            res.fromMe.push({
                ...fromMeRequest[i],
                toUser: user
            })
        }

        for (let i = 0; i < toMeRequest.length; i++) {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: toMeRequest[i].fromUserId
                },
                select: {
                    id: true,
                    username: true,
                    nickName: true,
                    email: true,
                    headPic: true,
                    createTime: true
                }
            })
            res.toMe.push({
                ...toMeRequest[i],
                fromUser: user
            })
        }

        return res;
    }

    async agree(friendId: number, userId: number) {
        await this.prismaService.friendRequest.updateMany({
            where: {
                fromUserId: friendId,
                toUserId: userId,
                status: 0
            },
            data: {
                status: 1
            }
        })

        const res = await this.prismaService.friendship.findMany({
            where: {
                userId,
                friendId
            }
        })

        if(!res.length) {
            await this.prismaService.friendship.create({
                data: {
                    userId,
                    friendId
                }
            })
        }
        return '添加成功'
    }

    async reject(friendId: number, userId: number) {
        await this.prismaService.friendRequest.updateMany({
            where: {
                fromUserId: friendId,
                toUserId: userId,
                status: 0
            },
            data: {
                status: 2
            }
        })
        return '已拒绝'
    }

    async getFriendship(userId: number, name: string) {
        const friends = await this.prismaService.friendship.findMany({
            where: {
                OR: [
                    {
                        userId: userId
                    },
                    {
                        friendId: userId
                    }
                ] 
            }
        });

        const set = new Set<number>();
        for(let i =0; i< friends.length; i++) {
            set.add(friends[i].userId)
            set.add(friends[i].friendId)
        }

        const friendIds = [...set].filter(item => item !== userId);

        const res = [];

        for(let i = 0; i< friendIds.length; i++) {
            const user = await this.prismaService.user.findUnique({
                where: {
                  id: friendIds[i],
                },
                select: {
                  id: true,
                  username: true,
                  nickName: true,
                  email: true
                }
            })
            res.push(user)
        }

        return res.filter((item: User) => item.nickName.includes(name))
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
