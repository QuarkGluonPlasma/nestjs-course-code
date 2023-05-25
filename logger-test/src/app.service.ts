import { Inject, Injectable } from '@nestjs/common';
import { MyLogger } from './logger/MyLogger';

@Injectable()
export class AppService {
  @Inject(MyLogger)
  private logger: MyLogger

  getHello(): string {
    this.logger.log('aaaa', AppService.name);
    return 'Hello World!';
  }
}
