'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	UserAuth = require('express-user-auth'),
	Schema = mongoose.Schema,
	_ = require('lodash-node');

var UserSchema = UserAuth.getSecureUserSchema().extend({
	lastname: {
		type: String,
		trim: true,
		required: true
	},
	firstname: {
		type: String,
		trim: true,
		required: true
	},
	dateNaissance: {
		type: Date,
		required: true
	},
	pseudo: {
		type: String,
		trim: true,
		required: true
	}
});

UserAuth.getSecureUserSchema().pre('save', function(next) {

	if (this.isModified('email')) {
		this.username = this.email;
	}
	next();
});

module.exports = mongoose.model('User', UserSchema);