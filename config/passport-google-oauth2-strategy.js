const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    // Copy and Paste clientID and clientSecret from credentials
        clientID: "174604394267-to4anvp0l4a1mc5at9pj3ifi7t9q2suo.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    async function(accessToken, refreshToken, profile, done){
        // find the user
        const user = await User.findOne({email: profile.emails[0].value});
          
            if(user){
                // if found set this user as req.user
                return done(null, user);
            }else{

                const name = profile.displayName.split(' ');
                User.create({
                    // if not found, create the user and set it as req.user
                    firstName: name[0],
                    lastName: name[1],
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });

                return done(null, user, {message:"Account Created!"});
            }
    }
));


module.exports = passport;