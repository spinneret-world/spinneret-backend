const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const PostController = require('../controllers/PostController');
const ShowController = require('../controllers/ShowController');
const ProductController = require('../controllers/ProductController');
const OrderController = require('../controllers/OrderController');
const SettingsController = require('../controllers/SettingsController');

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
router.get('/orders', OrderController.list);
router.get('/orders/:id', OrderController.get);
router.patch('/orders/:id', OrderController.patch);

// Settings
router.post('/settings', SettingsController.insert);

module.exports = router;
