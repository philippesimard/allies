'use strict';

var config = require('./config/config'),
	chalk = require('chalk'),
	express = require('express'),
	http = require('http'),
	compress = require('compression'),
	helmet = require('helmet');

// Initialize express app
var app = express()
app.set('server', http.createServer(app));

// Use helmet to secure Express headers
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');

// Init environnement loader
require('./config/environnement')(app);

// Init Api
require('./api')(app);

app.set('showStackError', true);

// Start the app by listening on <port>
app.get('server').listen(config.port);

// Logging initialization
console.log(chalk.green.bgBlue.bold(config.app.title + ' serveur écoute maintenant sur le port ' + config.port));