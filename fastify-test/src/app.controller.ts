import { Controller, Get, Inject, Request, Response } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(@Request() request: FastifyRequest, @Response({passthrough: true}) reply: FastifyReply) {
    reply.header('url', request.url)
    return 'hello';
  }

  @Get('aaa')
  getHello2(@Request() request: FastifyRequest, @Response() reply: FastifyReply) {
    reply.header('url', request.url)
    reply.send('hello')
  }
}
