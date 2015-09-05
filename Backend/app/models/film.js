'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	ExpressBase = require('express-base'),
	Schema = mongoose.Schema,
	_ = require('lodash-node');

var FilmSchema = ExpressBase.getBaseSchema().extend({
	name: {
		type: String
	},
	synopsis: {
		type: String
	},
	realisateur: {
		type: String
	},
	niveau: {
		type: mongoose.Schema.ObjectId,
		ref: 'niveau'
	},
	annee: {
		type: Number
	},
	dureeMins: {
		type: Number
	},
	img: {
		type: String
	}
});

FilmSchema.statics.can = function(operation, user) {
	if (_.contains(['READ'], operation)) {
		return true
	} else {
		return _.intersection(user.roles, ['admin']).length > 0;
	}
}

module.exports = mongoose.model('film', FilmSchema);