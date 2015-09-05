'use strict';

var config = require('./config/config'),
	chalk = require('chalk'),
	ExpressBase = require('express-base'),
	UserAuth = require('express-user-auth'),
	mongoose = require('mongoose'),
	nodemailer = require('nodemailer');

ExpressBase.init(config.expressBase, function(app) {

	mongoose.connect(config.mongoose.URI);

	var mailer = nodemailer.createTransport(config.mailer);

	ExpressBase.setMailerService(mailer);

	UserAuth.init(app, require('./app/models/user'), config.expressUserAuth, mailer);

	console.log(chalk.green.bgBlue.bold(config.appTitle + ' serveur écoute maintenant sur le port ' + config.expressBase.port));
});