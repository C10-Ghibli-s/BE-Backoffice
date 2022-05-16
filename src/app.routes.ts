import { Server } from '@hapi/hapi';
import { site } from './app.controller';

export const routes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: site,
  });
};
