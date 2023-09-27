const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GitHubStrategy({
    clientID: "b39861fd02e7f8f0826f",
    clientSecret: "68c76216588d1c67f13e8e4f35ccde3e9e803d16",
    callbackURL: "http://localhost:8000/users/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
	const user = await User.findOne({ email: profile.emails[0].value});

    if (user) {
      return done(null, user);
    } else {
		const name = profile.displayName.split(' ');
        User.create({
            firstName: name[0],
			lastName: name[1],
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')
        });

        return done(null, user, { message: 'Account Created!' });
    }
  }
));

module.exports = passport;
