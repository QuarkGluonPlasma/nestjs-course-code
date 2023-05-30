import { Inject, Injectable } from '@nestjs/common';
import { MyLogger } from './logger/MyLogger';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
