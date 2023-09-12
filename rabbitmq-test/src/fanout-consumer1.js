import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('direct-test-exchange3', 'fanout');

const { queue } = await channel.assertQueue('queue1');
await channel.bindQueue(queue,  'direct-test-exchange3', 'aaa');

channel.consume(queue, msg => {
    console.log(msg.content.toString())
}, { noAck: true });
