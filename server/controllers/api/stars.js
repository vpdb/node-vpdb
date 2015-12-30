/*
 * VPDB - Visual Pinball Database
 * Copyright (C) 2015 freezy <freezy@xbmc.org>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

"use strict";

var _ = require('lodash');

var Game = require('mongoose').model('Game');
var Release = require('mongoose').model('Release');
var User = require('mongoose').model('User');
var Star = require('mongoose').model('Star');
var LogEvent = require('mongoose').model('LogEvent');
var api = require('./api');

var error = require('../../modules/error')('api', 'star');
var pusher = require('../../modules/pusher');

// releases
exports.starRelease = function(req, res) {
	star(req, res, 'release', find(Release, 'release', '_game'));
};
exports.unstarRelease = function(req, res) {
	unstar(req, res, 'release', find(Release, 'release', '_game'));
};
exports.getForRelease = function(req, res) {
	view(req, res, find(Release, 'release'), 'name');
};

// games
exports.starGame = function(req, res) {
	star(req, res, 'game', find(Game, 'game'));
};
exports.unstarGame = function(req, res) {
	unstar(req, res, 'game', find(Game, 'game'));
};
exports.getForGame = function(req, res) {
	view(req, res, find(Game, 'game'), 'title');
};

// users
exports.starUser = function(req, res) {
	star(req, res, 'user', find(User, 'user'));
};
exports.unstarUser = function(req, res) {
	unstar(req, res, 'user', find(User, 'user'));
};
exports.getForUser = function(req, res) {
	view(req, res, find(User, 'user'), 'email');
};


/**
 * Generic function for viewing a star.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} find Function that returns entity and star.
 * @param {string} titleAttr Attribute of the entity that contains a title
 */
function view(req, res, find, titleAttr) {

	var assert = api.assert(error, 'view', req.user.email, res);
	find(req, res, assert, function(entity, star) {

		if (star) {
			api.success(res, _.pick(star, ['created_at']));
		} else {
			api.fail(res, error('No star for <%s> for "%s" found.', req.user.email, entity[titleAttr]), 404);
		}
	});
}

/**
 * Generic function for starring something.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {string} type Reference name
 * @param {function} find Function that returns entity and star.
 */
function star(req, res, type, find) {

	var assert = api.assert(error, 'create', req.user.email, res);
	find(req, res, assert, function(entity, duplicateStar) {
		if (duplicateStar) {
			return api.fail(res, error('Already starred. Cannot star twice, you need to unstar first.').warn('create'), 400);
		}
		var obj = {
			_from: req.user._id,
			_ref: {},
			type: type,
			created_at: new Date()
		};
		obj._ref[type] = entity._id;
		var star = new Star(obj);

		star.save(assert(function() {

			entity.incrementCounter('stars', assert(function() {

				api.success(res, { created_at: obj.created_at, total_stars: entity.counter.stars + 1 }, 201);
				LogEvent.log(req, 'star_' + type, true, logPayload(entity, type), logRefs(star, entity, type));
				pusher.star(type, entity, req.user);

			}, 'Error incrementing counter.'));
		}, 'Error starring release.'));
	});
}

/**
 * Generic function for unstarring something.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {string} type Reference name
 * @param {function} find Function that returns entity and star.
 */
function unstar(req, res, type, find) {

	var assert = api.assert(error, 'create', req.user.email, res);
	find(req, res, assert, function(entity, star) {
		if (!star) {
			return api.fail(res, error('Not starred. You need to star something before you can unstar it.').warn('create'), 400);
		}
		star.remove(assert(function() {
			entity.incrementCounter('stars', assert(function() {

				api.success(res, null, 204);
				LogEvent.log(req, 'unstar_' + type, true, logPayload(entity, type), logRefs(star, entity, type));
				pusher.unstar(type, entity, req.user);

			}, 'Error incrementing counter.'), true);
		}, 'Error unstarring.'));
	});
}

/**
 * Returns entity and star for a given type.
 *
 * If entity is not found, a 404 is returned to the client and the callback isn't called.
 *
 * @param {Schema} Model model that can be starred
 * @param {string} type Reference name
 * @param {string} [populate] If set, populates additional fields.
 * @returns {Function} function that takes req, res, assert and a callback which is launched with entity and star as parameter
 */
function find(Model, type, populate) {
	return function(req, res, assert, callback) {
		var query = Model.findOne({ id: req.params.id });
		if (populate) {
			query.populate(populate);
		}
		query.exec(assert(function(entity) {
			if (!entity) {
				return api.fail(res, error('No such %s with ID "%s"', type, req.params.id), 404);
			}
			var q = { _from: req.user._id, type: type };
			q['_ref.' + type] = entity._id;
			Star.findOne(q, assert(function(star) {
				callback(entity, star);
			}, 'Error searching for current star'));
		}, 'Error finding ' + type + ' in order to get star from <%s>.'));
	};
}

function logPayload(entity, type) {
	var payload = { };
	payload[type] = entity.toReduced();
	return payload;
}

function logRefs(star, entity, type) {
	var ref = {};
	ref[type] = star._ref[type]._id || star._ref[type];
	if (type === 'release') {
		ref.game = entity._game._id;
	}
	return ref;
}