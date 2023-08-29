import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { exec } from 'child_process';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('stream')
  stream() {
    return new Observable((observer) => {
      observer.next({ data: { msg: 'aaa'} });

      setTimeout(() => {
        observer.next({ data: { msg: 'bbb'} });
      }, 2000);

      setTimeout(() => {
        observer.next({ data: { msg: 'ccc'} });
      }, 5000);
    });
  }

  @Sse('stream2')
  stream2() {
    const childProcess = exec('tail -f ./log');

    return new Observable((observer) => {
      childProcess.stdout.on('data', (msg) => {
        observer.next({ data: { msg: msg.toString() }});
      })
    });
  }

  @Sse('stream3')
  stream3() {
    return new Observable((observer) => {
        const json = readFileSync('./package.json').toJSON();
        observer.next({ data: { msg: 1 }});
    });
  }
}

