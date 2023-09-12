import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

const { queue } = await channel.assertQueue('queue2');
await channel.bindQueue(queue,  'direct-test-exchange', 'bbb');

channel.consume(queue, msg => {
    console.log(msg.content.toString())
}, { noAck: true });
