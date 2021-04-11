const ADDRESS = 'localhost';
const PORT= 5672;

const rabbitMqUrl = {
  ADDRESS,
  PORT,
  URL: `amqp://${ADDRESS}:${PORT}`
}

export default rabbitMqUrl;