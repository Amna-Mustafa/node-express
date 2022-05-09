const User = require('../models').User;

module.exports = {
  list(req, res) {
    return User
      .findAll({
        include: [{
          model: User,
          as: 'users'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: User, as: 'users' }, 'createdAt', 'DESC'],
        ],
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => { res.status(400).send(error); });
  },

  add(req, res) {
    //   return res.json(req.body);
    return User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

};