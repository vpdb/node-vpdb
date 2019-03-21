/*
 * VPDB - Virtual Pinball Database
 * Copyright (C) 2019 freezy <freezy@vpdb.io>
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

import { Vector } from 'three';
import { CatmullCurve } from './catmull-curve';
import { GameItem } from './game-item';
import { RenderVertex, Vertex2D, Vertex3D } from './vertex';

export const HIT_SHAPE_DETAIL_LEVEL = 7.0;

export class DragPoint extends GameItem {

	public vertex: Vertex3D;
	public fSmooth: boolean;
	public fSlingshot: boolean;
	public fAutoTexture: boolean;
	public texturecoord: number;

	public static from(data: any): DragPoint {
		const dragPoint = new DragPoint();
		Object.assign(dragPoint, data);
		return dragPoint;
	}

	public static getRgVertex(vdpoint: DragPoint[], loop: boolean = true, accuracy: number = 4.0): RenderVertex[] {

		let vv: RenderVertex[] = [];

		//static const int Dim = T::Dim;    // for now, this is always 2 or 3
		const cpoint: number = vdpoint.length;
		const endpoint: number = loop ? cpoint : cpoint - 1;

		const rendv2 = new RenderVertex();

		for (let i = 0; i < endpoint; i++) {

			const pdp1: DragPoint = vdpoint[i];
			const pdp2: DragPoint = vdpoint[(i < cpoint - 1) ? (i + 1) : 0];

			if ((pdp1.vertex.x === pdp2.vertex.x) && (pdp1.vertex.y === pdp2.vertex.y) && (pdp1.vertex.z === pdp2.vertex.z)) {
				// Special case - two points coincide
				continue;
			}

			let iprev: number = pdp1.fSmooth ? i - 1 : i;
			if (iprev < 0) {
				iprev = (loop ? cpoint - 1 : 0);
			}

			let inext: number = pdp2.fSmooth ? i + 2 : i + 1;
			if (inext >= cpoint) {
				inext = (loop ? inext - cpoint : cpoint - 1);
			}

			const pdp0: DragPoint = vdpoint[iprev];
			const pdp3: DragPoint = vdpoint[inext];

			const cc = CatmullCurve.fromVertex3D(pdp0.vertex, pdp1.vertex, pdp2.vertex, pdp3.vertex);

			const rendv1 = new RenderVertex();

			rendv1.set(pdp1.vertex.x, pdp1.vertex.y);
			rendv1.fSmooth = pdp1.fSmooth;
			rendv1.fSlingshot = pdp1.fSlingshot;
			rendv1.fControlPoint = true;

			// Properties of last point don't matter, because it won't be added to the list on this pass (it'll get added as the first point of the next curve)
			rendv2.set(pdp2.vertex.x, pdp2.vertex.y);

			vv = DragPoint.recurseSmoothLine(vv, cc, 0.0, 1.0, rendv1, rendv2, accuracy);
		}

		if (!loop) {
			// Add the very last point to the list because nobody else added it
			rendv2.fSmooth = true;
			rendv2.fSlingshot = false;
			rendv2.fControlPoint = false;
			vv.push(rendv2);
		}
		return vv;
	}

	public static getTextureCoords(dragPoints: DragPoint[], vv: RenderVertex[]): number[] {

		const vitexpoints: number[] = [];
		const virenderpoints: number[] = [];
		let m_fNoCoords = false;

		const cpoints = vv.length;
		let icontrolpoint = 0;

		const ppcoords: number[] = [];

		for (let i = 0; i < cpoints; ++i) {
			const prv = vv[i];
			if (prv.fControlPoint) {
				if (!dragPoints[icontrolpoint].fAutoTexture) {
					vitexpoints.push(icontrolpoint);
					virenderpoints.push(i);
				}
				++icontrolpoint;
			}
		}

		if (vitexpoints.length === 0) {
			// Special case - no texture coordinates were specified
			// Make them up starting at point 0
			vitexpoints.push(0);
			virenderpoints.push(0);

			m_fNoCoords = true;
		}

		// Wrap the array around so we cover the last section
		vitexpoints.push(vitexpoints[0] + dragPoints.length);
		virenderpoints.push(virenderpoints[0] + cpoints);

		for (let i = 0; i < vitexpoints.length - 1; ++i) {

			const startrenderpoint = virenderpoints[i] % cpoints;
			let endrenderpoint = virenderpoints[(i < cpoints - 1) ? (i + 1) : 0] % cpoints;

			let starttexcoord: number;
			let endtexcoord: number;
			if (m_fNoCoords) {
				starttexcoord = 0.0;
				endtexcoord = 1.0;

			} else {
				starttexcoord = dragPoints[vitexpoints[i] % dragPoints.length].texturecoord;
				endtexcoord = dragPoints[vitexpoints[i + 1] % dragPoints.length].texturecoord;
			}

			const deltacoord = endtexcoord - starttexcoord;

			if (endrenderpoint <= startrenderpoint) {
				endrenderpoint += cpoints;
			}

			let totallength = 0.0;
			for (let l = startrenderpoint; l < endrenderpoint; ++l) {

				const pv1 = vv[l % cpoints];
				const pv2 = vv[(l + 1) % cpoints];

				const dx = pv1.x - pv2.x;
				const dy = pv1.y - pv2.y;
				const length = Math.sqrt(dx*dx + dy*dy);

				totallength += length;
			}

			let partiallength = 0.0;
			for (let l = startrenderpoint; l < endrenderpoint; ++l) {

				const pv1 = vv[l % cpoints];
				const pv2 = vv[(l + 1) % cpoints];

				const dx = pv1.x - pv2.x;
				const dy = pv1.y - pv2.y;
				const length = Math.sqrt(dx*dx + dy*dy);
				if (totallength === 0.0) {
					totallength = 1.0;
				}
				const texcoord = partiallength / totallength;

				ppcoords[l % cpoints] = (texcoord * deltacoord) + starttexcoord;
				partiallength += length;
			}
		}
		return ppcoords;
	}

	private static recurseSmoothLine(vv: RenderVertex[] = [], cc: CatmullCurve, t1: number, t2: number, vt1: RenderVertex, vt2: RenderVertex, accuracy: number): RenderVertex[] {

		const tMid = (t1 + t2) * 0.5;

		const vmid = cc.getPoint2At(tMid);
		vmid.fSmooth = true; // Generated points must always be smooth, because they are part of the curve
		vmid.fSlingshot = false; // Slingshots can't be along curves
		vmid.fControlPoint = false; // We created this point, so it can't be a control point

		if (DragPoint.flatWithAccuracy(vt1, vt2, vmid, accuracy)) {
			// Add first segment point to array.
			// Last point never gets added by this recursive loop,
			// but that's where it wraps around to the next curve.
			vv.push(vt1);

		} else {
			vv = DragPoint.recurseSmoothLine(vv, cc, t1, tMid, vt1, vmid, accuracy);
			vv = DragPoint.recurseSmoothLine(vv, cc, tMid, t2, vmid, vt2, accuracy);
		}
		return vv;
	}

	private static flatWithAccuracy(v1: Vector, v2: Vector, vMid: Vector, accuracy: number): boolean {

		if ((v1 as Vertex2D).isVector2 && (v2 as Vertex2D).isVector2 && (vMid as Vertex2D).isVector2) {
			return DragPoint.flatWithAccuracy2(v1 as Vertex2D, v2 as Vertex2D, vMid as Vertex2D, accuracy);
		}

		if ((v1 as Vertex3D).isVector3 && (v2 as Vertex3D).isVector3 && (vMid as Vertex3D).isVector3) {
			return DragPoint.flatWithAccuracy3(v1 as Vertex3D, v2 as Vertex3D, vMid as Vertex3D, accuracy);
		}

		throw new Error('Arguments must be either of Vector2 or Vector3.');
	}

	private static flatWithAccuracy2(v1: Vertex2D, v2: Vertex2D, vMid: Vertex2D, accuracy: number): boolean {
		// compute double the signed area of the triangle (v1, vMid, v2)
		const dblarea = (vMid.x - v1.x) * (v2.y - v1.y) - (v2.x - v1.x) * (vMid.y - v1.y);
		return (dblarea * dblarea < accuracy);
	}

	private static flatWithAccuracy3(v1: Vertex3D, v2: Vertex3D, vMid: Vertex3D, accuracy: number): boolean {
		// compute the square of double the signed area of the triangle (v1, vMid, v2)
		const cross = new Vertex3D();
		cross.cross(vMid.clone().sub(v1), v2.clone().sub(v1));
		const dblareasq = cross.lengthSq();
		return (dblareasq < accuracy);
	}

	public async fromTag(buffer: Buffer, tag: string): Promise<void> {
		switch (tag) {
			case 'VCEN': this.vertex = Vertex3D.get(buffer); break;
			case 'POSZ': this.vertex.z = this.getFloat(buffer); break;
			case 'SMTH': this.fSmooth = this.getBool(buffer); break;
			case 'SLNG': this.fSlingshot = this.getBool(buffer); break;
			case 'ATEX': this.fAutoTexture = this.getBool(buffer); break;
			case 'TEXC': this.texturecoord = this.getFloat(buffer); break;
			default: this.getUnknownBlock(buffer, tag); break;
		}
	}

	public getName(): string {
		return null;
	}
}
