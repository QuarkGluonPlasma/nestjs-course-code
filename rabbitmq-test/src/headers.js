import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('direct-test-exchange4', 'headers');

channel.publish('direct-test-exchange4', '',  Buffer.from('hello1'), {
    headers: {
        name: 'guang'
    }
});
channel.publish('direct-test-exchange4', '',  Buffer.from('hello2'), {
    headers: {
        name: 'guang'
    }
});
channel.publish('direct-test-exchange4', '',  Buffer.from('hello3'), {
    headers: {
        name: 'dong'
    }
});
