import { Channel, connect, Connection } from 'amqplib';

import rabbitMqUrl from './config/connection';
import rabbitMQ from './config/rabbitMQ';

class RabiitMQ {
  private connection!: Connection;
  private channel!: Channel;

  constructor() {}

  public async init() {
    this.connection = await connect(rabbitMqUrl.URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(rabbitMQ.EXCHANGE, 'direct', { durable: false });
  }

  public send(rawMsg: any, routingKey: string) {
    if (!(rawMsg instanceof String)) {
      rawMsg = rawMsg.toString();
    }
    const readyMsg = rawMsg.toString();
    this.channel.publish(rabbitMQ.EXCHANGE, routingKey, Buffer.from(readyMsg));
  }

  public async close() {
		if(this.channel)
			await this.channel.close();
		if(this.connection)
    	await this.connection.close();
	}
}
const rabbit = new RabiitMQ
export default rabbit;