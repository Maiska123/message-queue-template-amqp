import { connect } from 'amqplib';

// const connection = await connect('amqp://localhost');
const connection = await connect('amqps://localhost');
const channel = await connection.createChannel();
const queue = 'testing';
let message = 'Testiviesti, kuuluuko?';

await channel.assertQueue(queue, { durable: true });

console.log('Kirjoita viestisi ja paina enter...');

function sendMessage() {
    channel.sendToQueue(queue, Buffer.from(message));
    console.log('Viesti lähetetty!');
}

// setInterval(() => {
//     sendMessage();
// }, 1500);

var stdin = process.openStdin();

stdin.addListener("data", (d) => {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    console.log("you entered: [" +
        d.toString().trim() + "]");

    message = d.toString().trim();
    if (message.length > 0 || message !== null) sendMessage();
});