'use strict';

module.exports = {
	app: {
		title: 'Web-service Alliés',
		description: 'voir title :)'
	},
	port: process.env.PORT || 3030,
	jwt: {
		expiresInMinutes: 1440,
		secret: '7279BEE6EBCC80400E2CED8D12D0591D34EA5C5F3B3D557A1773F1680F217780',
		unprotected: ['/api/v1/auth/signin']
	},
	files: {
		basePath: './data/files'
	},
	mongoose: {
		moongoDbUrl: 'mongodb://localhost/allies',
		sessionSecret: 'ECEEA8FE8AD6DBCB586511DB1FDD90EB8478D5323890A7DD7A8170CA71958666',
		sessionCollection: 'sessions'
	}
};