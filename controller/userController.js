const User = require('../models/userModel');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// passport authentication strategy

// USER SIGN UP CONTROL
exports.index = function (req, res) {
  res.redirect('/user/login');
};
exports.user_signUp_get = function (req, res) {
  res.render('sign-up', { title: 'Sign up' });
};
exports.user_signUp_post = [
  // validate and sanitize form
  body('firstname', 'invalid first-name')
    .trim()
    .isLength({ min: 1, max: 15 })
    .escape(),
  body('lastname', 'invalid last name')
    .trim()
    .isLength({ min: 1, max: 15 })
    .escape(),
  body('username', 'invalid username')
    .trim()
    .isLength({ min: 1, max: 25 })
    .escape(),
  body('password', 'invalid password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, (err, hashedPw) => {
      if (err || !errors.isEmpty()) {
        res.render('sign-up', {
          userInput: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: '',
          },
          errors: errors.array(),
        });
      } else {
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: hashedPw,
        });
        user.save(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      }
    });
  },
];

// USER LOGIN AND LOGOUT CONTROLS
exports.user_login_get = function (req, res) {
  res.render('login', {
    user: req.user,
    message: req.flash('error'),
  });
};
exports.user_login_post = function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/user/login',
    failureFlash: true,
  })(req, res, next);

  // authenticate username and password
  // with bcrypt
};
exports.user_logout_post = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.user_profile_get = (req, res) => {
  res.render('profile', { title: 'Profile', user: req.user });
};
