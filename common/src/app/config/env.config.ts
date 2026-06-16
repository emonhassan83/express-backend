// common/src/config/env.config.ts

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export const config = {
  port:  process.env.PORT,
  database: {
    primaryUri: process.env.MONGODB_URI,
    readUri: process.env.MONGODB_READ_URI,
  }
};
