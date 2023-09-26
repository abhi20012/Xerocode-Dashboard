const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/xero_code');

const db = mongoose.connection;

db.on('error', console.log.bind(console, "Error connecting to database"));

db.once('open', function(){
	console.log("Connected to database:: MongoDB");
})

module.exports = db;