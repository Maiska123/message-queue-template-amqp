import { connect } from 'amqplib';

const connection = await connect('amqp://localhost');
const channel = await connection.createChannel();
const queue = 'test-messages';

await channel.assertQueue(queue, { durable: false });

channel.consume(queue, (msg) => { console.log(`1 Uusi Viesti: ${msg}`) })