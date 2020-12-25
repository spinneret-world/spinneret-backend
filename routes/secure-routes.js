const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get(
  '/profile',
  UserController.profile
  // (req, res, next) => {
  //   res.json({
  //     user: req.user
  //   })
  // }
);

module.exports = router;
