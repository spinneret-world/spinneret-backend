const Setting = require('../models/Setting');

const SettingsController = {
  // Unused - do we need this?
  async list (req, res, next) {
    try {
      const Settings = await Setting
        .query()
        .catch(error => next(error));
      res.status(200).json({ settings: Settings });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error listing settings" });
    }
  },

  async get (req, res, next) {
    try {
      const Settings = await Setting
        .query()
        .modify('defaultSelects')
        // Only get latest settings record
        .orderBy('created_at', 'desc')
        .first()
        .catch(error => next(error));
      res.status(200).json({ settings: Settings });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching latest settings" });
    }
  },

  async insert (req, res, next) {
    try {
      const Settings = await Setting
        .query()
        .insert(req.body)
        // Can we use .modify in conjunction with .returning?
        .returning('*')
        .catch(error => next(error));
      res.status(200).json({ settings: Settings });
    } catch (error) {
      res.status(500).json({ error: "Error inserting settings" });
    }
  },
};

module.exports = SettingsController;
