var morgan = require('morgan');
var bodyParser = require('body-parser');
var utils = require('./utils.js');

var CLIENT_SECRET = process.env.CLIENT_SECRET || 'kOz_1h4y3KBLguvKsMweGHes_AppueMCuIprGoNHj0l1-f47KLLyot-OLhPnpqUA';
var CLIENT_ID = process.env.CLIENT_ID || '909iKBxjdoJbblSUwtwFKFwfkqZss09d';

module.exports = function(app, express){

	var jwtCheck = jwt({
  	secret: new Buffer( CLIENT_SECRET, 'base64'),
  	audience: CLIENT_ID
	});

	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + './../../client'));

	var plantsRouter = express.Router();
	var usersRouter = express.Router();

	app.use('/api/plants', plantsRouter);
	app.use('/api/users', usersRouter);

	require('./../routes/plants/plantsRoutes.js')(plantsRouter);
	require('./../routes/users/usersRoutes.js')(usersRouter);


};