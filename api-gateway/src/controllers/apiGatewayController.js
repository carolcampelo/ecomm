import { addTokenToBlocklist } from '../../redis/redisAuth.js';
import generateToken from '../middlewares/auth.js';

class ApiGatewayController {
  static userLogin = async (req, res) => {
    try {
      const token = await generateToken(req.user);
      return res.set('Authorization', token).status(204).send();
    } catch (err) {
      return res.status(400).send(err.message);
    }
  };

  static userLogout = async (req, res) => {
    try {
      await addTokenToBlocklist(req.token);
      return res.status(204).send('Ok.');
    } catch (err) {
      return res.status(400).send({ message: `${err.message}` });
    }
  };
}

export default ApiGatewayController;