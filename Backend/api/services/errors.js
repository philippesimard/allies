'use strict';

var chalk = require('chalk'),
	needle = require('needle');

/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function(err) {
	var output;

	try {
		var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));
		output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

	} catch (ex) {
		output = 'Unique field already exists';
	}

	return output;
};


exports.log = function(req, message, stack) {
	/*var logData = {
		client: req.client.subDomain,
		utilisateur: {
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			email: req.user.email,
			roles: req.user.roles,
			username: req.user.username
		},
		message: message,
		stack: stack
	};

	needle.post(req.app.config.logger.url + 'errors', logData);*/
}

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function(err) {
	console.log(chalk.black.bgWhite(err));
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = getUniqueErrorMessage(err);
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};