import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLogger extends ConsoleLogger{

    log(message, context) {
        console.log(`[${context}]`, message);
        console.log('--------------')
    }
}