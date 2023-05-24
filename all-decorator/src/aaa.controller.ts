import { Controller, Get, Head, Header, HostParam, HttpCode, Next, Redirect, Render, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
    @Get('bbb')
    hello(@HostParam('host') host) {
        return host;
    }

    @Get('ccc')
    ccc(@Req() req: Request) {
        console.log(req.hostname);
        console.log(req.url);
    }

    @Get('ddd')
    ddd(@Res({passthrough: true}) res: Response) {
        return 'ddd'
    }

    @Get('eee')
    eee(@Next() next: NextFunction) {
        console.log('handler1');
        next();
        return '111'
    }

    @Get('eee')
    eee2() {
        console.log('handler2');
        return 'eee';
    }

    @Get('fff')
    @HttpCode(222)
    fff() {
        return 'hello'
    }

    @Get('ggg')
    @Header('aaa', 'bbb')
    ggg() {
        return 'hello'
    }

    @Get('hhh')
    @Redirect('http://juejin.cn')
    hhh() {

    }

    @Get('user')
    @Render('user')
    user() {
        return {name: 'guang', age: 20}
    }
}
