import { envSchema } from './configSchema';
import { Server } from '@hapi/hapi';

export async function configValidator(envVars: object, server: Server) {
  const { error } = envSchema.validate(envVars);
  if (error) {
    server.stop();
    return console.log(error.message + '. In order to run the server, please add the environment varibles that it requests.');
  }
  //* Initialize Hapi server
  await server.start();
  console.log('The configuration was correctly executed.');
  return console.log('Server running on %s', server.info.uri);
}
