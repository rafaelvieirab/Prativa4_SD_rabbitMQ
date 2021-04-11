import { Channel, ConsumeMessage } from "amqplib";

export default interface SmartObject {
  setChannel(channel: Channel): void;
  handleConsume(msg: ConsumeMessage | null): void;
}