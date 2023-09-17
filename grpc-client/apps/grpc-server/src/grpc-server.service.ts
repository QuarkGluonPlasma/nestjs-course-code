import { Injectable } from '@nestjs/common';

@Injectable()
export class GrpcServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
