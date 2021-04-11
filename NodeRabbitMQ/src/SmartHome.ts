import { Channel, connect, Connection, ConsumeMessage } from 'amqplib';

import rabbitMqUrl from './config/connection';
import rabbitMQ from './config/rabbitMQ';

import { AirConditioning } from './smartObjects/AirConditioning';
import { DigitalLock } from './smartObjects/DigitalLock';
import { LightBulb } from './smartObjects/LightBulb';
import { VacuumCleanner } from './smartObjects/VacuumCleaner';

export default class SmartHome {
	private airConditioner!: AirConditioning;
	private digitalLock!: DigitalLock;
	private lightbulb!: LightBulb;
	private vacuumCleaner!: VacuumCleanner;

	private connection!: Connection;
	private channel!: Channel;

	constructor() {
		this.airConditioner = new AirConditioning(123);
		this.digitalLock = new DigitalLock(123);
		this.lightbulb = new LightBulb(123);
		this.vacuumCleaner = new VacuumCleanner();
	}

  public async init() {
		this.connection = await connect(rabbitMqUrl.URL);
		this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(rabbitMQ.EXCHANGE, 'direct', { durable: false });

		this.airConditioner.setChannel(this.channel);
		this.digitalLock.setChannel(this.channel);
		this.lightbulb.setChannel(this.channel);
		this.vacuumCleaner.setChannel(this.channel);

	}

	public async close() {
		if(this.channel)
			await this.channel.close();
		if(this.connection)
    	await this.connection.close();
	}
}