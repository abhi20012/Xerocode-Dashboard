const router = require('express').Router();

const userController = require('../controller/user_controller');

router.get('/signin', userController.signin);
router.get('/signup', userController.signup);


router.post('/create', userController.create);

module.exports = router;