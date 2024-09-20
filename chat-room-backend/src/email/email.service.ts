import { Injectable } from '@nestjs/common';
import { createTransport, Transporter} from 'nodemailer';

@Injectable()
export class EmailService {

    transporter: Transporter
    
    constructor() {
      this.transporter = createTransport({
          host: "smtp.qq.com",
          port: 587,
          secure: false,
          auth: {
              user: '1024195375@qq.com',
              pass: 'ikywzuxqoimbbejj'
          },
      });
    }

    async sendMail({ to, subject, html }) {
      await this.transporter.sendMail({
        from: {
          name: '聊天室',
          address: '1024195375@qq.com'
        },
        to,
        subject,
        html
      });
    }
}