'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash');


var CarSchema = new Schema({
	_id: {
		type: String,
		unique: 'Le numéro de voiture doit être unique'
	},
	description: {
		type: String
	},
	lastOdometre: {
		type: Number
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
	}
});

CarSchema.statics.canCreate = function(user) {
	return _.intersection(user.roles, ['admin']).length > 0;
}

CarSchema.statics.canRead = function(user) {
	return _.intersection(user.roles, ['admin']).length > 0;
}

CarSchema.statics.canModify = function(user) {
	return _.intersection(user.roles, ['admin']).length > 0;
}

CarSchema.statics.canDelete = function(user) {
	return _.intersection(user.roles, ['admin']).length > 0;
}

module.exports = function(connection) {
	module.exports = connection.model('car-v1', CarSchema);
};