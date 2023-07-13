const nodemailer = require("nodemailer");
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
        user: 'xxx@qq.com',
        pass: '你的授权码'
    },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"xxx" <xxx@qq.com>',
    to: "xxx@xx.com",
    subject: "Hello 222", 
    html: fs.readFileSync('./test.html')
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);
