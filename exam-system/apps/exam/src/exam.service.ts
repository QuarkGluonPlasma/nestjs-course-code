import { Inject, Injectable } from '@nestjs/common';
import { ExamAddDto } from './dto/exam-add.dto';
import { PrismaService } from '@app/prisma';
import { ExamSaveDto } from './dto/exam-save.dto';

@Injectable()
export class ExamService {
  getHello(): string {
    return 'Hello World!';
  }

  @Inject(PrismaService)
  private prismaService: PrismaService;

  async add(dto: ExamAddDto, userId: number) {
    return this.prismaService.exam.create({
      data: {
        name: dto.name,
        content: '',
        createUser: {
          connect: {
              id: userId
          }
        }
      }
    })
  }

  async find(id: number, userId: number) {
    return this.prismaService.exam.findUnique({
      where: {
        id,
        createUserId: userId
      }
    })
  }

  async list(userId: number, bin: string) {
    return this.prismaService.exam.findMany({
      where: bin !== undefined ? {
        createUserId: userId,
        isDelete: true
      } : {
        createUserId: userId,
      }
    })
  }

  async delete(userId: number, id: number) {
    return this.prismaService.exam.update({
      where: {
        id,
        createUserId: userId
      },
      data: {
        isDelete: true
      }
    })
  }

  async publish(userId: number, id: number) {
    return this.prismaService.exam.update({
      where: {
        id,
        createUserId: userId
      },
      data: {
        isPublish: true
      }
    })
  }

  async unpublish(userId: number, id: number) {
    return this.prismaService.exam.update({
      where: {
        id,
        createUserId: userId
      },
      data: {
        isPublish: false
      }
    })
  }

  async save(dto: ExamSaveDto) {
    return this.prismaService.exam.update({
      where: {
        id: dto.id
      },
      data: {
        content: dto.content
      }
    })
  }
}
