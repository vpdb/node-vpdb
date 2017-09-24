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

const fs = require('fs');
const request = require('request');
const path = require('path');
const Zip = require('adm-zip'); // todo migrate to unzip

module.exports = function(grunt) {


	grunt.registerMultiTask('istanbul-middleware', function() {

		const done = this.async();
		const options = this.options();

		if (!options.url) {
			grunt.log.error('URL must be given for istanbul-middleware.');
			return done(false);
		}

		switch (this.target) {
			case 'download': {
				const dest = this.data.dest;
				const baseDir = path.resolve(__dirname, '../..') + '/';
				const zipfile = path.resolve(baseDir, dest, 'coverage.zip');
				const extractTo = path.resolve(baseDir, dest);
				grunt.log.writeln('Downloading coverage zip file from %s', options.url + '/download');
				grunt.log.writeln('Base dir =  %s', baseDir);

				request.get(options.url + '/download')
					.pipe(fs.createWriteStream(zipfile))
					.on('close', function() {
						grunt.log.writeln('Extracting zip file to %s', extractTo);
						const zip = new Zip(zipfile);
						zip.extractAllTo(extractTo, true);

						let lcovinfo = fs.readFileSync(extractTo + '/lcov.info');
						lcovinfo = replaceAll(lcovinfo.toString(), '\\', '/');
						lcovinfo = replaceAll(lcovinfo, baseDir, '');
						fs.writeFileSync(extractTo + '/lcov.info', lcovinfo);
						done();
					})
					.on('error', done);
				break;
			}
			case 'reset': {
				request.post(options.url + '/reset', done);
				break;
			}
		}

	});

};

function escapeRegExp(string) {
	// eslint-disable-next-line no-useless-escape
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(string, find, replace) {
	return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}