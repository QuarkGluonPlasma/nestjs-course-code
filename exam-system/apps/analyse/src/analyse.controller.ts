import { Controller, Get } from '@nestjs/common';
import { AnalyseService } from './analyse.service';

@Controller()
export class AnalyseController {
  constructor(private readonly analyseService: AnalyseService) {}

  @Get()
  getHello(): string {
    return this.analyseService.getHello();
  }
}
