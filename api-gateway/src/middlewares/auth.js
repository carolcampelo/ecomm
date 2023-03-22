/* eslint-disable object-shorthand */
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import BearerStrategy from 'passport-http-bearer';
import LocalStrategy from 'passport-local';
import User from '../models/user.js';
import { findTokenAtBlocklist } from '../../redis/redisAuth.js';

async function verifyPassword(password, hashPassword) {
  const comparison = await bcrypt.compare(password, hashPassword);
  return comparison;
}

async function generateToken(user) {
  const payload = {
    id: user._id,
  };
  const token = await jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '15m' });
  return token;
}

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
}, async (userEmail, userPassword, done) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user || !await verifyPassword(userPassword, user.password)) {
      return done(null, false, {
        message: 'Check your credentials and try again!',
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

passport.use(new BearerStrategy(
  async (token, done) => {
    try {
      const payload = jwt.verify(token, process.env.APP_SECRET);
      console.log(token);
      await findTokenAtBlocklist(token);
      done(null, payload, { token: token });
    } catch (err) {
      done(err);
    }
  },
));

export const authLocal = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err, data, info) => {
      if (!data) {
        return res.status(401).json({ info });
      }
      req.user = data;
      return next();
    },
  )(req, res, next);
};

export const authBearer = (req, res, next) => {
  passport.authenticate(
    'bearer',
    { session: false },
    (err, user, info) => {
      if (err) {
        return res.status(500).json({ err });
      }
      if (!user) {
        return res.status(401).json({ err, user, info });
      }
      req.token = info.token;
      return next();
    },
  )(req, res, next);
};

export default generateToken;
