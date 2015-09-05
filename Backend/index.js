'use strict';

var config = require('./config/config'),
	chalk = require('chalk'),
	express = require('express'),
	expressBase = require('express-base'),
	UserAuth = require('express-user-auth'),
	mongoose = require('mongoose'),
	path = require('path'),
	nodemailer = require('nodemailer');

expressBase.init(config.expressBase, function(app) {

	mongoose.connect(config.mongoose.URI);

	var mailer = nodemailer.createTransport(config.mailer);

	UserAuth.init(app, require('./app/models/user'), config.expressUserAuth, mailer);

	expressBase.setMailerService(mailer);

	expressBase.getGlobbedFiles('./app/models/*.js').forEach(function(routePath) {
		require(path.resolve(routePath));
	});

	expressBase.initDynamicRouter(mongoose.connection, config.expressBase.dynamicRouter);

	app.use('/api/v1/images', express.static('./app/images'));

	console.log(chalk.green.bgBlue.bold(config.appTitle + ' serveur écoute maintenant sur le port ' + config.expressBase.port));
});