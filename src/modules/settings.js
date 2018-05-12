/*
 * VPDB - Visual Pinball Database
 * Copyright (C) 2016 freezy <freezy@xbmc.org>
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

'use strict';

const _ = require('lodash');
const fs = require('fs');
const util = require('util');
const path_ = require('path');
const crypto = require('crypto');
const logger = require('winston');
const uglify = require('uglify-js');

const validations = require(path_.resolve(__dirname, '../config/settings-validate'));
let dryRun = false;

function Settings() {

	if (!process.env.APP_SETTINGS) {
		const e = new Error('Settings location not found. Please set the `APP_SETTINGS` environment variable to your configuration file and retry.');
		logger.error(e.stack);
		throw e;
	}
	let filePath = path_.isAbsolute(process.env.APP_SETTINGS) ? process.env.APP_SETTINGS : path_.resolve(process.cwd(), process.env.APP_SETTINGS);

	/* istanbul ignore next */
	if (!fs.existsSync(filePath)) {
		throw new Error('Cannot find settings at "' + filePath + '". Copy src/config/settings-dist.js to server/config/settings.js or point `APP_SETTINGS` environment variable to correct path (CWD = ' + process.cwd() + ').');
	}
	this.filePath = filePath;
	this.current = require(this.filePath.substr(0, this.filePath.length - 3));
}

/* istanbul ignore next */
/**
 * Checks that all settings are available and runs validation on each.
 *
 * @return true if passes, false otherwise.
 */
Settings.prototype.validate = function() {

	logger.info('[settings] Validating settings at %s', this.filePath);
	let settings = this.current;

	let validate = function(validation, setting, path) {
		let success = true;
		let validationError, p, i, j;
		let logError = function(p, error, setting) {
			setting = !_.isUndefined(error.setting) ? error.setting : setting;
			let s = _.isObject(setting) ? JSON.stringify(setting) : setting;
			if (_.isObject(error)) {
				logger.error('[settings] %s.%s [KO]: %s (%s).', p, error.path, error.message, s);
			} else {
				logger.error('[settings] %s [KO]: %s (%s).', p, error, s);
			}
		};
		for (let s in validation) {
			if (validation.hasOwnProperty(s)) {
				p = (path + '.' + s).substr(1);

				// validation function
				if (_.isFunction(validation[s])) {
					if (_.isUndefined(setting[s]) && setting.enabled !== false) {
						logger.error('[settings] %s [KO]: Setting is missing.', p);
						success = false;
					} else {
						validationError = validation[s](setting[s], setting, settings);
						if (!validationError) {
							logger.info('[settings] %s [OK]', p);
						} else {
							if (_.isArray(validationError)) {
								for (j = 0; j < validationError.length; j++) {
									logError(p, validationError[j], setting[s]);
								}
							} else {
								logError(p, validationError, setting[s]);
							}
							success = false;
						}
					}
				}

				// array
				else if (validation[s].__array) {
					if (!_.isArray(setting[s])) {
						logger.error('[settings] %s [KO]: Setting must be an array.', p);
						success = false;
					} else {
						for (i = 0; i < setting[s].length; i++) {
							if (!validate(validation[s], setting[s][i], path + '.' + s + '[' + i + ']')) {
								//logger.error('[settings] %s failed', path);
								success = false;
							}
						}
					}
				}

				// object
				else if (validation[s] && _.isObject(validation[s])) {

					if (_.isUndefined(setting[s])) {
						logger.error('[settings] %s [KO]: Setting block is missing.', p);
						success = false;

					} else if (!validate(validation[s], setting[s], path + '.' + s)) {
						//logger.error('[settings] %s failed', path);
						success = false;
					}
				}

			}
		}
		if (success && !path) {
			logger.info('[settings] Congrats, your settings look splendid!');
		}
		return success;
	};
	return validate(validations, settings, '');
};

/* istanbul ignore next */
Settings.prototype.migrate = function(callback) {

	let settingsCurrName = path_.basename(this.filePath);
	let settingsDistPath = path_.resolve(__dirname, '../config/settings-dist.js');
	// eslint-disable-next-line
	let nl = /\x0d\x0a/gi;
	let settingsDist = fs.readFileSync(settingsDistPath, { encoding: 'utf8' }).trim().replace(nl, '\n');
	let settingsCurr = fs.readFileSync(this.filePath, { encoding: 'utf8' }).trim().replace(nl, '\n');
	let result = { added: [], errors: [] };

	if (settingsCurr !== settingsDist) {

		logger.info('[settings] Checking for new settings.');

		// 1. retrieve added properties
		let oldTree = {};
		let newTree = {};
		eval(settingsCurr.replace(/module\.exports\s*=\s*\{/, 'oldTree = {')); // jshint ignore:line
		eval(settingsDist.replace(/module\.exports\s*=\s*\{/, 'newTree = {')); // jshint ignore:line
		let newProps = diff(oldTree, newTree);
		if (newProps.length === 0) {
			logger.info('[settings] No new settings found.');
			return callback(result);
		}
		logger.info('[settings] Found new settings: [' + newProps.join(', ') + ']');

		// 2. retrieve code blocks of added properties
		let nodesNew = analyze(uglify.minify(settingsDist, {
			compress: false,
			mangle: false,
			output: {
				ast: true,
				code: false
			}
		}).ast);

		// 3. inject code blocks into settings.js
		let settingsPatched = _.clone(settingsCurr);
		let settingsNew = _.pick(nodesNew, newProps);
		let settingsNewKeys = _.keys(settingsNew);
		let ast;
		for (let i = 0; i < settingsNewKeys.length; i++) {
			let path = settingsNewKeys[i]; // path in settings to be added
			let node = settingsNew[path];  // ast node corresponding to the setting to be added
			try {
				// analyze current settings, so we know where to inject
				ast = analyze(uglify.minify(settingsPatched, {
					compress: false,
					mangle: false,
					output: {
						ast: true,
						code: false
					}
				}).ast);
			} catch (err) {
				logger.error('[settings] Error parsing patched file: ' + err);
				result.errors.push({
					when: 'settings',
					message: err.message,
					obj: err
				});
				fs.writeFileSync('settings-err.js', settingsPatched);
				logger.error('[settings] File dumped to settings-err.js.');
				return callback(result);
			}

			// check if not already available
			if (!ast[path]) {
				logger.info('[settings] Patching %s with setting "%s"', settingsCurrName, path);

				let comment = node.start.comments_before.length > 0;
				let start = comment ? node.start.comments_before[0].pos : node.start.pos;
				let len = comment ? node.end.endpos - start : node.end.endpos - start;
				let codeBlock = settingsDist.substr(start, len);
				//				logger.info('start: %d, len: %d, hasComment: %s', start, len, comment);
				//				logger.info('\n===============\n%s\n===============\n', util.inspect(node, false, 10, true));
				//				logger.info('settingsDist:\n%s', settingsDist);

				// inject at the end of an element
				let parentPath;
				if (path.indexOf('.') > 0) {
					parentPath = path.substr(0, path.lastIndexOf('.'));
					settingsPatched = patch(settingsPatched, codeBlock, ast[parentPath].end.pos, parentPath);

				// inject the end of the file.
				} else {
					settingsPatched = patch(settingsPatched, codeBlock, settingsPatched.length - 2);
				}

				// add message to result
				let descr = node.start.comments_before[0] ? node.start.comments_before[0].value.trim() : null;
				let important = false;
				if (descr) {

					if (descr.match(/\*\s*@important/i)) {
						descr = descr.replace(/\s*\*\s*@important\s*/g, '');
						important = true;
					}
					descr = descr.replace(/\s*\*\s+\*\s*/g, '\n');
					descr = descr.replace(/\s*\*\s*/g, ' ').trim();

				}
				result.added.push({
					parent: parentPath ? parentPath : null,
					path: path,
					name: node.start.value,
					value: node.end.value,
					valuetype: node.end.type,
					description: descr,
					important: important
				});

			} else {
				logger.info('[settings] %s already contains "%s", skipping.', settingsCurrName, path);
			}
		}
		if (!dryRun) {
			fs.writeFileSync(this.filePath, settingsPatched);
			logger.info('[settings] Patched %s written.', settingsCurrName);
		} else {
			fs.writeFileSync('settings-patched.js', settingsPatched);
			logger.info('[settings] Updated settings-patched.js.');
		}
		callback(result);

	} else {
		logger.info('[settings] Settings are identical, moving on.');
		callback(result);
	}
};


/**
 * Takes the AST object and hacks it into sub-objects per property. Returns
 * a dictionary with path separated by "." as key, and sub-tree as value.
 *
 * Since this is a recursive function, only the first parameter must be
 * provided at first run.
 *
 * @param {object} tree Current subtree
 * @param {string} [path] Current path
 * @param [node] If property found, this is the subtree
 * @returns {Object}
 */
function analyze(tree, path, node) {
	let nodes = {};
	if (node) {
		nodes[path] = node;
	}
	let i;
	if (tree.right) {
		_.extend(nodes, analyze(tree.right, path));
	} else if (tree.properties) {
		for (i = 0; i < tree.properties.length; i++) {
			let nextPath = (path ? path + '.' : '') + tree.properties[i].key;
			_.extend(nodes, analyze(tree.properties[i].value, nextPath, tree.properties[i]));
		}
	} else if (tree.body) {
		if (_.isArray(tree.body)) {
			for (i = 0; i < tree.body.length; i++) {
				_.extend(nodes, analyze(tree.body[i], path));
			}
		} else {
			_.extend(nodes, analyze(tree.body, path));
		}
	}
	return nodes;
}


/**
 * Returns an array of path names (sepearted separated by ".") for all
 * attributes in newTree that are not in oldTree.
 *
 * @param oldTree Settings object before
 * @param newTree Settings object after
 * @param parent Parent path, only needed when called recursively.
 * @returns {Array}
 */
function diff(oldTree, newTree, parent) {
	parent = parent ? parent : '';
	let newProps = _.difference(_.keys(newTree), _.keys(oldTree));
	let comProps = _.intersection(_.keys(newTree), _.keys(oldTree));
	let newValues = _.map(newProps, function(key) {
		return parent ? parent + '.' + key : key;
	});
	for (let i = 0; i < comProps.length; i++) {
		let prop = oldTree[comProps[i]];
		if (_.isObject(prop)) {
			let p = parent ? parent + '.' + comProps[i] : comProps[i];
			newValues = newValues.concat(diff(oldTree[comProps[i]], newTree[comProps[i]], p));
		}
	}
	return newValues;
}

function patch(settingsPatched, codeBlock, pos, parentPath) {
//	console.log('PATCHING:\n--- code ---\n%s\n--- /code ---\nat pos %d below "%s"', codeBlock, pos, parentPath);
	let before = settingsPatched.substr(0, pos);
	let after = settingsPatched.substr(pos);
	let level = parentPath ? parentPath.split('.').length : 0;
	let indent = '';
	for (let i = 0; i < level; i++) {
		indent += '\t';
	}
	return before.trim() + ',\n\n\t' + indent + codeBlock.trim().replace(/,$/, '') + '\n' + indent + after.trim();
}

/**
 * Returns the API URL containing the host only.
 * @returns {string} API URL
 */
Settings.prototype.apiHost = function() {
	return this.current.vpdb.api.protocol + '://' +
		this.current.vpdb.api.hostname +
		(this.current.vpdb.api.port === 80 || this.current.vpdb.api.port === 443 ? '' : ':' + this.current.vpdb.api.port);
};

/**
 * Returns the internal path of an API resource
 * @param {string} path Path of the resource
 * @returns {string} Internal path
 */
Settings.prototype.apiPath = function(path) {
	return (this.current.vpdb.api.prefix || '') + this.current.vpdb.api.pathname + (path || '');
};

/**
 * Returns the external URL of the API
 * @returns {string} External URL
 */
Settings.prototype.apiUri = function() {
	return this.apiHost() + this.current.vpdb.api.pathname;
};

/**
 * Returns the external URL of a public storage resource
 * @param {string} [path] Path of the resource
 * @returns {string} External URL
 */
Settings.prototype.storagePublicUri = function(path) {
	return this.storageUri(this.current.vpdb.storage.public.api.pathname + (path || ''), 'public');
};

/**
 * Returns the internal path of a public storage resource
 * @param {string} path Path of the resource
 * @returns {string} Internal path
 */
Settings.prototype.storagePublicPath = function(path) {
	return (this.current.vpdb.storage.public.api.prefix || '') + this.current.vpdb.storage.public.api.pathname + (path || '');
};

/**
 * Returns the external URL of a protected storage resource
 * @param {string} [path] Path of the resource
 * @returns {string} External URL
 */
Settings.prototype.storageProtectedUri = function(path) {
	return this.storageUri(this.current.vpdb.storage.protected.api.pathname + (path || ''), 'protected');
};

/**
 * Returns the internal path of a protected storage resource
 * @param {string} path Path of the resource
 * @returns {string} Internal path
 */
Settings.prototype.storageProtectedPath = function(path) {
	return (this.current.vpdb.storage.protected.api.prefix || '') + this.current.vpdb.storage.protected.api.pathname + (path || '');
};

/**
 * Returns the web URL for a given path
 * @param {string} [path] Path of the URL
 * @returns {string}
 */
Settings.prototype.webUri = function(path) {
	return this.current.vpdb.webapp.protocol + '://' +
		this.current.vpdb.webapp.hostname +
		(this.current.vpdb.webapp.port === 80 || this.current.vpdb.webapp.port === 443 ? '' : ':' + this.current.vpdb.webapp.port) +
		(path || '');
};

/**
 * Returns the external URL of a storage resource
 * @param {string} path Path of the resource
 * @param {string} visibility Either "public" or "protected", depending which API is demanded
 * @returns {string} Full URL
 */
Settings.prototype.storageUri = function(path, visibility) {
	let api = this.current.vpdb.storage[visibility].api;
	return api.protocol + '://' + api.hostname + (api.port === 80 || api.port === 443 ? '' : ':' + api.port) + (path || '');
};

/**
 * Determines the API based of the internal path.
 * @param internalPath
 * @returns {{protocol: string, hostname: string, port: number, pathname: string, prefix: string }|null} API or null if no match.
 */
Settings.prototype.getApi = function(internalPath) {
	if (!internalPath) {
		return null;
	}
	let apis = [ this.current.vpdb.storage.protected.api, this.current.vpdb.storage.public.api, this.current.vpdb.api];
	for (let i = 0; i < apis.length; i++) {
		let api = apis[i];
		let pathPrefix = (api.prefix || '') + api.pathname;
		if (pathPrefix === internalPath.substr(0, pathPrefix.length)) {
			return api;
		}
	}
	return null;
};

/**
 * Converts an internal URL to an external URL
 * @param internalPath
 * @returns {string} External URL if an API could be matched, otherwise same string as given.
 */
Settings.prototype.intToExt = function(internalPath) {
	let api = this.getApi(internalPath);
	if (!api || !api.prefix) {
		return internalPath;
	}
	return internalPath.substr(api.prefix.length);
};

Settings.prototype.clientConfig = function() {
	return {
		authHeader: this.current.vpdb.authorizationHeader,
		apiUri: this.current.vpdb.api,
		storageUri: this.current.vpdb.storage.protected.api,
		webUri: this.current.vpdb.webapp,
		ga: this.current.webapp.ga,
		authProviders: {
			local: true,
			google: this.current.vpdb ? this.current.vpdb.passport.google.enabled : false,
			github: this.current.vpdb ? this.current.vpdb.passport.github.enabled : false,
			ipboard: _.map(_.filter(this.current.vpdb ? this.current.vpdb.passport.ipboard : [], function(ipbConfig) { return ipbConfig.enabled; }), function(ipbConfig) {
				return {
					id: ipbConfig.id,
					name: ipbConfig.name,
					icon: ipbConfig.icon,
					url: '/auth/' + ipbConfig.id
				};
			})
		}
	};
};

Settings.prototype.clientConfigName = function() {
	let data = util.inspect(this.clientConfig());
	let md5sum = crypto.createHash('md5');
	md5sum.update(data);
	let hash = md5sum.digest('hex').substr(0, 7);
	return 'config_' + hash + '.js';
};

module.exports = new Settings();