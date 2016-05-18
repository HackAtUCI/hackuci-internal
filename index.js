var express = require('express');
var app = express();

var port = process.env.port || 3000;



app.use(express.static(__dirname + '/public'));


app.listen(3000);
console.log('Server listening on localhost:' + port);
