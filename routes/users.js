const router = require('express').Router();
const passport = require('passport');

const userController = require('../controller/user_controller');

router.get('/dashboard', passport.checkAuthentication ,userController.userDashboard);

router.get('/signin', userController.signin);
router.get('/signup', userController.signup);
// router.get('/sign-out', userController.destroySession);

router.post('/create', userController.create);

//using passport as a middle for authentication and authorization
router.post('/create-session', passport.authenticate(
	'local',
	{failureRedirect:'/users/signup'}
) ,userController.createSession);

module.exports = router;