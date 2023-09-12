import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('direct-test-exchange2', 'topic');

channel.publish('direct-test-exchange2', 'aaa.1',  Buffer.from('hello1'));
channel.publish('direct-test-exchange2', 'aaa.2',  Buffer.from('hello2'));
channel.publish('direct-test-exchange2', 'bbb.1',  Buffer.from('hello3'));
