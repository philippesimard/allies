'use strict';

var rek = require('rekuire'),
	errorHandler = rek('errors'),
	_ = require('lodash'),
	fs = require('fs');

var DocumentController = function(version) {
	return {

		create: function(req, res) {

			var doc = new req.schema(req.body),
				savePath = req.app.config.files.basePath + '/' + req.body.subType + '/',
				tempPath = req.files.file.path;

			doc.user = req.user._id;
			doc.name = req.body.fileName;
			doc.path = savePath + doc.name;

			var currentVersion = 0,
				nameWithoutExtention = getNameWithoutExtention(),
				extention = getExtention();
			setDocNameAndPath();

			function setDocNameAndPath() {
				if (fs.existsSync(doc.path)) {
					currentVersion++;
					doc.name = nameWithoutExtention + '-' + currentVersion + '.' + extention;
					doc.path = savePath + doc.name;
					setDocNameAndPath();
				}
			}

			function getNameWithoutExtention() {
				var splittedName = doc.name.split('.');
				splittedName.pop();
				return splittedName.join();
			}

			function getExtention() {
				return doc.name.split('.').pop();
			}

			doc.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {

					fs.readFile(tempPath, function(err, data) {

						// check if folder exist
						if (!fs.existsSync(savePath)) {
							fs.mkdirSync(savePath);
						}

						fs.writeFile(doc.path, data, function(err) {
							if (err) {
								return res.status(400).send({
									message: errorHandler.getErrorMessage(err)
								});
							} else {
								res.jsonp(doc);
							}
						});
					});
				}
			});
		},

		download: function(req, res) {
			if (!fs.existsSync(req.ressource.path)) {
				return res.status(404).send({
					message: 'La fichier ' + req.ressource.name + ' n\'existe pas!'
				});
			}
			res.download(req.ressource.path);
		},

		destroy: function(req, res) {
			var ressource = req.ressource;
			ressource.remove(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					fs.unlinkSync(ressource.path);
					res.jsonp(ressource);
				}
			});
		},

		injectSchema: function(req, res, next) {
			rek('document.v1')(req.db);
			req.schemaName = 'document';
			req.schema = req.db.model('document-v1');
			next();
		},

		injectRessource: function(req, res, next, id) {
			rek('document.v1')(req.db);
			req.schemaName = 'document';
			req.schema = req.db.model('document-v1');
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

module.exports = DocumentController;