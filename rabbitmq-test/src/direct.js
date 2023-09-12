import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('direct-test-exchange', 'direct');

channel.publish('direct-test-exchange', 'aaa',  Buffer.from('hello1'));
channel.publish('direct-test-exchange', 'bbb',  Buffer.from('hello2'));
channel.publish('direct-test-exchange', 'ccc',  Buffer.from('hello3'));
