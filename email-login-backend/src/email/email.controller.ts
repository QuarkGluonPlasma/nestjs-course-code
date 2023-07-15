import { Controller, Get, Inject, Query } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject()
  private redisService: RedisService;

  @Get('code')
  async sendEmailCode(@Query("address") address) {
    const code = Math.random().toString().slice(2,8);

    await this.redisService.set(`captcha_${address}`, code, 5 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>你的登录验证码是 ${code}</p>`
    });
    return '发送成功';
  }
}
