'use strict';

var bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	passport = require('passport'),
	morgan = require('morgan'),
	expressJwt = require('express-jwt'),
	config = require('../config/config'),
	path = require('path');

var Api = function(app) {

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		limit: '50mb',
		extended: true
	}));

	app.use(bodyParser.json({
		limit: '50mb'
	}));

	app.use(methodOverride());

	app.use(morgan('dev'));

	// Enable CORS
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, If-Modified-Since');
		next();
	});

	app.options('*', function(req, res) {
		res.sendStatus(200);
	});

	// Set Passport and jwt tokens
	app.use(passport.initialize());

	app.use('/api/*',
		expressJwt({
			secret: app.config.jwt.secret
		}).unless({
			path: app.config.jwt.unprotected
		}));

	app.use(function(err, req, res, next) {
		if (!err) return next();
		if (err.name === 'UnauthorizedError') {
			res.status(401).send({
				message: 'invalid token...'
			});
		}
	});

	// Set routers overrides
	config.getGlobbedFiles('./api/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// Set routers
	config.getGlobbedFiles('./api/routers/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).send();
	});

	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		res.status(500).send();
	});
}

module.exports = Api;