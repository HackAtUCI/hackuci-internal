global.rootDir = __dirname;
global.config = require(global.rootDir + '/config.js');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var registration = require(global.rootDir + '/js/registration.js');

var port = process.env.port || 3000;

var auth = require(global.rootDir + '/js/auth.js');
app.use(auth);

app.use(bodyParser.json());

app.use('/register', registration);

app.use(express.static(global.rootDir + '/public'));


app.listen(3000);
console.log('Server listening on localhost:' + port);
