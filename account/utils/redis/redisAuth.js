import jwt from 'jsonwebtoken';
import redisConnection from './redisConnect.js';

async function addTokenToBlocklist(token) {
  await redisConnection.set(token, '');
  redisConnection.expireAt(token, jwt.decode(token).exp);
}

async function findTokenAtBlocklist(token) {
  const tokenSearchResult = await redisConnection.exists(token);
  if (tokenSearchResult) {
    throw new jwt.JsonWebTokenError('Invalid Token.');
  }
}

export {
  addTokenToBlocklist,
  findTokenAtBlocklist,
};
