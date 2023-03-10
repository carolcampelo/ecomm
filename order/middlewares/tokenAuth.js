const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const BearerStrategy = require('passport-http-bearer').Strategy;

dotenv.config();

passport.use(new BearerStrategy(
  (token, done) => {
    try {
      const payload = jwt.verify(token, process.env.APP_SECRET);
      done(null, payload, { scope: 'all' });
    } catch (err) {
      done(err, false);
    }
  },
));

const authBearer = (req, res, next) => {
  passport.authenticate(
    'bearer',
    { session: false },
    (err, data) => {
      if (!data) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = data;
      return next();
    },
  )(req, res, next);
};

module.exports = authBearer;
