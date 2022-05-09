import { Server, Request, ResponseToolkit } from '@hapi/hapi';

export const routes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req: Request, h: ResponseToolkit) => {
      return `[C10-Squad-Search-Engine] 💚 Platzi Master : Development Environment`;
    }
  });
};
