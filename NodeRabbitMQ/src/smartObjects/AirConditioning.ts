import { Channel, ConsumeMessage } from "amqplib";
import rabbitMQ from "../config/rabbitMQ";

export class AirConditioning {
  private isOn: boolean;
  private idealTemperature: number;

  constructor(idealTemperature: number) {
    this.isOn = false;
    this.idealTemperature = idealTemperature;
  }

  public async setChannel(channel: Channel) {
    const queue = rabbitMQ.QUEUES.TEMPERATURE;

    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, rabbitMQ.EXCHANGE, queue);
    await channel.consume(queue,
      (msg) => {
        this.handleConsume(msg);
      },
      { noAck: true });
  }

  public handleConsume(msg: ConsumeMessage | null) {
    if (msg) {
      try {
        const temperature = Number.parseFloat(msg.content.toString());
        this.handleTemperature(temperature);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public handleTemperature(actualTemperature: number) {
    if (actualTemperature < this.idealTemperature)
      this.turnOff();
    else
      this.turnOn();
  }

  private turnOn() {
    this.isOn = true;
    console.log('> O ar condicionado foi ligado....');
  }

  private turnOff() {
    this.isOn = false;
    console.log('> O ar condicionado foi desligado....');
  }

}
