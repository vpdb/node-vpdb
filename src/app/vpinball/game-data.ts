/* tslint:disable:variable-name */
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

import { Storage } from '../common/ole-doc';
import { BiffParser } from './biff-parser';
import { Vertex2D, Vertex3D } from './common';

export class GameData extends BiffParser {

	public static async fromStorage(storage: Storage, itemName: string): Promise<GameData> {
		const gameData = new GameData();
		await storage.streamFiltered(itemName, 0, BiffParser.stream(gameData.fromTag.bind(gameData), {
			streamedTags: [ 'CODE' ],
		}));
		return gameData;
	}

	public static from(data: any): GameData {
		const gameData = new GameData();
		Object.assign(gameData, data);
		gameData.materials = [];
		for (const material of data.materials) {
			gameData.materials.push(Material.fromCached(material));
		}
		return gameData;
	}

	private static BG_DESKTOP = 0;
	private static BG_FULLSCREEN = 1;
	private static BG_FSS = 2;

	public pdata: number[] = [];
	public left: number;
	public top: number;
	public right: number;
	public bottom: number;
	public BG_rotation: number[] = [];
	public BG_layback: number[] = [];
	public BG_inclination: number[] = [];
	public BG_FOV: number[] = [];
	public BG_scalex: number[] = [];
	public BG_scaley: number[] = [];
	public BG_scalez: number[] = [];
	public BG_xlatex: number[] = [];
	public BG_xlatey: number[] = [];
	public BG_xlatez: number[] = [];
	public BG_enable_FSS: boolean;
	public BG_current_set: number;
	public overridePhysics: number;
	public overridePhysicsFlipper: boolean;
	public Gravity: number;
	public friction: number;
	public elasticity: number;
	public elasticityFalloff: number;
	public scatter: number;
	public defaultScatter: number;
	public nudgeTime: number;
	public plungerNormalize: number;
	public plungerFilter: boolean;
	public PhysicsMaxLoops: number;
	public fRenderDecals: boolean;
	public fRenderEMReels: boolean;
	public offset: Vertex2D = new Vertex2D();
	public _3DmaxSeparation: number;
	public _3DZPD: number;
	public zoom: number;
	public _3DOffset: number;
	public overwriteGlobalStereo3D: boolean;
	public angletiltMax: number;
	public angletiltMin: number;
	public glassheight: number;
	public tableheight: number;
	public szImage: string;
	public szBallImage: string;
	public szBallImageFront: string;
	public szScreenShot: string;
	public fBackdrop: boolean;
	public numGameItems: number;
	public numSounds: number;
	public numTextures: number;
	public numFonts: number;
	public numCollections: number;
	public scriptPos: number;
	public scriptLen: number;
	public wzName: string;
	public Light: LightSource[] = [ new LightSource() ];
	public BG_szImage: string[] = [];
	public ImageBackdropNightDay: boolean;
	public szImageColorGrade: string;
	public szEnvImage: string;
	public szPlayfieldMaterial: string;
	public lightAmbient: number;
	public lightHeight: number;
	public lightRange: number;
	public lightEmissionScale: number;
	public envEmissionScale: number;
	public globalEmissionScale: number;
	public AOScale: number;
	public SSRScale: number;
	public useReflectionForBalls: number;
	public playfieldReflectionStrength: number;
	public useTrailForBalls: number;
	public ballTrailStrength: number;
	public ballPlayfieldReflectionStrength: number;
	public defaultBulbIntensityScaleOnBall: number;
	public useAA: number;
	public useAO: number;
	public useSSR: number;
	public useFXAA: number;
	public bloom_strength: number;
	public colorbackdrop: number;
	public rgcolorcustom: number[];
	public globalDifficulty: number;
	public szT: string;
	public vCustomInfoTag: string[] = [];
	public TableSoundVolume: number;
	public BallDecalMode: boolean;
	public TableMusicVolume: number;
	public TableAdaptiveVSync: number;
	public overwriteGlobalDetailLevel: boolean;
	public overwriteGlobalDayNight: boolean;
	public fGrid: boolean;
	public fReflectElementsOnPlayfield: boolean;
	public userDetailLevel: number;
	public numMaterials: number;
	public materials: Material[] = [];

	public getName(): string {
		return this.wzName;
	}

	public serialize() {
		return {
			table_height: this.tableheight,
			size: {
				width: this.right - this.left,
				height: this.bottom - this.top,
			},
			glass_height: this.glassheight,
			offset: this.offset,
			light: {
				ambient: this.lightAmbient,
				height: this.lightHeight,
				range: this.lightRange,
				emmission_scale: this.lightEmissionScale,
			},
			textureMap: this.szImage,
			material: this.szPlayfieldMaterial,
		};
	}

	private async fromTag(buffer: Buffer, tag: string, offset: number, len: number): Promise<void> {
		switch (tag) {
			case 'PIID': this.pdata[0] = this.getInt(buffer); break;
			case 'LEFT': this.left = this.getFloat(buffer); break;
			case 'TOPX': this.top = this.getFloat(buffer); break;
			case 'RGHT': this.right = this.getFloat(buffer); break;
			case 'BOTM': this.bottom = this.getFloat(buffer); break;
			case 'ROTA': this.BG_rotation[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'LAYB': this.BG_layback[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'INCL': this.BG_inclination[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'FOVX': this.BG_FOV[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'SCLX': this.BG_scalex[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'SCLY': this.BG_scaley[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'SCLZ': this.BG_scalez[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'XLTX': this.BG_xlatex[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'XLTY': this.BG_xlatey[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'XLTZ': this.BG_xlatez[GameData.BG_DESKTOP] = this.getFloat(buffer); break;
			case 'ROTF': this.BG_rotation[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'LAYF': this.BG_layback[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'INCF': this.BG_inclination[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'FOVF': this.BG_FOV[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'SCFX': this.BG_scalex[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'SCFY': this.BG_scaley[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'SCFZ': this.BG_scalez[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'XLFX': this.BG_xlatex[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'XLFY': this.BG_xlatey[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'XLFZ': this.BG_xlatez[GameData.BG_FULLSCREEN] = this.getFloat(buffer); break;
			case 'ROFS': this.BG_rotation[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'LAFS': this.BG_layback[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'INFS': this.BG_inclination[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'FOFS': this.BG_FOV[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'SCXS': this.BG_scalex[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'SCYS': this.BG_scaley[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'SCZS': this.BG_scalez[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'XLXS': this.BG_xlatex[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'XLYS': this.BG_xlatey[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'XLZS': this.BG_xlatez[GameData.BG_FSS] = this.getFloat(buffer); break;
			case 'EFSS':
				this.BG_enable_FSS = this.getBool(buffer);
				if (this.BG_enable_FSS) {
					this.BG_current_set = GameData.BG_FSS;
				}
				break;
			case 'ORRP': this.overridePhysics = this.getInt(buffer); break;
			case 'ORPF': this.overridePhysicsFlipper = this.getBool(buffer); break;
			case 'GAVT': this.Gravity = this.getFloat(buffer); break;
			case 'FRCT': this.friction = this.getFloat(buffer); break;
			case 'ELAS': this.elasticity = this.getFloat(buffer); break;
			case 'ELFA': this.elasticityFalloff = this.getFloat(buffer); break;
			case 'PFSC': this.scatter = this.getFloat(buffer); break;
			case 'SCAT': this.defaultScatter = this.getFloat(buffer); break;
			case 'NDGT': this.nudgeTime = this.getFloat(buffer); break;
			case 'MPGC': this.plungerNormalize = this.getInt(buffer); break;
			case 'MPDF': this.plungerFilter = this.getBool(buffer); break;
			case 'PHML': this.PhysicsMaxLoops = this.getInt(buffer); break;
			case 'DECL': this.fRenderDecals = this.getBool(buffer); break;
			case 'REEL': this.fRenderEMReels = this.getBool(buffer); break;
			case 'OFFX': this.offset.x = this.getFloat(buffer); break;
			case 'OFFY': this.offset.y = this.getFloat(buffer); break;
			case 'ZOOM': this.zoom = this.getFloat(buffer); break;
			case 'MAXSEP': this._3DmaxSeparation = this.getFloat(buffer); break;
			case 'ZPD': this._3DZPD = this.getFloat(buffer); break;
			case 'STO': this._3DOffset = this.getFloat(buffer); break;
			case 'OGST': this.overwriteGlobalStereo3D = this.getBool(buffer); break;
			case 'SLPX': this.angletiltMax = this.getFloat(buffer); break;
			case 'SLOP': this.angletiltMin = this.getFloat(buffer); break;
			case 'GLAS': this.glassheight = this.getFloat(buffer); break;
			case 'TBLH': this.tableheight = this.getFloat(buffer); break;
			case 'IMAG': this.szImage = this.getString(buffer, len); break;
			case 'BLIM': this.szBallImage = this.getString(buffer, len); break;
			case 'BLIF': this.szBallImageFront = this.getString(buffer, len); break;
			case 'SSHT': this.szScreenShot = this.getString(buffer, len); break;
			case 'FBCK': this.fBackdrop = this.getBool(buffer); break;
			case 'SEDT': this.numGameItems = this.getInt(buffer); break;
			case 'SSND': this.numSounds = this.getInt(buffer); break;
			case 'SIMG': this.numTextures = this.getInt(buffer); break;
			case 'SFNT': this.numFonts = this.getInt(buffer); break;
			case 'SCOL': this.numCollections = this.getInt(buffer); break;
			case 'CODE':
				this.scriptPos = offset;
				this.scriptLen = len;
				break;
			case 'NAME': this.wzName = this.getWideString(buffer, len); break;
			case 'BIMG': this.BG_szImage[GameData.BG_DESKTOP] = this.getString(buffer, len); break;
			case 'BIMF': this.BG_szImage[GameData.BG_FULLSCREEN] = this.getString(buffer, len); break;
			case 'BIMS': this.BG_szImage[GameData.BG_FSS] = this.getString(buffer, len); break;
			case 'BIMN': this.ImageBackdropNightDay = this.getBool(buffer); break;
			case 'IMCG': this.szImageColorGrade = this.getString(buffer, len); break;
			case 'EIMG': this.szEnvImage = this.getString(buffer, len); break;
			case 'PLMA': this.szPlayfieldMaterial = this.getString(buffer, len); break;
			case 'LZAM': this.lightAmbient = this.getInt(buffer); break;
			case 'LZDI': this.Light[0].emission = this.getInt(buffer); break;
			case 'LZHI': this.lightHeight = this.getFloat(buffer); break;
			case 'LZRA': this.lightRange = this.getFloat(buffer); break;
			case 'LIES': this.lightEmissionScale = this.getFloat(buffer); break;
			case 'ENES': this.envEmissionScale = this.getFloat(buffer); break;
			case 'GLES': this.globalEmissionScale = this.getFloat(buffer); break;
			case 'AOSC': this.AOScale = this.getFloat(buffer); break;
			case 'SSSC': this.SSRScale = this.getFloat(buffer); break;
			case 'BREF': this.useReflectionForBalls = this.getInt(buffer); break;
			case 'PLST': this.playfieldReflectionStrength = this.getInt(buffer); break; // m_playfieldReflectionStrength = dequantizeUnsigned<8>(tmp);
			case 'BTRA': this.useTrailForBalls = this.getInt(buffer); break;
			case 'BTST': this.ballTrailStrength = this.getInt(buffer); break; // m_ballTrailStrength = dequantizeUnsigned<8>(tmp);
			case 'BPRS': this.ballPlayfieldReflectionStrength = this.getFloat(buffer); break;
			case 'DBIS': this.defaultBulbIntensityScaleOnBall = this.getFloat(buffer); break;
			case 'UAAL': this.useAA = this.getInt(buffer); break;
			case 'UAOC': this.useAO = this.getInt(buffer); break;
			case 'USSR': this.useSSR = this.getInt(buffer); break;
			case 'UFXA': this.useFXAA = this.getFloat(buffer); break;
			case 'BLST': this.bloom_strength = this.getFloat(buffer); break;
			case 'BCLR': this.colorbackdrop = this.getInt(buffer); break;
			case 'CCUS': this.rgcolorcustom = this.getUnsignedInt4s(buffer, 16); break;
			case 'TDFT': this.globalDifficulty = this.getFloat(buffer); break;
			case 'CUST': this.szT = this.getString(buffer, len); this.vCustomInfoTag.push(this.szT); break;
			case 'SVOL': this.TableSoundVolume = this.getFloat(buffer); break;
			case 'BDMO': this.BallDecalMode = this.getBool(buffer); break;
			case 'MVOL': this.TableMusicVolume = this.getFloat(buffer); break;
			case 'AVSY': this.TableAdaptiveVSync = this.getInt(buffer); break;
			case 'OGAC': this.overwriteGlobalDetailLevel = this.getBool(buffer); break;
			case 'OGDN': this.overwriteGlobalDayNight = this.getBool(buffer); break;
			case 'GDAC': this.fGrid = this.getBool(buffer); break;
			case 'REOP': this.fReflectElementsOnPlayfield = this.getBool(buffer); break;
			case 'ARAC': this.userDetailLevel = this.getInt(buffer); break;
			case 'MASI': this.numMaterials = this.getInt(buffer); break;
			case 'MATE': this.materials = this._getMaterials(buffer, len, this.numMaterials); break;
			case 'PHMA': this._getPhysicsMaterials(buffer, len, this.numMaterials); break;
		}
	}

	private _getMaterials(buffer: Buffer, len: number, num: number): Material[] {
		if (len < num * SaveMaterial.size) {
			throw new Error('Cannot parse ' + num + ' materials of ' + (num * SaveMaterial.size) + ' bytes from a ' + len + ' bytes buffer.');
		}
		const materials: Material[] = [];
		for (let i = 0; i < num; i++) {
			const saveMat = new SaveMaterial(buffer, i);
			materials.push(Material.fromSaved(saveMat));
		}
		return materials;
	}

	private _getPhysicsMaterials(buffer: Buffer, len: number, num: number): void {
		if (len < num * SavePhysicsMaterial.size) {
			throw new Error('Cannot parse ' + num + ' physical materials of ' + (num * SavePhysicsMaterial.size) + ' bytes from a ' + len + ' bytes buffer.');
		}
		for (let i = 0; i < num; i++) {
			const savePhysMat = new SavePhysicsMaterial(buffer, i);
			const material = this.materials.find(m => m.szName === savePhysMat.szName);
			if (!material) {
				throw new Error('Cannot find material "' + savePhysMat.szName + '" in [' + this.materials.map(m => m.szName).join(', ') + '] for updating physics.');
			}
			material.physUpdate(savePhysMat);
		}
	}
}

class LightSource {

	public static from(data: any): Vertex2D {
		return Object.assign(new Vertex2D(), data);
	}

	public emission: number;
	public pos: Vertex3D;
}

class SaveMaterial {

	public static size = 76;

	public szName: string;
	public cBase: number; // can be overriden by texture on object itself
	public cGlossy: number; // specular of glossy layer
	public cClearcoat: number; // specular of clearcoat layer
	public fWrapLighting: number; // wrap/rim lighting factor (0(off)..1(full))
	public bIsMetal: boolean; // is a metal material or not
	public fRoughness: number; // roughness of glossy layer (0(diffuse)..1(specular))
	public fGlossyImageLerp: number; // use image also for the glossy layer (0(no tinting at all)..1(use image)), stupid quantization because of legacy loading/saving
	public fEdge: number; // edge weight/brightness for glossy and clearcoat (0(dark edges)..1(full fresnel))
	public fThickness: number; // thickness for transparent materials (0(paper thin)..1(maximum)), stupid quantization because of legacy loading/saving
	public fOpacity: number; // opacity (0..1)
	public bOpacityActive_fEdgeAlpha: number;

	constructor(buffer: Buffer, i = 0) {
		const offset = i * SaveMaterial.size;
		this.szName = BiffParser.parseNullTerminatedString(buffer.slice(offset, offset + 32));
		this.cBase = buffer.readInt32LE(offset + 32);
		this.cGlossy = buffer.readInt32LE(offset + 36);
		this.cClearcoat = buffer.readInt32LE(offset + 40);
		this.fWrapLighting = buffer.readFloatLE(offset + 44);
		this.bIsMetal =  buffer.readInt32LE(offset + 48) > 0;
		this.fRoughness =  buffer.readFloatLE(offset + 52);
		this.fGlossyImageLerp =  buffer.readInt32LE(offset + 56);
		this.fEdge =  buffer.readFloatLE(offset + 60);
		this.fThickness =  buffer.readInt32LE(offset + 64);
		this.fOpacity =  buffer.readFloatLE(offset + 68);
		this.bOpacityActive_fEdgeAlpha =  buffer.readInt32LE(offset + 72);
	}
}

class SavePhysicsMaterial {

	public static size = 48;

	public szName: string;
	public fElasticity: number;
	public fElasticityFallOff: number;
	public fFriction: number;
	public fScatterAngle: number;

	constructor(buffer: Buffer, i = 0) {
		const offset = i * SavePhysicsMaterial.size;
		this.szName = BiffParser.parseNullTerminatedString(buffer.slice(offset, offset + 32));
		this.fElasticity =  buffer.readFloatLE(offset + 32);
		this.fElasticityFallOff =  buffer.readFloatLE(offset + 36);
		this.fFriction =  buffer.readFloatLE(offset + 40);
		this.fScatterAngle =  buffer.readFloatLE(offset + 44);
	}
}

class Material {

	public static fromSaved(saveMaterial: SaveMaterial): Material {
		const material = new Material();
		material.szName = saveMaterial.szName;
		material.cBase = saveMaterial.cBase;
		material.cGlossy = saveMaterial.cGlossy;
		material.cClearcoat = saveMaterial.cClearcoat;
		material.fWrapLighting = saveMaterial.fWrapLighting;
		material.fRoughness = saveMaterial.fRoughness;
		material.fGlossyImageLerp = 0; //1.0f - dequantizeUnsigned<8>(mats[i].fGlossyImageLerp); //!! '1.0f -' to be compatible with previous table versions
		material.fThickness = 0; //(mats[i].fThickness == 0) ? 0.05f : dequantizeUnsigned<8>(mats[i].fThickness); //!! 0 -> 0.05f to be compatible with previous table versions
		material.fEdge = saveMaterial.fEdge;
		material.fOpacity = saveMaterial.fOpacity;
		material.bIsMetal = saveMaterial.bIsMetal;
		// tslint:disable-next-line:no-bitwise
		material.bOpacityActive = !!(saveMaterial.bOpacityActive_fEdgeAlpha & 1);
		material.fEdgeAlpha = 0; //dequantizeUnsigned<7>(mats[i].bOpacityActive_fEdgeAlpha >> 1);
		return material;
	}

	public static fromCached(data: any): Material {
		const material = new Material();
		Object.assign(material, data);
		return material;
	}

	public szName: string;
	public fWrapLighting: number;

	/**
	 * Roughness seems to be mapped to the "specular" exponent.
	 *
	 * Comment when importing:
	 *
	 * > normally a wavefront material specular exponent ranges from 0..1000.
	 * > but our shininess calculation differs from the way how e.g. Blender is calculating the specular exponent
	 * > starting from 0.5 and use only half of the exponent resolution to get a similar look
	 *
	 * Then the roughness is converted like this:
	 * > mat->m_fRoughness = 0.5f + (tmp / 2000.0f);
	 *
	 * When sending to the render device, the roughness is defined like that:
	 * > fRoughness = exp2f(10.0f * mat->m_fRoughness + 1.0f); // map from 0..1 to 2..2048
	 *
	 */
	public fRoughness: number;
	public fGlossyImageLerp: number;
	public fThickness: number;
	public fEdge: number;
	public fEdgeAlpha: number;
	public fOpacity: number;
	public cBase: number;
	public cGlossy: number;
	public cClearcoat: number;
	public bIsMetal: boolean;
	public bOpacityActive: boolean;

	//physics
	public fElasticity: number;
	public fElasticityFalloff: number;
	public fFriction: number;
	public fScatterAngle: number;

	public serialize() {
		return {
			name: this.szName,
			wrap_lighting: this.fWrapLighting,
			roughness: this.fRoughness,
			//glossy_image_lerp: this.fGlossyImageLerp,
			//thickness: this.fThickness,
			edge: this.fEdge,
			//edge_alpha: this.fEdgeAlpha,
			opacity: this.fOpacity,
			base_color: BiffParser.bgrToRgb(this.cBase),
			glossy_color: BiffParser.bgrToRgb(this.cGlossy),
			clearcoat_color: BiffParser.bgrToRgb(this.cClearcoat),
			is_metal: this.bIsMetal,
			is_opacity_enabled: this.bOpacityActive,
		};
	}

	public physUpdate(savePhysMat: SavePhysicsMaterial) {
		this.fElasticity = savePhysMat.fElasticity;
		this.fElasticityFalloff = savePhysMat.fElasticityFallOff;
		this.fFriction = savePhysMat.fFriction;
		this.fScatterAngle = savePhysMat.fScatterAngle;
	}
}
