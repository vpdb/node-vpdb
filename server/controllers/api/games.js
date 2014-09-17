/*
 * VPDB - Visual Pinball Database
 * Copyright (C) 2014 freezy <freezy@xbmc.org>
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
var util = require('util');
var logger = require('winston');

var Game = require('mongoose').model('Game');
var api = require('./api');

var error = require('../../modules/error')('api', 'game');


/**
 * Returns either 200 or 404. Useful for checking if a given game ID already exists.
 * @param req Request object
 * @param res Response object
 */
exports.head = function(req, res) {

	Game.findOne({ id: req.params.id }, function(err, game) {
		/* istanbul ignore if  */
		if (err) {
			return api.fail(res, error(err, 'Error finding game "%s"', req.params.id).log('head'), 500);
		}
		res.set('Content-Length', 0);
		return res.status(game ? 200 : 404).end();
	});
};


/**
 * Creates a new game.
 * @param req Request object
 * @param res Response object
 */
exports.create = function(req, res) {

	Game.getInstance(_.extend(req.body, {
		_created_by: req.user._id,
		created_at: new Date()
	}), function(err, newGame) {
		if (err) {
			return api.fail(res, error(err, 'Error creating game instance').log('create'), 500);
		}
		var ok = api.ok(error, 'create', newGame.id, res);
		var okk = api.ok(error, 'create', newGame.id, res, function(done) {
			newGame.remove(done);
		});
		logger.info('[api|game:create] %s', util.inspect(req.body));
		newGame.validate(function(err) {
			if (err) {
				return api.fail(res, error('Validations failed: %j', err.errors).errors(err.errors).warn('create'), 422);
			}
			logger.info('[api|game:create] Validations passed.');
			newGame.save(ok(function(game) {
				logger.info('[api|game:create] Game "%s" created.', game.title);

				// set media to active
				game.activateFiles(okk(function(game) {
					logger.info('[api|game:create] All referenced files activated, returning object to client.');
					return api.success(res, game.toDetailed(), 201);

				}, 'Error activating files for game "%s"'));
			}, 'Error saving game with id "%s"'));
		});
	});
};


/**
 * Deletes a game.
 * @param req
 * @param res
 */
exports.del = function(req, res) {

	var query = Game.findOne({ id: req.params.id })
		.populate({ path: '_media.backglass' })
		.populate({ path: '_media.logo' });

	query.exec(function(err, game) {
		/* istanbul ignore if  */
		if (err) {
			return api.fail(res, error(err, 'Error getting game "%s"', req.params.id).log('delete'), 500);
		}
		if (!game) {
			return api.fail(res, error('No such game with ID "%s".', req.params.id), 404);
		}

		// TODO check for linked releases and refuse if referenced

		// remove from db
		game.remove(function(err) {
			/* istanbul ignore if  */
			if (err) {
				return api.fail(res, error(err, 'Error deleting game "%s" (%s)', game.id, game.title).log('delete'), 500);
			}
			logger.info('[api|game:delete] Game "%s" (%s) successfully deleted.', game.title, game.id);
			api.success(res, null, 204);
		});
	});
};

/**
 * Lists all games.
 * @param req Request object
 * @param res Response object
 */
exports.list = function(req, res) {

	var query = Game.find()
		.populate({ path: '_media.backglass' })
		.populate({ path: '_media.logo' });

	// text search
	if (req.query.q) {

		if (req.query.q.trim().length < 2) {
			return api.fail(res, error('Query must contain at least two characters.'), 400);
		}

		// sanitize and build regex
		var titleQuery = req.query.q.trim().replace(/[^a-z0-9-\s]+/gi, '').replace(/\s+/g, '.*?');
		var titleRegex = new RegExp(titleQuery, 'i');
		var idQuery = req.query.q.trim().replace(/[^a-z0-9-]+/gi, ''); // TODO tune
		query.or([
			{ title: titleRegex },
			{ id: idQuery }
		]);
	}

	query.exec(function(err, games) {
		/* istanbul ignore if  */
		if (err) {
			return api.fail(res, error(err, 'Error listing games').log('list'), 500);
		}
		games = _.map(games, function(game) {
			return game.toSimple();
		});
		api.success(res, games);
	});
};


/**
 * Lists a game of a given game ID.
 * @param req Request object
 * @param res Response object
 */
exports.view = function(req, res) {

	var query = Game.findOne({ id: req.params.id })
		.populate({ path: '_media.backglass' })
		.populate({ path: '_media.logo' });

	query.exec(function(err, game) {
		/* istanbul ignore if  */
		if (err) {
			return api.fail(res, error(err, 'Error finding game "%s"', req.params.id).log('view'), 500);
		}
		if (!game) {
			return api.fail(res, error('No such game with ID "%s"', req.params.id), 404);
		}
		return api.success(res, game.toDetailed());
	});
};
