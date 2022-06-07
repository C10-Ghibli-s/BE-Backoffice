import { Request } from '@hapi/hapi';
import config from './Config/default';
import * as Boom from '@hapi/boom';

export const site = () => {
  return '[C10-Squad-Search-Engine] 💚 Platzi Master : '+ config.environment + ' Environment';
};

export const notFound = (req: Request) => {
  return Boom.notFound('This page is not available. Please, try with another route.', req.payload);
};
