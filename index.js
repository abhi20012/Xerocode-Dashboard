const express = require('express');
const app = express();
const port = 8000;

const cookieParser = require('cookie-parser');//importing cookie-parser

const expressLayouts = require('express-ejs-layouts');//importing express layouts 
//using layouts for views to structure the page 
app.use(expressLayouts);

const path = require('path');

const db = require('./config/mongoose');



app.use(express.urlencoded());
//using cookie parser 
app.use(cookieParser());


//using static files
//makes the uploads path available to the browser
//extract style and pages from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/assets'));



app.use('/', require('./routes'))

app.listen(port, function(err){
	if(err){
		console.log("Error in firing up the sevrer", err);
	}

	console.log(`Server is up and running at ${port}`);
})