import dotenv from 'dotenv';
import { Config } from '../types/';

dotenv.config();

const optionalConfig = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'dev',
};

const requiredConfig: Config = {
  DATABASE_URL: process.env.DATABASE_URL,
};

for (const key in requiredConfig) {
  // include null and undefined
  if (requiredConfig[key] == null) {
    throw new Error(`Missing value for ${key}`);
  }
}

module.exports = {
  ...optionalConfig,
  ...requiredConfig,
};
