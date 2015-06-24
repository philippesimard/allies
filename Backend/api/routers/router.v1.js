'use strict';
var rek = require('rekuire'),
	ressourceManager = rek('ressource-manager')('v1'),
	ressourceAuthorization = rek('ressource-authorization.v1'),
	authentification = rek('authentification.v1');

module.exports = function(app) {

	app.route('/api/v1/auth/signin')
		.post(authentification.signin);

	app.route('/api/v1/auth/signout')
		.post(authentification.signout);

	app.route('/api/v1/:ressourceName')
		.all(ressourceAuthorization)
		.get(ressourceManager.find)
		.post(ressourceManager.create);

	app.route('/api/v1/:ressourceName/:ressourceId')
		.all(ressourceAuthorization)
		.get(ressourceManager.findOne)
		.put(ressourceManager.update)
		.delete(ressourceManager.destroy);

	app.param('ressourceName', ressourceManager.injectSchema);
	app.param('ressourceId', ressourceManager.injectRessource);
}