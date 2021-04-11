import { Channel, connect, Connection, ConsumeMessage } from 'amqplib';

import rabbitMqUrl from './config/connection';
import rabbitMQ from './config/rabbitMQ';

import { AirConditioning } from './smartObjects/AirConditioning';
import { DigitalLock } from './smartObjects/DigitalLock';
import { LightBulb } from './smartObjects/LightBulb';
import { VacuumCleanner } from './smartObjects/VacuumCleaner';

export default class SmartHome {
	private connection!: Connection;
	private channel!: Channel;

	private airConditioner!: AirConditioning;
	private digitalLock!: DigitalLock;
	private lightbulb!: LightBulb;
	private vacuumCleaner!: VacuumCleanner;

	constructor() {
		this.airConditioner = new AirConditioning(20);
		this.digitalLock = new DigitalLock(5);
		this.lightbulb = new LightBulb(20);
		this.vacuumCleaner = new VacuumCleanner();
	}

  public async init() {
		this.connection = await connect(rabbitMqUrl.URL);
		this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(rabbitMQ.EXCHANGE, 'direct', { durable: false });

		await this.airConditioner.setChannel(this.channel);
		await this.digitalLock.setChannel(this.channel);
		await this.lightbulb.setChannel(this.channel);
		await this.vacuumCleaner.setChannel(this.channel);
	}

	public async close() {
		if(this.channel)
			await this.channel.close();
		if(this.connection)
    	await this.connection.close();
	}
}