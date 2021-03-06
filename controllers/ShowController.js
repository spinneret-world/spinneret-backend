const Show = require('../models/Show');

const ShowController = {
  async list (req, res, next) {
    try {
      const shows = await Show
        .query()
        .catch(error => next(error));
      res.status(200).json({ shows: shows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error listing shows" });
    }
  },

  async get (req, res, next) {
    try {
      const show = await Show
        .query()
        .findById(req.params.id)
        .catch(error => next(error));
      res.status(200).json({ show: show });
    } catch (error) {
      res.status(500).json({ error: "Error fetching show" });
    }
  },

  async insert (req, res, next) {
    try {
      const show = await Show
        .query()
        .insert(req.body)
        .returning('*')
        .catch(error => next(error));
      res.status(200).json({ show: show });
    } catch (error) {
      res.status(500).json({ error: "Error inserting show" });
    }
  },

  async patch (req, res, next) {
    try {
      const show = await Show
        .query()
        .patch(req.body)
        .findById(req.params.id)
        .returning('*')
        .catch(error => next(error));
      res.status(200).json({ show: show });
    } catch (error) {
      res.status(500).json({ error: "Error patching show" });
    }
  },

};

module.exports = ShowController;
