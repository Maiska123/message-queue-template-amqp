import { connect } from 'amqplib';

const connection = await connect('amqp://localhost');
const channel = await connection.createChannel();
const queue = 'test-messages';

await channel.assertQueue(queue, { durable: false });

channel.consume(queue, (msg) => {

    let info = "1 Uusi Viesti:",
        fields = "",
        properties = "";

    if (msg.fields.deliveryTag > 1) {
        info = msg.fields.deliveryTag.toString() + " Uutta viestiä: "
    }

    for (const [key, val] of Object.entries(msg.fields)) {
        if (typeof val === 'object' && val !== null) {
            for (const [key, val2] of Object.entries(val)) {
                fields += key + '\t' + val2 + ' + \n ';
            }
        } else if (val !== undefined || key !== undefined) {
            fields += key + '\t' + val + ' + \n ';
        }

    }

    for (const [key, val] of Object.entries(msg.properties)) {
        if (typeof val === 'object' && val !== null) {
            for (const [key, val2] of Object.entries(val)) {
                properties += key + '\t' + val2 + ' - \n ';
            }
        } else if (val !== undefined || key !== undefined) {
            properties += key + '\t' + val + ' - \n ';
        }

    }

    console.log(`${info} ${msg.content} \n ${fields} \n ${properties}`)

})