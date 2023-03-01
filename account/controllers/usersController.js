import users from '../models/user.js';

class UserController {
  static listUsers = (req, res) => {
    users.find((err, users) => {
      if (err) {
        res.status(404).send({ message: 'Users not found' });
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
