import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';
import { Inject } from '@nestjs/common';
import { CreateTodoList } from './todolist-create.dto';
import { UpdateTodoList } from './todolist-update.dto';

@Resolver()
export class TodolistResolver {

    @Inject(PrismaService)
    private prismaService: PrismaService;

    @Query("todolist")
    async todolist() {
        return this.prismaService.todoItem.findMany();
    }

    @Query("queryById")
    async queryById(@Args('id') id) {
        return this.prismaService.todoItem.findUnique({
            where: {
                id
            }
        })
    }

    @Mutation("createTodoItem")
    async createTodoItem(@Args("todoItem") todoItem: CreateTodoList) {
        console.log(todoItem);
        return this.prismaService.todoItem.create({
            data: todoItem,
            select: {
              id: true,
              content: true,
              createTime: true
            }
          });
    }


    @Mutation("updateTodoItem")
    async updateTodoItem(@Args('todoItem') todoItem: UpdateTodoList) {
        return this.prismaService.todoItem.update({
            where: {
              id: todoItem.id
            },
            data: todoItem,
            select: {
              id: true,
              content: true,
              createTime: true
            }
          });
    }

    @Mutation("removeTodoItem")
    async removeTodoItem(@Args('id') id: number) {
        await this.prismaService.todoItem.delete({
            where: {
              id
            }
        })
        return id;
    }
}
