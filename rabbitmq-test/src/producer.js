import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertQueue('aaa', {durable: false});

let i = 1;
setInterval(async () => {
    const msg = 'hello' + i;
    console.log('发送消息：', msg);
    await channel.sendToQueue('aaa',Buffer.from(msg))
    i++;
}, 500);
