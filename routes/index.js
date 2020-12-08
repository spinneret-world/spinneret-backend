var express = require('express');
var router = express.Router();

const PostController = require('../controllers/PostController');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});

// Posts
router.get('/posts', PostController.list);
router.get('/posts/:id', PostController.get);

module.exports = router;
