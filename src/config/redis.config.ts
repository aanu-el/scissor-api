import { createClient } from 'redis';
require('dotenv').config();

export const client = createClient({
    password: process.env.REDIS_PASSWORD as string,
    socket: {
        host: process.env.REDIS_HOST as string,
        port: process.env.REDIS_PORT as any
    }
});
