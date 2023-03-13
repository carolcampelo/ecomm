import User from '../models/user.js';
import generateToken from '../middlewares/userAuth.js';

class UserController {
  static listUsers = (req, res) => {
    User.find((err, user) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).json(user);
    });
  };

  static findUserById = (req, res) => {
    const { id } = req.params;

    User.findById(id, (err, user) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - ID Not Found.` });
      } else {
        res.status(200).json(user);
      }
    });
  };

  static addUser = (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(201).send(user.toJSON());
      }
    });
  };

  static userLogin = async (req, res) => {
    try {
      const token = await generateToken(req.user);
      return res.set('Authorization', token).status(204).send();
    } catch (err) {
      return res.status(400).send(err.message);
    }
  };

  static updateUser = (req, res) => {
    const { id } = req.params;

    User.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(User);
      }
    });
  };

  static deleteUser = (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(400).send({ message: `${err.message}` });
      } else {
        res.status(200).json(User);
      }
    });
  };
}

export default UserController;
