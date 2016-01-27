var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('ohhaygurlhowyoudointoday69boobooyouusinggreenius77ohhaymetoo2'),
  audience: '909iKBxjdoJbblSUwtwFKFwfkqZss09d'
});
var middleware = require('./config/middleware.js');

middleware(app, express);

app.listen(port);
console.log('listening on ' + port);
