import { Server } from '@hapi/hapi';
import { routes } from './app.routes';
import * as config from './Config/default';

export const init = async () => {
  const server = new Server({
    port: config.port||3000,
    host: 'localhost',
  });

  routes(server);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

