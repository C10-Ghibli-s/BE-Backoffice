import { Request, Server } from '@hapi/hapi';
import * as jwt from 'hapi-auth-jwt2';
import * as jwksRsa from 'jwks-rsa';
import config from '../Config/default';

const validateUser = async (decoded: any) => {
  if (decoded && decoded.sub) {
    return {
      isValid: true
    };
  } else {
    return {
      isValid: false
    };
  }
};

// * Check JSON Web Token
export const CheckJWT = async (server: Server) => {
  await server.register({
    plugin: jwt
  });
  server.auth.strategy('jwt', 'jwt', {
    complete: true,
    headerKey: 'authorization',
    tokenType: 'Bearer',

    key: jwksRsa.hapiJwt2KeyAsync({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${config.auth0IssuerBaseUrl}/.well-known/jwks.json`
    }),

    validate: validateUser,

    verifyOptions: {
      audience: config.auth0Audience,
      issuer: `${config.auth0IssuerBaseUrl}/`,
      algorithms: ['RS256']
    }
  });
  server.auth.default('jwt');

  server.route([{
    method: 'GET',
    path: '/verify',
    options: { auth: 'jwt' },
    handler: (req: Request) => {
      return (req.auth.credentials);
    }
  }]);
};
