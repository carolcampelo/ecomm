import users from '../models/user.js';
import generateToken from '../middlewares/userAuth.js';

class UserController {
  static listUsers = (req, res) => {
    users.find((err, users) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).json(users);
      }
    });
  };

  static listUsersById = (req, res) => {
    const { id } = req.params;

    users.findById(id, (err, users) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - ID Not Found.` });
      } else {
        res.status(200).json(users);
      }
    });
  };

  static addUsers = (req, res) => {
    const user = new users(req.body);
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

  static updateUsers = (req, res) => {
    const { id } = req.params;

    users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(users);
      }
    });
  };

  static deleteUsers = (req, res) => {
    const { id } = req.params;

    users.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(users);
      }
    });
  };
}

export default UserController;
