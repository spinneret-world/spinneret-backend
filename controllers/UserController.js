const User = require('../models/User');

const UserController = {
  async list (req, res, next) {
    try {
      const users = await User
        .query()
        .modify('defaultSelects')
        .catch(error => next(error));
      res.status(200).json({ users: users });
    } catch (error) {
      res.status(500).json({ error: "Error listing users" });
    }
  },

  async profile (req, res, next) {
    try {
      const user = await User
        .query()
        .modify('defaultSelects')
        .where({email: req.user.email})
        .first()
        .catch(error => next(error));
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ error: "Error fetching User" });
    }
  },


  async get (req, res, next) {
    try {
      const user = await User
        .query()
        .findById(req.params.id)
        .catch(error => next(error));
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ error: "Error fetching User" });
    }
  },

  async insert (req, res, next) {
    try {
      const user = await User
        .query()
        .insert(req.body.user)
        .returning('*')
        .catch(error => next(error));
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ error: "Error inserting User" });
    }
  },

  async patch (req, res, next) {
    try {
      const user = await User
        .query()
        .patch(req.body.User)
        .findById(req.params.id)
        .catch(error => next(error));
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ error: "Error patching User" });
    }
  },

};

module.exports = UserController;
