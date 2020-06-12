const fastify = require('fastify')({
  logger: true,
});

const memory = {
  me: { fullname: 'João', contact: 'ZapZap' },
};

fastify.get('/me', async () => {
  return memory.me;
});

fastify.put('/me', async (request) => {  
  memory.me = request.body;
  return null;
});

const start = async () => {
  const port = 3001;
  try {
    await fastify.listen(port);    
  } catch (err) {    
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
