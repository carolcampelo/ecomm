import redis from 'redis';

const redisConnection = redis.createClient({ socket: { host: 'redis', port: '6379' } });

redisConnection.connect();

redisConnection.on('error', (error) => {
  console.error(error);
});

redisConnection.on('connect', () => {
  console.log('Redis Connected!');
});

export default redisConnection;
