import { OtherService } from './other/other.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  @Inject(OtherService) 
  private otherService:OtherService;

  getHello(): string {
    return 'Hello World!' + this.otherService.xxx();
  }
}
