const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
	usernameField:'email',
},

 async ( email, password, done) => {
	const user =  await User.findOne({email:email});
		if(!user || user.password != password){
			return done(null, false);
		}
		return done(null, user);
}	
));


//serializing the user 	to decide which key is to be kept in the cookies

passport.serializeUser(function(user, done){
	return done(null, user.id);
});


// deserializeUser from the key in the cookies

passport.deserializeUser(async (id, done) => {
	const user = await  User.findById(id);
		return done(null, user);
	})

//check if user is authenticated 
passport.checkAuthentication = (req, res, next) => {
	//if the user is signed in, pass on the request on the next function
	if(req.isAuthenticated()){
		return next();
	}

	//if user not signed in 
	return res.redirect('back');
}

passport.setAuthenticatedUser = function(req, res, next){
	if(req.isAuthenticated()){
		//req.user contains the current signed user from the session cookie ans we are just sending this to the locals for the views
		res.locals.user = req.user;
	}

	return next();
}

module.exports = passport;