import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswerService {
  getHello(): string {
    return 'Hello World!';
  }
}
