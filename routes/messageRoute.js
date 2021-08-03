var express = require('express');
var router = express.Router();
const message_controller = require('../controller/messageController');
const Message = require('../models/messageModel');

/* GET home page. */
router.get('/', message_controller.index);

router.post('/', message_controller.new_message_post)

module.exports = router;
