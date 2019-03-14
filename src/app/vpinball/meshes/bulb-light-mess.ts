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

import { Mesh } from '../common';

const vertices = [
	[0.220295, -0.381570, 0.984870, 0.496400, -0.859800, 0.119300, 0.698812, 0.614784],
	[0.000000, -0.407060, 1.148565, 0.000000, -0.924900, 0.380300, 0.688975, 0.500000],
	[0.000000, -0.440600, 0.984870, 0.000000, -0.992800, 0.119300, 0.729568, 0.500000],
	[0.203525, -0.352525, 1.148565, 0.462400, -0.800900, 0.380300, 0.663657, 0.594488],
	[0.352515, -0.203530, 1.148565, 0.801000, -0.462400, 0.380300, 0.594488, 0.663657],
	[0.381560, -0.220300, 0.984870, 0.859800, -0.496400, 0.119300, 0.614784, 0.698812],
	[0.440585, 0.000000, 0.984870, 0.992900, 0.000000, 0.119300, 0.500000, 0.729568],
	[0.407050, 0.000000, 1.148565, 0.924900, 0.000000, 0.380300, 0.500000, 0.688975],
	[0.352515, 0.203530, 1.148565, 0.801000, 0.462400, 0.380300, 0.405512, 0.663657],
	[0.381560, 0.220300, 0.984870, 0.859800, 0.496400, 0.119300, 0.385216, 0.698812],
	[0.220295, 0.381570, 0.984870, 0.496400, 0.859800, 0.119300, 0.301188, 0.614784],
	[0.203525, 0.352525, 1.148565, 0.462400, 0.800900, 0.380300, 0.336343, 0.594488],
	[0.000000, 0.407060, 1.148565, 0.000000, 0.924900, 0.380300, 0.311025, 0.500000],
	[0.000000, 0.440600, 0.984870, 0.000000, 0.992800, 0.119300, 0.270432, 0.500000],
	[-0.220295, 0.381570, 0.984870, -0.496400, 0.859800, 0.119300, 0.301188, 0.385216],
	[-0.203525, 0.352525, 1.148565, -0.462400, 0.800900, 0.380300, 0.336343, 0.405512],
	[-0.352515, 0.203530, 1.148565, -0.801000, 0.462400, 0.380300, 0.405512, 0.336343],
	[-0.381560, 0.220300, 0.984870, -0.859800, 0.496400, 0.119300, 0.385216, 0.301188],
	[-0.440585, 0.000000, 0.984870, -0.992900, 0.000000, 0.119300, 0.500000, 0.270432],
	[-0.407050, 0.000000, 1.148565, -0.924900, 0.000000, 0.380300, 0.500000, 0.311025],
	[-0.352515, -0.203530, 1.148565, -0.801000, -0.462400, 0.380300, 0.594488, 0.336343],
	[-0.381560, -0.220300, 0.984870, -0.859800, -0.496400, 0.119300, 0.614784, 0.301188],
	[-0.220295, -0.381570, 0.984870, -0.496400, -0.859800, 0.119300, 0.698812, 0.385216],
	[-0.203525, -0.352525, 1.148565, -0.462400, -0.800900, 0.380300, 0.663657, 0.405512],
	[0.155770, -0.269810, 1.287345, 0.353500, -0.612300, 0.707200, 0.625258, 0.572318],
	[0.000000, -0.311550, 1.287345, 0.000000, -0.713200, 0.700900, 0.644635, 0.500000],
	[0.269805, -0.155775, 1.287345, 0.617700, -0.356600, 0.700900, 0.572318, 0.625258],
	[0.311540, 0.000000, 1.287345, 0.707000, 0.000000, 0.707200, 0.500000, 0.644635],
	[0.269805, 0.155775, 1.287345, 0.617700, 0.356600, 0.700900, 0.427682, 0.625258],
	[0.155770, 0.269810, 1.287345, 0.353500, 0.612300, 0.707200, 0.374742, 0.572318],
	[0.000000, 0.311550, 1.287345, 0.000000, 0.713200, 0.700900, 0.355365, 0.500000],
	[-0.155770, 0.269810, 1.287345, -0.353500, 0.612300, 0.707200, 0.374742, 0.427682],
	[-0.269805, 0.155775, 1.287345, -0.617700, 0.356600, 0.700900, 0.427682, 0.374742],
	[-0.311540, 0.000000, 1.287345, -0.707000, 0.000000, 0.707200, 0.500000, 0.355365],
	[-0.269805, -0.155775, 1.287345, -0.617700, -0.356600, 0.700900, 0.572318, 0.374742],
	[-0.155770, -0.269810, 1.287345, -0.353500, -0.612300, 0.707200, 0.625258, 0.427682],
	[0.000000, -0.168610, 1.380070, 0.000000, -0.385700, 0.922600, 0.578276, 0.500000],
	[0.146015, -0.084305, 1.380070, 0.334000, -0.192800, 0.922600, 0.539138, 0.567789],
	[0.146015, 0.084305, 1.380070, 0.334000, 0.192800, 0.922600, 0.460862, 0.567789],
	[0.000000, 0.168610, 1.380070, 0.000000, 0.385700, 0.922600, 0.421724, 0.500000],
	[-0.146015, 0.084305, 1.380070, -0.334000, 0.192800, 0.922600, 0.460862, 0.432211],
	[-0.146015, -0.084305, 1.380070, -0.334000, -0.192800, 0.922600, 0.539138, 0.432211],
	[0.000000, 0.000000, 1.412630, 0.000000, 0.000000, 1.000000, 0.500000, 0.500000],
	[0.237500, -0.411375, 0.129865, 0.497700, -0.862000, -0.096000, 0.879719, 0.719231],
	[0.000000, -0.475015, 0.129865, 0.000000, -0.995400, -0.096000, 0.938461, 0.500000],
	[0.411360, -0.237505, 0.129865, 0.862000, -0.497700, -0.096000, 0.719231, 0.879719],
	[0.475000, 0.000000, 0.129865, 0.995400, 0.000000, -0.096000, 0.500000, 0.938461],
	[0.411360, 0.237505, 0.129865, 0.862000, 0.497700, -0.096000, 0.280769, 0.879719],
	[0.237500, 0.411375, 0.129865, 0.497700, 0.862000, -0.096000, 0.120281, 0.719231],
	[0.000000, 0.475015, 0.129865, 0.000000, 0.995400, -0.096000, 0.061539, 0.500000],
	[-0.237500, 0.411375, 0.129865, -0.497700, 0.862000, -0.096000, 0.120281, 0.280769],
	[-0.411360, 0.237505, 0.129865, -0.862000, 0.497700, -0.096000, 0.280769, 0.120281],
	[-0.475000, 0.000000, 0.129865, -0.995400, 0.000000, -0.096000, 0.500000, 0.061539],
	[-0.411360, -0.237505, 0.129865, -0.862000, -0.497700, -0.096000, 0.719231, 0.120281],
	[-0.237500, -0.411375, 0.129865, -0.497700, -0.862000, -0.096000, 0.879719, 0.280769],
	[0.220295, -0.381570, -0.012635, 0.486000, -0.841800, -0.234800, 0.926171, 0.746050],
	[0.000000, -0.440600, -0.012635, 0.000000, -0.972100, -0.234800, 0.992100, 0.500000],
	[0.381560, -0.220300, -0.012635, 0.841800, -0.486000, -0.234700, 0.746050, 0.926171],
	[0.440585, 0.000000, -0.012635, 0.972100, -0.000000, -0.234700, 0.500000, 0.992100],
	[0.381560, 0.220300, -0.012635, 0.841800, 0.486000, -0.234700, 0.253950, 0.926171],
	[0.220295, 0.381570, -0.012635, 0.486000, 0.841800, -0.234800, 0.073829, 0.746050],
	[0.000000, 0.440600, -0.012635, 0.000000, 0.972100, -0.234800, 0.007900, 0.500000],
	[-0.220295, 0.381570, -0.012635, -0.486000, 0.841800, -0.234800, 0.073829, 0.253950],
	[-0.381560, 0.220300, -0.012635, -0.841800, 0.486000, -0.234700, 0.253950, 0.073829],
	[-0.440585, 0.000000, -0.012635, -0.972100, 0.000000, -0.234700, 0.500000, 0.007900],
	[-0.381560, -0.220300, -0.012635, -0.841800, -0.486000, -0.234700, 0.746050, 0.073829],
	[-0.220295, -0.381570, -0.012635, -0.486000, -0.841800, -0.234800, 0.926171, 0.253950]
];

const indexes = [
	44, 56, 55,
	56, 44, 66,
	55, 43, 44,
	43, 55, 45,
	57, 45, 55,
	45, 57, 58,
	43, 0, 44,
	45, 0, 43,
	54, 66, 44,
	58, 46, 45,
	66, 54, 53,
	53, 65, 66,
	65, 53, 64,
	46, 58, 47,
	59, 47, 58,
	47, 59, 60,
	46, 6, 45,
	47, 6, 46,
	5, 45, 6,
	0, 45, 5,
	60, 48, 47,
	5, 4, 0,
	6, 4, 5,
	48, 60, 49,
	61, 49, 60,
	49, 61, 62,
	48, 10, 47,
	49, 10, 48,
	6, 47, 9,
	9, 47, 10,
	9, 8, 6,
	10, 8, 9,
	8, 7, 6,
	6, 7, 4,
	10, 11, 8,
	7, 27, 4,
	8, 27, 7,
	12, 11, 10,
	11, 29, 8,
	12, 29, 11,
	8, 28, 27,
	29, 28, 8,
	13, 12, 10,
	10, 49, 13,
	29, 38, 28,
	28, 38, 27,
	13, 49, 14,
	14, 12, 13,
	50, 14, 49,
	62, 50, 49,
	50, 62, 51,
	51, 14, 50,
	63, 51, 62,
	51, 63, 64,
	64, 52, 51,
	52, 64, 53,
	52, 18, 51,
	53, 18, 52,
	14, 51, 17,
	17, 51, 18,
	17, 16, 14,
	18, 16, 17,
	14, 15, 12,
	16, 15, 14,
	15, 31, 12,
	16, 31, 15,
	31, 30, 12,
	12, 30, 29,
	30, 39, 29,
	31, 39, 30,
	38, 29, 39,
	16, 32, 31,
	40, 39, 31,
	32, 40, 31,
	42, 38, 39,
	42, 39, 40,
	33, 32, 16,
	33, 40, 32,
	19, 33, 16,
	18, 19, 16,
	33, 41, 40,
	41, 42, 40,
	20, 33, 19,
	20, 19, 18,
	34, 41, 33,
	20, 34, 33,
	35, 41, 34,
	35, 34, 20,
	41, 36, 42,
	41, 35, 36,
	38, 42, 37,
	37, 42, 36,
	37, 27, 38,
	27, 37, 26,
	27, 26, 4,
	26, 37, 24,
	4, 26, 24,
	36, 24, 37,
	4, 24, 3,
	4, 3, 0,
	24, 36, 25,
	25, 36, 35,
	3, 24, 1,
	24, 25, 1,
	0, 3, 1,
	1, 25, 35,
	0, 1, 2,
	0, 2, 44,
	1, 35, 23,
	23, 35, 20,
	22, 2, 1,
	1, 23, 22,
	22, 44, 2,
	22, 23, 20,
	44, 22, 54,
	54, 22, 53,
	22, 20, 21,
	21, 53, 22,
	21, 20, 18,
	18, 53, 21,
];

export const bulbLightMess = Mesh.fromArray(vertices, indexes);
