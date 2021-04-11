const EXCHANGE = 'smart_home';

const QUEUES = {
  TEMPERATURE : 'temperature',
  BRIGHHTNESS : 'brightness',
  DISTANCE: 'distance',
  COMMAND: 'command'
}

export default {
  EXCHANGE,
  QUEUES
}

// module.exports = {
//   //Rabbit
//   rabbitMQConnectionString: "amqp://localhost:5672",

//   //Queue
//   rabbitMQQueue: "rocketseat-sample.queue",
//   rabbitMQExchange: "rocketseat-sample.exchange",
//   rabbitMQRoutingKey: "rocketseat-sample",
// }