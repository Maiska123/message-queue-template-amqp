import { connect } from 'amqplib';

const connection = await connect('amqp://localhost');
const channel = await connection.createChannel();
const queue = 'test-messages';
const message = 'Testiviesti, kuuluuko?';

await channel.assertQueue(queue, { durable: false });

console.log('Viesti lähettyy...');

setTimeout(() => {
    channel.sendToQueue(queue, Buffer.from(message));
    console.log('Viesti lähetetty!');
}, 1500);