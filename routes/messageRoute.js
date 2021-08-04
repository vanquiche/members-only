var express = require('express');
var router = express.Router();
const message_controller = require('../controller/messageController');

/* GET home page. */
router.get('/', message_controller.index);

router.post('/', message_controller.new_message_post);

router.delete('/:_id', message_controller.remove_message_delete);

module.exports = router;
