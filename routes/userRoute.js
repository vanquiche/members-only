var express = require('express');
var router = express.Router();
const user_controller = require('../controller/userController');

/* GET home page. */
router.get('/', user_controller.index);

router.get('/sign-up', user_controller.user_signUp_get);
router.post('/sign-up', user_controller.user_signUp_post);

router.get('/login', user_controller.user_login_get);
router.post('/login', user_controller.user_login_post);

router.get('/profile', user_controller.user_profile_get);
router.post('/profile', user_controller.user_logout_post);

module.exports = router;
