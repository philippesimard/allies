'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	_ = require('lodash');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstname: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Entrez votre prénom']
	},
	name: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Entrez votre nom']
	},
	date: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Entrez votre date de naissance']
	},
	username: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Entrez un pseudo valide']
	
	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},

	salt: {
		type: String
	},
	provider: {
		type: String,
		default: 'local',
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['admin']
	},
	alterations: [{
		user: {
			type: Schema.ObjectId,
			ref: 'User'
		},
		date: {
			type: Date,
			default: Date.now
		}
	}],
	created: {
		date: {
			type: Date,
			default: Date.now
		},
		user: {
			type: Schema.ObjectId,
			ref: 'User'
		}
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

UserSchema.statics.canCreate = function(user) {
	return true; //_.intersection(user.roles, ['admin']).length > 0;
}

UserSchema.statics.canRead = function(user) {
	return _.intersection(user.roles, ['admin']).length > 0;
}

UserSchema.statics.canModify = function(user) {
	return _.intersection(user.roles, ['admin']).length > 0;
}

UserSchema.statics.canDelete = function(user) {
	return _.intersection(user.roles, ['admin']).length > 0;
}

module.exports = function(connection) {
	module.exports = connection.model('user-v1', UserSchema);
};