import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';

interface FindById {
  id: number;
}
interface Book {
  id: number;
  name: string;
  desc: string;  
}
interface BookService {
  findBook(param: FindById): Book 
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('BOOK_PACKAGE') 
  private client: ClientGrpc;

  private bookService: BookService;

  onModuleInit() {
    this.bookService = this.client.getService('BookService');
  }

  @Get('book/:id')
  getHero(@Param('id') id: number) {
    return this.bookService.findBook({
      id
    });
  }
}
