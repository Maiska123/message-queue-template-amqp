import { connect } from 'amqplib';

const connection = await connect('amqp://localhost');
const channel = await connection.createChannel();
const queue = 'test-messages';

await channel.assertQueue(queue, { durable: false });

channel.consume(queue, (msg) => {

    let fields, properties;

    for (const [key, val] of Object.entries(msg.fields)) {
        if (typeof val === 'object' && val !== null) {
            for (const [key, val2] of Object.entries(val)) {
                fields += '\t' + val2 + '+ \n ';
            }
        } else {
            fields += '\t' + val + '+ \n ';
        }
    }

    for (const [key, val] of Object.entries(msg.properties)) {
        if (typeof val === 'object' && val !== null) {
            for (const [key, val2] of Object.entries(val)) {
                properties += '\t' + val2 + '- \n ';
            }
        } else {
            properties += '\t' + val + '- \n ';
        }
    }

    console.log(`1 Uusi Viesti: ${msg.content} \n ${fields} \n ${properties}`)

})