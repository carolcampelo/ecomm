import redis from 'redis';

const redisConnection = redis.createClient({ socket: { host: 'redis', port: '6379' } });

export default redisConnection;
