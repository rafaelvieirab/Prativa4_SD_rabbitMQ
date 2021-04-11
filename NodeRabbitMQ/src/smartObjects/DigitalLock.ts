import { Channel, ConsumeMessage } from "amqplib";
import rabbitMQ from "../config/rabbitMQ";

export class DigitalLock {
  private isLocked: boolean;
  private minimumDistance: number;

  constructor(minimumDistance: number) {
    this.isLocked = false;
    this.minimumDistance = minimumDistance;
  }

  public async setChannel(channel: Channel) {
    const queue = rabbitMQ.QUEUES.DISTANCE;

    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, rabbitMQ.EXCHANGE, queue);
    await channel.consume(queue,
      (msg) => {
        this.handleConsume(msg);
      },
      { noAck: true });
  }

  private handleConsume(msg: ConsumeMessage | null) {
    if (msg) {
      try {
        const distance = Number.parseInt(msg.content.toString());
        this.handleLocking(distance);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public handleLocking(distanceToPerson: number) {
    if (distanceToPerson <= this.minimumDistance) 
      this.unlock();
    else 
      this.lock();
  }
  
  private lock() {
    this.isLocked = true;
    console.log('> A trava está bloqueada....');
  }

  private unlock() {
    this.isLocked = false;
    console.log('> A trava está desbloqueada....');
  }
}
