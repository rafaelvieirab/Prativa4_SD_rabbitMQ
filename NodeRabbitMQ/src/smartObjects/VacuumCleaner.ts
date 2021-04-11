import { Channel, ConsumeMessage } from "amqplib";
import rabbitMQ from "../config/rabbitMQ";
import SmartObject from "./SmartObject";

export class VacuumCleanner implements SmartObject {
  private isOn: boolean;

  constructor() {
    this.isOn = false;
  }

  public async setChannel(channel: Channel) {
    const queue = rabbitMQ.QUEUES.COMMAND;

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
        const command = msg.content.toString();
        this.handleStatus(command.toUpperCase() === 'LIGA');
      } catch (error) {
        console.error(error);
      }
    }
  }

  private turnOn() {
    this.isOn = true;
    console.log('> O Aspirador de pó está ligado....');
  }

  private turnOff() {
    this.isOn = false;
    console.log('> O Aspirador de pó está desligado....');
  }

  public handleStatus(mustTurnOn: boolean) {
    if (mustTurnOn) 
      this.turnOn();
    else 
      this.turnOff();
  }
}
