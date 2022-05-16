import * as dotenv from 'dotenv';
dotenv.config();

let path;
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'prod') {
  path = `${__dirname}/../../.prod.env`;
}else if (process.env.NODE_ENV === 'stag') {
  path = `${__dirname}/../../.stag.env`;
}else {
  path = `${__dirname}/../../../.env`;
}
console.log(path);

dotenv.config({ path: path });

export const port = process.env.PORT;
export const environment = process.env.ENVIRONMENT;
