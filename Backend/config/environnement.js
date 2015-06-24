'use strict';

var rek = require('rekuire'),
  mongoose = require('mongoose'),
  chalk = require('chalk'),
  _ = require('lodash');

function setEnvironnementConfig(req) {
  var environnementName = (req.get('host').split('.')[0] === 'dev') ? 'development' : 'production',
    environnementConfig = require('./env/' + environnementName);

  environnementConfig.environnementName = environnementName;

  _.assign(req.app.config, environnementConfig);
}

function setDbForRequest(req) {

  if (!req.app.db) {

    var dbUrl = req.app.config.mongoose.moongoDbUrl;

    if (req.app.config.environnementName === 'development') {
      dbUrl += '-dev';
    }

    req.app.db = mongoose.connect(dbUrl, function(err) {
      if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
      }
    });
  }
}

function prepDbs(dbUrl) {

  function initDb(url, done) {

    var db = mongoose.connect(url);

    rek('user.v1')(db);

    var User = db.model('user-v1');

    User.find({}, function(err, users) {
      if (users.length === 0) {
        var iamUser = new User({
          firstName: 'super',
          lastName: 'admin',
          email: 'info@iam-apps.com',
          username: 'iam',
          password: '12345678',
          roles: ['admin']
        });
        iamUser.save(function(err) {
          mongoose.disconnect();
          done();
        });
      } else {
        mongoose.disconnect();
        done();
      }
    });
  }

  initDb(dbUrl, function() {
    initDb(dbUrl + '-dev', function() {});
  });
}

module.exports = function(app) {

  app.config = require('./config');

  prepDbs(app.config.mongoose.moongoDbUrl);

  app.use('/*', function(req, res, next) {
    setEnvironnementConfig(req)
    setDbForRequest(req);
    next();
  });
}