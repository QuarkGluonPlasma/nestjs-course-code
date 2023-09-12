import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('direct-test-exchange3', 'fanout');

channel.publish('direct-test-exchange3', '',  Buffer.from('hello1'));
channel.publish('direct-test-exchange3', '',  Buffer.from('hello2'));
channel.publish('direct-test-exchange3', '',  Buffer.from('hello3'));
