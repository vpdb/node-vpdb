const _ = require('lodash');

class Serializer {

	/**
	 * Returns the reduced version of the object.
	 *
	 * @param {Document} doc Retrieved MongoDB object
	 * @param {Request} req Request object
	 * @param {{ [includedFields]:string[], [excludedFields]:string[], [starred]:boolean|undefined, [fileIds]:string[], [thumbFlavor]:string, [thumbFormat]:string, [fullThumbData]:boolean, [thumbPerFile]:boolean, [includeProviderId]:string }} [opts] Additional options for serialization
	 * @return {object} Serialized object
	 */
	reduced(doc, req, opts) {
		return this.__serialize(this._reduced.bind(this), doc, req, opts);
	}

	/**
	 * Returns the simple version of the object.
	 *
	 * @param {Document} doc Retrieved MongoDB object
	 * @param {Request} req Request object
	 * @param {{ [includedFields]:string[], [excludedFields]:string[], [starred]:boolean|undefined, [fileIds]:string[], [thumbFlavor]:string, [thumbFormat]:string, [fullThumbData]:boolean, [thumbPerFile]:boolean, [includeProviderId]:string }} [opts] Additional options for serialization
	 * @return {object} Serialized object
	 */
	simple(doc, req, opts) {
		return this.__serialize(this._simple.bind(this), doc, req, opts);
	}

	/**
	 * Returns the detailed version of the object.
	 *
	 * @param {Document} doc Retrieved MongoDB object
	 * @param {Request} req Request object
	 * @param {{ [includedFields]:string[], [excludedFields]:string[], [starred]:boolean|undefined, [fileIds]:string[], [thumbFlavor]:string, [thumbFormat]:string, [fullThumbData]:boolean, [thumbPerFile]:boolean, [includeProviderId]:string }} [opts] Additional options for serialization
	 * @return {object} Serialized object
	 */
	detailed(doc, req, opts) {
		return this.__serialize(this._detailed.bind(this), doc, req, opts);
	}

	/** @private **/
	__serialize(serializer, doc, req, opts) {
		if (!doc) {
			return undefined;
		}
		if (!doc._id) {
			throw new Error('Must be document, given: ' + JSON.stringify(doc));
		}
		return this._post(doc, serializer(doc, req, this._defaultOpts(opts)), req, this._defaultOpts(opts));
	}

	/**
	 * Updates serialized object with additional data, common for all detail
	 * levels and types.
	 *
	 * @private
	 */
	_post(doc, object, req, opts) {

		if (!object) {
			return object;
		}

		// handle moderation field
		const ModerationSerializer = require('./moderation.serializer');
		object.moderation = ModerationSerializer._simple(doc.moderation, req, opts);

		// remove excluded fields
		opts.excludedFields.forEach(field => delete object[field]);

		return object;
	}

	/**
	 * Returns the reduced version of the object.
	 *
	 * This is only the fallthrough, don't call directly.
	 * @protected
	 */
	_reduced(doc, req, opts) {
		return this.simple(doc, req, opts);
	}

	/**
	 * Returns the simple version of the object.
	 *
	 * This is only the fallthrough, don't call directly.
	 * @protected
	 */
	_simple(doc, req, opts) {
		return {};
	}

	/**
	 * Returns the detailed version of the object.
	 *
	 * This is only the fallthrough, don't call directly.
	 * @protected
	 */
	_detailed(doc, req, opts) {
		return this.simple(doc, req, opts);
	}

	/**
	 * Checks if a field is populated.
	 *
	 * Note that this doesn't work for nested paths where fields are arrays,
	 * e.g. check for 'files._file' doesn't work in the "versions" serializer
	 * (but 'versions.files._file' from the root works).
	 *
	 * @param doc Document to check
	 * @param field Field to check
	 * @returns {boolean}
	 * @protected
	 */
	_populated(doc, field) {
		if (doc.populated(field)) {
			return true;
		}
		let obj = _.get(doc, field);
		if (_.isArray(obj) && obj.length > 0) {
			obj = obj[0];
		}
		return obj && obj._id;
	}

	/** @protected */
	_defaultOpts(opts) {
		return _.defaultsDeep(opts || {}, {
			includedFields: [],
			excludedFields: [],
			starred: undefined,
			fileIds: [],
			thumbFlavor: null,
			thumbFormat: null,
			fullThumbData: false,
			thumbPerFile: false
		});
	}

	/** @protected */
	_sortByDate(attr) {
		return (a, b) => {
			const dateA = new Date(a[attr]).getTime();
			const dateB = new Date(b[attr]).getTime();
			if (dateA < dateB) {
				return 1;
			}
			if (dateA > dateB) {
				return -1;
			}
			return 0;
		};
	}

	/**
	 * Returns playfield thumb for a given release file.
	 * Can return null if playfield is not populated or thumbFormat is invalid or not specified.
	 *
	 * @param {Document} versionFile Version file
	 * @param {Request} req
	 * @param {{ fullThumbData:boolean, thumbFormat:string }} opts thumbFormat is the variation or "original" if the full link is desired.
	 * @protected
	 * @returns {{}|null}
	 */
	_getFileThumb(versionFile, req, opts) {

		if (!opts.thumbFormat) {
			return undefined;
		}

		if (!this._populated(versionFile, '_playfield_image')) {
			return undefined;
		}

		let thumbFields = [ 'url', 'width', 'height', 'is_protected' ];
		if (opts.fullThumbData) {
			thumbFields = [...thumbFields, 'mime_type', 'bytes', 'file_type'];
		}

		const FileSerializer = require('./file.serializer');
		const playfieldImage = FileSerializer.detailed(versionFile._playfield_image, req, opts);

		if (opts.thumbFormat === 'original') {
			return _.assign(_.pick(playfieldImage, thumbFields), {
				width: playfieldImage.metadata.size.width,
				height: playfieldImage.metadata.size.height
			});

		} else if (playfieldImage.variations[opts.thumbFormat]) {
			return _.pick(playfieldImage.variations[opts.thumbFormat], thumbFields);
		}
		return null;
	}
}

module.exports = Serializer;