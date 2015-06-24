'use strict';

var rek = require('rekuire'),
	ressourceManager = rek('ressource-manager')('v1'),
	ressourceAuthorization = rek('ressource-authorization.v1'),
	docController = rek('documents-controller.v1')('v1'),
	multiparty = require('connect-multiparty'),
	multipartyMiddleware = multiparty();

module.exports = function(app) {

	app.route('/api/v1/document')
		.post(docController.injectSchema, ressourceAuthorization, multipartyMiddleware, docController.create),
		
	app.route('/api/v1/document/:documentId')
		.delete(ressourceAuthorization, docController.destroy);

	app.route('/api/v1/download/:documentId')
		.get(ressourceAuthorization, docController.download);	

	app.param('documentId', docController.injectRessource);
};