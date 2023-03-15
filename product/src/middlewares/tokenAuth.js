import passport from 'passport';
import jwt from 'jsonwebtoken';
import BearerStrategy from 'passport-http-bearer';

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

export default authBearer;
