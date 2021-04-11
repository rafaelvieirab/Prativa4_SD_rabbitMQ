import { Channel, ConsumeMessage } from "amqplib";
import rabbitMQ from "../config/rabbitMQ";

export class LightBulb {
  private isOn: boolean;
  private idealLuminosity: number;

  constructor(idealLuminosity: number) {
    this.isOn = false;
    this.idealLuminosity = idealLuminosity;
  }

  public async setChannel(channel: Channel) {
    const queue = rabbitMQ.QUEUES.BRIGHHTNESS;

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
        const luminosity = Number.parseInt(msg.content.toString());
        this.handleLuminosity(luminosity);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public handleLuminosity(actualLuminosity: number) {
    if (actualLuminosity >= this.idealLuminosity)
      this.turnOff();
    else
      this.turnOn();
  }

  private turnOn() {
    this.isOn = true;
    console.log('> A Lâmpada está ligada....');
  }

  private turnOff() {
    this.isOn = false;
    console.log('> A Lâmpada está desligada....');
  }
}
