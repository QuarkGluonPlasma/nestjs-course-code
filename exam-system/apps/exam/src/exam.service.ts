import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamService {
  getHello(): string {
    return 'Hello World!';
  }
}
