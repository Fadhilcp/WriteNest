import { createClient } from 'redis';
import { env } from './env.config';

const redisClient = createClient({
    username: env.REDIS_CLIENT_USERNAME,
    password: env.REDIS_CLIENT_PASSWORD,
    socket: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err)
});
redisClient.on('connect', () => {
    console.log('Redis gracefully connected.')
});
redisClient.on('ready', () => {
    console.log('Redis is ready to receive commands.')
});
redisClient.on('reconnecting', () => {
    console.log('Redis is reconnecting...')
});

export const initialiseRedis = async (): Promise<void> => {
    try {
        await redisClient.connect();

        const ping = await redisClient.ping();
        console.log(`Redis Initialised Successfully: ${ping}`);
    } catch (error) {
        console.error('Failed to initialise Redis connection:', error);
        process.exit(1);
    }
};

export default redisClient;