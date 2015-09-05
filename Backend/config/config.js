'use strict';

module.exports = {

	appTitle: 'Alliés',

	apiRoot: 'api/v1',

	expressBase: {

		port: process.env.PORT || 9001,

		dynamicRouter: {
			useAutorizations: true,
			apiRoot: 'api/v1'
		},

		mailer: {
			url: 'api/v1/mailer',
			addresses: {
				'info': 'info@acommealliees.ca'
			}
		}
	},

	mongoose: {

		URI: 'mongodb://localhost/allies'

	},

	expressUserAuth: {

		resetPassword: {
			mailOptions: {
				from: 'Gris Québec ✔ <nepasrepondre@grisquebec.org>',
				subject: 'Réinitialisation de votre mot de passe'
			}
		},

		confirmEmail: {
			mailOptions: {
				from: 'Gris Québec ✔ <nepasrepondre@grisquebec.org>',
				subject: 'Confirmation de votre courriel'
			}
		},

		signup: {
			sendConfirmationEmail: true,
		},

		userApi: {
			//hideUserIds: ['55eb0075b2996d900ef8879a'],
			userCreationRoles: ['admin'],
			permissions: {
				admin: 'all',
				user: ['READ-OWN', 'UPDATE-OWN']
			},
		},

		token: {

			options: {
				expiresInMinutes: 1440
			},
			secret: '7279BEE6EBCC80400E2CED8D12D0591D34EA5C5F3B3D557A1773F1680F217780',
		},
		apiRoot: 'api/v1',
		unprotectedRoutes: ['api/v1/images/film/*']
	},

	mailer: {
		host: '127.0.0.1',
		port: 1025,
		ignoreTLS: true
	}
};