using System.Text;
using RabbitMQ.Client;

var factory = new ConnectionFactory { HostName = "localhost" };
// var factory = new ConnectionFactory { Uri = new Uri("amqps://**AMQP_URI**") };
using var connection = factory.CreateConnection();
using var channel = connection.CreateModel();

channel.QueueDeclare(queue: "testing",
                     durable: false,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);

string message = "Dotnet sender here!!";
do {
    var body = Encoding.UTF8.GetBytes(message);

    channel.BasicPublish(exchange: string.Empty,
                        routingKey: "testing",
                        basicProperties: null,
                        body: body);
    Console.WriteLine($" [x] Sent {message}");

    Console.WriteLine(" Press [enter] to exit or write new message.");

    message = Console.ReadLine();
}
while (message.Length > 0 && message is not null);
