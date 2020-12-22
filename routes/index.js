var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const UserController = require('../controllers/UserController');
const PostController = require('../controllers/PostController');
const ShowController = require('../controllers/ShowController');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});

// Auth
router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            console.log(err);
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

// Users
router.get('/users', UserController.list);
router.get('/users/:id', UserController.get);

// Posts
router.get('/posts', PostController.list);
router.get('/posts/:id', PostController.get);
router.post('/posts', PostController.insert);

// shows
router.get('/shows', ShowController.list);
router.get('/shows/:id', ShowController.get);

module.exports = router;
