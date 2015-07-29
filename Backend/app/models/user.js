'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	UserAuth = require('express-user-auth'),
	Schema = mongoose.Schema;

var UserScheman = UserAuth.getSecureUserSchema().extend({
	test: String
});

module.exports = mongoose.model('User', UserScheman);