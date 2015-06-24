'use strict';

/**
 * Module dependencies.
 */
var rek = require('rekuire'),
	ressourceManager = rek('ressource-manager')('v1'),
	errorHandler = rek('errors'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	jwt = require('jsonwebtoken'),
	_ = require('lodash'),
	needle = require('needle');

function sendToken(req, res, user) {

	user.password = undefined;
	user.salt = undefined;

	var expiresInMinutes = req.app.config.jwt.expiresInMinutes;
	var token = {
		id: jwt.sign(user, req.app.config.jwt.secret, {
			expiresInMinutes: expiresInMinutes
		}),
		expiration: new Date().getTime() + expiresInMinutes * 60000
	};

	/*var logData = {
		client: req.client.subDomain,
		utilisateur: {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			roles: user.roles,
			username: user.username
		}
	};

	needle.post(req.app.config.logger.url + 'connections', logData);*/

	res.json({
		user: user,
		token: token
	});
}

function authenticate(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			sendToken(req, res, user);
		}
	})(req, res, next);
}

function authenticateWithoutPassword(req, res, next) {
	var User = req.schema;

	User.findOne({
		username: req.body.username
	}, function(err, user) {
		if (err) {
			console.log(err)
			return res.sendStatus(500);
		}
		if (!user) {
			return res.status(400).send({
				message: 'Utilisateur inconnu'
			});

		}

		sendToken(req, res, user);
	});
}

function getPassport(User) {
	passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			console.log('no password', password)
			User.findOne({
				username: username
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Utilisateur inconnu ou mauvais mot de passe'
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Utilisateur inconnu ou mauvais mot de passe'
					});
				}
				return done(null, user);
			});
		}
	));
}

exports.signin = function(req, res, next) {
	ressourceManager.injectSchema(req, res, function() {
		if (_.isUndefined(req.body.password) || req.body.password === '') {
			authenticateWithoutPassword(req, res, next);
		} else {
			getPassport(req.schema);
			authenticate(req, res, next);
		}

	}, 'user');
};

exports.signout = function(req, res) {

	// TODO: DÉTRUIRE PASSPORT ET LE JWT TOKEN
	res.sendStatus(200);
};