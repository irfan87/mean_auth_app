const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// calling database module from the config folder
mongoose.connect(config.database, {useMongoClient: true});

// test either the database is working or not
mongoose.connection.on('connected', () => {
	console.log('connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
	console.log('database error' + err); 
});

// initialize app variable
const app = express();

const user = require('./routes/users');

// create port for express
const port = 3000;

// enable cors module
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body-parser middleware
app.use(bodyParser.json());

// add passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', user);

// index route
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

// start server
app.listen(port, () => {
	console.log('CORS-enabled web server listening on port ' + port);
});