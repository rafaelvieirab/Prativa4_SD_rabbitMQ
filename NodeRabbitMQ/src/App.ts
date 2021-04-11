import rabbitMQ from "./config/rabbitMQ";
import RabbitMQ from "./Publisher";
import SmartHome from "./SmartHome";

console.log('\n\n');

RabbitMQ.init().then(() => {
  let smartHome = new SmartHome();
  smartHome.init();
  RabbitMQ.send(32, rabbitMQ.QUEUES.TEMPERATURE);
  RabbitMQ.send(10, rabbitMQ.QUEUES.DISTANCE);
  RabbitMQ.send(38, rabbitMQ.QUEUES.BRIGHHTNESS);
  RabbitMQ.send('LIGA', rabbitMQ.QUEUES.COMMAND);

  

  RabbitMQ.send(10, rabbitMQ.QUEUES.TEMPERATURE);
  RabbitMQ.send(2, rabbitMQ.QUEUES.DISTANCE);
  RabbitMQ.send(9, rabbitMQ.QUEUES.BRIGHHTNESS);
  RabbitMQ.send('DESLIGA', rabbitMQ.QUEUES.COMMAND);
  
  smartHome.close();
  RabbitMQ.close();
});
