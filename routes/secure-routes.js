const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Get user from JWT
router.get('/profile',  UserController.profile);

// Users
router.get('/users', UserController.list);
router.get('/users/:id', UserController.get);

// Posts
router.post('/posts', PostController.insert);
router.patch('/posts/:id', PostController.patch);

// shows
router.post('/shows', ShowController.insert);
router.patch('/shows/:id', ShowController.patch);

// Products
router.post('/products', ProductController.insert);
router.patch('/products/:id', ProductController.patch);

// Orders
router.post('/orders', OrderController.insert);
router.patch('/orders/:id', OrderController.patch);

module.exports = router;
