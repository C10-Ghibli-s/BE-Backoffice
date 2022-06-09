import { Server } from '@hapi/hapi';
import { site, notFound } from './app.controller';

export const routes = async (server: Server) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: site,
  });
  server.route({
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler: notFound
  });
};
