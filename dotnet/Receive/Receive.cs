using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

var factory = new ConnectionFactory { HostName = "localhost" };
// var factory = new ConnectionFactory { Uri = new Uri("amqps://**AMQP_URI**") };
using var connection = factory.CreateConnection();
using var channel = connection.CreateModel();

// no need to declare if one up already
// channel.QueueDeclare(queue: "testing",
//                      durable: true,
//                      exclusive: false,
//                      autoDelete: false,
//                      arguments: null);

Console.WriteLine(" [*] Waiting for messages.");

var consumer = new EventingBasicConsumer(channel);
consumer.Received += (model, ea) =>
{
    var body = ea.Body.ToArray();
    var message = Encoding.UTF8.GetString(body);
    Console.WriteLine($" [x] Received {message}");
};

channel.BasicConsume(queue: "testing",
                     autoAck: true,
                     consumer: consumer);

Console.WriteLine(" Press [enter] to exit.");
Console.ReadLine();