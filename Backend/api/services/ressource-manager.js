'use strict';

var rek = require('rekuire'),
	errorHandler = rek('errors'),
	_ = require('lodash');

function sanitize(req, ressources) {

	function sanitize(user) {
		user.password = undefined;
		user.salt = undefined;
	}

	if (req.schemaName === 'user') {

		if (_.isArray(ressources)) {
			_.forEach(ressources, function(user) {
				sanitize(user);
			});
		} else {
			sanitize(ressources);
		}
	}

	return ressources;
}

function isModifiedSince(ressource, date) {
	var lastModification = new Date(ressource.created.date);
	if (ressource.alterations.length > 0) {
		lastModification = new Date(ressource.alterations[ressource.alterations.length - 1].date);
	}
	return lastModification > new Date(date);
}

var RessourceManager = function(version) {

	return {

		create: function(req, res) {

			var ressource = new req.schema(req.body);

			ressource.created = {
				//user: req.user._id,
				//date: new Date().toGMTString()
			};

			ressource.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(sanitize(req, ressource));
				}
			});
		},

		findOne: function(req, res) {

			var ressource = sanitize(req, req.ressource);

			var ifModifiedSince = req.headers['if-modified-since'];

			if (ifModifiedSince && !isModifiedSince(ressource, ifModifiedSince)) {
				return res.status(304).send();
			}

			res.jsonp(ressource);
		},

		find: function(req, res) {

			req.schema.find({}, function(err, ressources) {

				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});

				} else {
					sanitize(req, ressources);

					var ifModifiedSince = req.headers['if-modified-since'];

					if (ifModifiedSince) {
						ressources = _.filter(ressources, function(ressource) {
							return isModifiedSince(ressource, ifModifiedSince);
						});

						if (ressources.length === 0) {
							return res.status(304).send();
						}
					}

					if (req.query.pluck) {
						res.jsonp(_.pluck(ressources, req.query.pluck));
					} else {
						res.jsonp(ressources);
					}
				}
			});
		},

		update: function(req, res) {

			var ressource = _.extend(req.ressource, req.body);

			ressource.alterations.push({
				user: req.user._id,
				date: new Date().toGMTString()
			});

			ressource.save(function(err) {

				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});

				} else {
					res.jsonp(sanitize(req, ressource));
				}
			});
		},

		destroy: function(req, res) {

			var ressource = req.ressource;

			ressource.remove(function(err) {

				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});

				} else {

					res.status(200).send();
				}
			});
		},

		injectSchema: function(req, res, next, schemaName) {

			req.schema = req.app.db.models[schemaName + '-' + version];
			req.schemaName = schemaName;

			if (_.isUndefined(req.schema)) {
				try {
					rek(schemaName + '.' + version)(req.app.db);
				} catch (e) {
					console.log(schemaName + '.' + version, e)
					var message = 'La ressource ' + schemaName + ' n\'existe pas!';
					errorHandler.log(req, message, e);
					return res.status(404).send({
						message: message
					});
				}
				req.schema = req.app.db.model(schemaName + '-' + version);
			}
			next();
		},

		injectRessource: function(req, res, next, id) {

			req.schema.findById(id, function(err, ressource) {
				if (err) return next(err);
				if (!ressource) {
					return res.status(404).send({
						message: 'La ressource ' + req.schemaName + ' ' + id + ' n\'existe pas!'
					});
				}
				req.ressource = ressource;
				next();
			});
		}
	};
}

module.exports = RessourceManager;