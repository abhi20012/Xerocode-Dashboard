const express = require('express');
const app = express();
const port = 8000;

const cookieParser = require('cookie-parser');//importing cookie-parser

const expressLayouts = require('express-ejs-layouts');//importing express layouts 
//using layouts for views to structure the page 
app.use(expressLayouts);

const path = require('path');

const db = require('./config/mongoose');
const session = require('express-session');//importing express session for the signed in user
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportGithub = require('./config/passport-github-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.urlencoded({extended:true}));
//using cookie parser 
app.use(cookieParser());


//using static files
//makes the uploads path available to the browser
//extract style and pages from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/assets'));

app.use(session({
	name:'Xerocode',
	secret:"Demokey", //will be changed to more secure key while deployement
	saveUninitialized:false, 
	resave:false,
	cookie:{
		maxAge:(1000*60*100)
	},
	store: MongoStore.create({
		mongoUrl: 'mongodb://0.0.0.0/xero_code',
		mongooseConnection: db,
		autoRemoved:'disabled'
	}, 
		function(err){
			console.log(err || "connect-mongo setup ok")
		}
	)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//setting up flash for notification
app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'))

app.listen(port, function(err){
	if(err){
		console.log("Error in firing up the sevrer", err);
	}

	console.log(`Server is up and running at ${port}`);
})