'use strict';

module.exports = {

	appTitle: 'Alliés',

	expressBase: {

		port: process.env.PORT || 9001,

		dynamicRouter: {
			useAutorizations: true,
			apiRoot: 'api/v1',
			registerAlterations: true
		}
	},

	mongoose: {

		URI: 'mongodb://localhost/allies'

	},

	expressUserAuth: {

		resetPassword: {
			mailOptions: {
				from: 'Steve Boisvert ✔ <leseulsteve@gmail.com>',
				subject: 'Réinitialisation de votre mot de passe'
			}
		},
		
		confirmEmail: {
			mailOptions: {
				from: 'Steve Boisvert ✔ <leseulsteve@gmail.com>',
				subject: 'Confirmation de votre courriel'
			}
		},

		signup: {
			sendConfirmationEmail: false
		},

		findUser: {
			hideUserIds: ['55b8ebd7579eabc807ed4866']
		},

		token: {

			options: {
				expiresInMinutes: 1440
			},
			secret: '7279BEE6EBCC80400E2CED8D12D0591D34EA5C5F3B3D557A1773F1680F217780',
		},
		apiRoot: 'api/v1'
			//unprotectedRoutes: []
	},

	mailer: {
		host: '127.0.0.1',
    port: 1025
	}
};