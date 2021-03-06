import * as dotenv from 'dotenv';

let path;
if (process.env.NODE_ENV === 'prod') {
  path = `${__dirname}/../../.prod.env`;
}else if (process.env.NODE_ENV === 'stag') {
  path = `${__dirname}/../../.stag.env`;
}else {
  path = `${__dirname}/../../.env`;
}

dotenv.config({ path: path });


export default {
  port: process.env.PORT,
  environment: process.env.ENVIRONMENT,
  auth0IssuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL,
  auth0Audience: process.env.AUTH0_AUDIENCE
};
