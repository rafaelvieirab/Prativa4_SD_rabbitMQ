import rabbitMQ from "./config/rabbitMQ";
import publisher from "./Publisher";
import SmartHome from "./SmartHome";

console.log('\n\n');

publisher.init().then(() => {
  const smartHome = new SmartHome();
  smartHome.init();
  publisher.send(32, rabbitMQ.QUEUES.TEMPERATURE);
  publisher.send(10, rabbitMQ.QUEUES.DISTANCE);
  publisher.send(38, rabbitMQ.QUEUES.BRIGHHTNESS);
  publisher.send('LIGA', rabbitMQ.QUEUES.COMMAND);

  

  publisher.send(10, rabbitMQ.QUEUES.TEMPERATURE);
  publisher.send(2, rabbitMQ.QUEUES.DISTANCE);
  publisher.send(9, rabbitMQ.QUEUES.BRIGHHTNESS);
  publisher.send('DESLIGA', rabbitMQ.QUEUES.COMMAND);
  
  smartHome.close();
  publisher.close();
});
