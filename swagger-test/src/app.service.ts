import { ApiProperty } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
