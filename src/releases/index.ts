/*
 * VPDB - Virtual Pinball Database
 * Copyright (C) 2018 freezy <freezy@vpdb.io>
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

import Application = require('koa');
import Router from 'koa-router';
import mongoose, { Schema } from 'mongoose';

import { EndPoint } from '../common/api.endpoint';
import { state } from '../state';
import { Release } from './release';
import { router as apiRouter } from './release.api.router';
import { ReleaseModel, releaseSchema } from './release.schema';
import { ReleaseSerializer } from './release.serializer';
import { router as storageRouter } from './release.storage.router';
import { TableBlock } from './release.tableblock';
import { tableBlockSchema } from './release.tableblock.schema';
import { ReleaseVersionFile } from './version/file/release.version.file';
import { ReleaseVersionFileModel, releaseVersionFileSchema } from './version/file/release.version.file.schema';
import { ReleaseVersionFileSerializer } from './version/file/release.version.file.serializer';
import { ReleaseVersion } from './version/release.version';
import { ReleaseVersionModel, releaseVersionSchema } from './version/release.version.schema';
import { ReleaseVersionSerializer } from './version/release.version.serializer';

export class ReleaseEndPoint extends EndPoint {

	public readonly name: string = 'Release API';

	private readonly _router: Router;
	private readonly _releaseSchema: Schema;
	private readonly _releaseVersionSchema: Schema;
	private readonly _releaseVersionFileSchema: Schema;

	constructor() {
		super();
		this._router = apiRouter;
		this._releaseSchema = releaseSchema;
		this._releaseVersionSchema = releaseVersionSchema;
		this._releaseVersionFileSchema = releaseVersionFileSchema;
	}

	public getRouter(): Router {
		return this._router;
	}

	public async register(app: Application): Promise<void> {
		state.models.Release = mongoose.model<Release>('Release', this._releaseSchema) as ReleaseModel;
		state.models.ReleaseVersion = mongoose.model<ReleaseVersion, ReleaseVersionModel>('ReleaseVersion', this._releaseVersionSchema);
		state.models.ReleaseVersionFile = mongoose.model<ReleaseVersionFile, ReleaseVersionFileModel>('ReleaseVersionFile', this._releaseVersionFileSchema);
		state.serializers.Release = new ReleaseSerializer();
		state.serializers.ReleaseVersion = new ReleaseVersionSerializer();
		state.serializers.ReleaseVersionFile = new ReleaseVersionFileSerializer();
		state.models.TableBlock = mongoose.model<TableBlock>('TableBlock', tableBlockSchema);
	}
}

export class ReleaseStorageEndPoint extends EndPoint {

	public readonly name: string = 'Release storage API';

	private readonly _router: Router;

	constructor() {
		super();
		this._router = storageRouter;
	}

	public getRouter(): Router {
		return this._router;
	}

	public async register(app: Application): Promise<void> {
		// nothing to register
	}
}
