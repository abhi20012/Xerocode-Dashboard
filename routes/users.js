const router = require('express').Router();
const passport = require('passport');

const userController = require('../controller/user_controller');

router.get('/dashboard', passport.checkAuthentication ,userController.userDashboard);

router.get('/signin',userController.signin);
router.get('/signup', userController.signup);
router.get('/signout', userController.destroySession);

router.post('/create', userController.create);

//using passport as a middle for authentication and authorization
router.post('/create-session', passport.authenticate(
	'local',
	{failureRedirect:'/users/signup', failureFlash:"Invalid username/password"},
) ,userController.createSession);


//google auth url
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin'}), userController.createSession);

//github auth url
router.get('/auth/github',passport.authenticate('github'));
router.get('/auth/github/callback',passport.authenticate('github', {failureRedirect: '/users/signin'}), userController.createSession);

module.exports = router;