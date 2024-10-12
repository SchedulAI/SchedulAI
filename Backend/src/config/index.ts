import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOSTNAME: process.env.HOSTNAME || 'localhost',
  PORT: process.env.PORT || 3000,
  SECRET_KEY: process.env.SECRET_KEY || 'secret',
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  OPENAIKEY: process.env.OPENAIKEY,
};

export default config;
