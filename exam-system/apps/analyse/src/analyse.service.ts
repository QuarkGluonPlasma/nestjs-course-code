import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyseService {
  getHello(): string {
    return 'Hello World!';
  }
}
