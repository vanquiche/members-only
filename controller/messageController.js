const Message = require('../models/messageModel');
const { body, validationResult } = require('express-validator');
const {DateTime} = require('luxon');

exports.index = (req, res, next) => {
  if (!req.user) {
    res.redirect('/user/login');
  } else {
    Message.find({})
      .sort([['createdAt', -1]])
      .exec((err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        }

        res.render('messages', {
          title: 'Messages',
          user: req.user,
          author: req.user.username,
          messages: result,
        });
      });
  }
};
exports.new_message_post = [
  body('message').trim().isLength({ min: 1, max: 250 }).escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      message: req.body.message,
      author: req.user._id,
      createdAt: Date.now(),
    });

    message.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/messages');
    });
  },
];
