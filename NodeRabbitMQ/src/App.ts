import rabbitMQ from "./config/rabbitMQ";
import RabbitMQ from "./RabbitMQ";
import SmartHome from "./SmartHome";

RabbitMQ.init().then(() => {
  let smartHome = new SmartHome();
  smartHome.init();
  RabbitMQ.send(32, rabbitMQ.QUEUES.TEMPERATURE);
  RabbitMQ.send(32, rabbitMQ.QUEUES.DISTANCE);
  RabbitMQ.send(32, rabbitMQ.QUEUES.BRIGHHTNESS);
  RabbitMQ.send('START', rabbitMQ.QUEUES.COMMAND);
  
  smartHome.close();
  RabbitMQ.close();
});
