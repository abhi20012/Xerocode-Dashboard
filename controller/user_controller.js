const User = require('../models/user');

module.exports.userDashboard = function(req, res){
	return res.render('dashboard', {
		title:"Dashboard from controller"
	})
}

module.exports.signup = function(req, res){
	if(req.isAuthenticated()){
		return res.redirect('/');
	}
	return res.render('signup', {
		title:"Sign up page"
	});
};

module.exports.signin = function(req, res){
	if(req.isAuthenticated()){
		return res.redirect('/');
	}
	return res.render('login', {
		title:"Sign up page"
	});
};

module.exports.create = async function(req, res){
	if(req.body.password != req.body.confirm_password){
		console.log("Password unmatched");
		return res.redirect("back");
	}

	try {
		const user = await User.findOne({email:req.body.email});
		if(!user){
			try {
				User.create(req.body);
				return res.redirect('/users/signin');
			} catch (error) {
				console.log("Error in creating a user :: User controller error", error);
				return;
			}
		}else{
			alert("User already exist");
			return res.redirect('back');
		}
	} catch (error) {
		console.log("Error in finding the user::User controller error", error);
		return;
	}
}

module.exports.createSession = function(req, res){
	return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
	req.logout(function(err){
		if(err){
			return next(err);
		}

		return res.redirect('/users/signin');
	});

}