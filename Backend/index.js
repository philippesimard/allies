'use strict';

var config = require('./config/config'),
  chalk = require('chalk'),
  ExpressBase = require('express-base'),
  UserAuth = require('express-user-auth'),
  mongoose = require('mongoose'),
  nodemailer = require('nodemailer');

ExpressBase.init(config.port, function(app) {

  console.log(chalk.green.bgBlue.bold(config.appTitle + ' serveur écoute maintenant sur le port ' + config.port));

  mongoose.connect(config.mongoose.URI);

  UserAuth.init(app, require('./app/models/user'), nodemailer.createTransport(config.mailer), config.expressUserAuth);

});