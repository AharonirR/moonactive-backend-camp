import Redis from 'ioredis';

export const initializeRedis = (): Redis.Redis => {
    const redisClient = new Redis();

    redisClient.on('connect', () => {
        console.log('Connected to Redis');
    });

    redisClient.on('error', (error) => {
        console.error('Redis error:', error);
        throw new Error('Failed to connect to Redis');
    });

    return redisClient;
};
