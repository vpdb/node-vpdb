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

import { Mesh } from '../mesh';

const vertices = [
	[0.656542, 0.087036, 0.662663, 0.995100, 0.000000, -0.098400, 0.459613, 0.599376],
	[0.656542, 0.197081, 0.662663, 0.995100, 0.000000, -0.098400, 0.459613, 0.630626],
	[0.656560, 0.197081, 1.512698, 0.995100, 0.000000, 0.098500, 0.255427, 0.630626],
	[0.656560, 0.087036, 1.512698, 0.995100, 0.000000, 0.098500, 0.255427, 0.599376],
	[-0.693550, 0.197081, 0.662656, -0.995100, 0.000000, -0.098500, 0.755437, 0.630626],
	[-0.693550, 0.087036, 0.662656, -0.995100, 0.000000, -0.098500, 0.755437, 0.599376],
	[-0.693550, 0.087036, 1.512698, -0.995100, 0.000000, 0.098500, 0.959624, 0.599376],
	[-0.693550, 0.197081, 1.512698, -0.995100, 0.000000, 0.098500, 0.959624, 0.630626],
	[0.519060, 0.197081, 1.650198, 0.098300, 0.000000, 0.995200, 0.215200, 0.630626],
	[-0.556050, 0.197081, 1.650198, -0.098300, 0.000000, 0.995200, 0.000000, 0.630626],
	[0.519060, 0.087036, 1.650198, 0.098300, 0.000000, 0.995200, 0.215200, 0.599376],
	[-0.556050, 0.087036, 1.650198, -0.098300, 0.000000, 0.995200, 0.000000, 0.599376],
	[0.519042, 0.197081, 0.525163, 0.098200, 0.000000, -0.995200, 0.499949, 0.630626],
	[-0.556050, 0.087036, 0.525156, -0.098300, 0.000000, -0.995200, 0.715179, 0.599376],
	[-0.556050, 0.197081, 0.525156, -0.098300, 0.000000, -0.995200, 0.715179, 0.630626],
	[0.519042, 0.087036, 0.525163, 0.098200, 0.000000, -0.995200, 0.499949, 0.599376],
	[0.571624, 0.087036, 0.535643, 0.382900, 0.000000, -0.923800, 0.489929, 0.599376],
	[0.571624, 0.197081, 0.535643, 0.382900, 0.000000, -0.923800, 0.489929, 0.630626],
	[0.616233, 0.087036, 0.565449, 0.707100, 0.000000, -0.707100, 0.479630, 0.599376],
	[0.616233, 0.197081, 0.565449, 0.707100, 0.000000, -0.707100, 0.479630, 0.630626],
	[0.646039, 0.087036, 0.610058, 0.923700, 0.000000, -0.383000, 0.469622, 0.599376],
	[0.646039, 0.197081, 0.610058, 0.923700, 0.000000, -0.383000, 0.469622, 0.630626],
	[-0.608614, 0.087036, 0.535643, -0.383000, 0.000000, -0.923800, 0.725195, 0.599376],
	[-0.608614, 0.197081, 0.535643, -0.383000, 0.000000, -0.923800, 0.725195, 0.630626],
	[-0.653222, 0.087036, 0.565449, -0.707100, 0.000000, -0.707100, 0.735117, 0.599376],
	[-0.653222, 0.197081, 0.565449, -0.707100, 0.000000, -0.707100, 0.735117, 0.630626],
	[-0.683029, 0.087036, 0.610058, -0.923700, 0.000000, -0.383200, 0.745429, 0.599376],
	[-0.683029, 0.197081, 0.610058, -0.923700, 0.000000, -0.383200, 0.745429, 0.630626],
	[0.571624, 0.087036, 1.639711, 0.383000, 0.000000, 0.923800, 0.225216, 0.599376],
	[0.571624, 0.197081, 1.639711, 0.382900, 0.000000, 0.923800, 0.225216, 0.630626],
	[0.616233, 0.087036, 1.609905, 0.707100, 0.000000, 0.707100, 0.235108, 0.599376],
	[0.616233, 0.197081, 1.609905, 0.707100, 0.000000, 0.707100, 0.235108, 0.630626],
	[0.646039, 0.087036, 1.565296, 0.923700, 0.000000, 0.383200, 0.245419, 0.599376],
	[0.646039, 0.197081, 1.565296, 0.923700, 0.000000, 0.383200, 0.245419, 0.630626],
	[-0.608614, 0.087036, 1.639711, -0.383000, 0.000000, 0.923800, 0.989984, 0.599376],
	[-0.556050, 0.087036, 1.650198, -0.098300, 0.000000, 0.995200, 1.000000, 0.599376],
	[-0.608614, 0.197081, 1.639711, -0.383000, 0.000000, 0.923800, 0.989984, 0.630626],
	[-0.556050, 0.197081, 1.650198, -0.098300, 0.000000, 0.995200, 1.000000, 0.630626],
	[-0.653222, 0.087036, 1.609905, -0.707100, 0.000000, 0.707100, 0.979640, 0.599376],
	[-0.653222, 0.197081, 1.609905, -0.707100, 0.000000, 0.707100, 0.979640, 0.630626],
	[-0.683029, 0.087036, 1.565296, -0.923700, 0.000000, 0.383200, 0.969632, 0.599376],
	[-0.683029, 0.197081, 1.565296, -0.923700, 0.000000, 0.383200, 0.969632, 0.630626],
	[0.571624, 0.087036, 0.535643, -0.000000, -1.000000, 0.000000, 0.023952, 0.993493],
	[-0.018495, 0.087036, 1.087677, -0.000000, -1.000000, 0.000000, 0.169393, 0.857487],
	[0.519042, 0.087036, 0.525163, -0.000000, -1.000000, 0.000000, 0.036911, 0.996075],
	[0.616233, 0.087036, 0.565449, -0.000000, -1.000000, 0.000000, 0.012957, 0.986150],
	[0.646039, 0.087036, 0.610058, -0.000000, -1.000000, 0.000000, 0.005611, 0.975159],
	[0.656542, 0.087036, 0.662663, -0.000000, -1.000000, 0.000000, 0.003023, 0.962199],
	[-0.556050, 0.087036, 0.525156, -0.000000, -1.000000, 0.000000, 0.301880, 0.996077],
	[-0.608614, 0.087036, 0.535643, -0.000000, -1.000000, 0.000000, 0.314835, 0.993493],
	[-0.653222, 0.087036, 0.565449, -0.000000, -1.000000, 0.000000, 0.325829, 0.986150],
	[-0.683029, 0.087036, 0.610058, -0.000000, -1.000000, 0.000000, 0.333175, 0.975159],
	[-0.693550, 0.087036, 0.662656, -0.000000, -1.000000, 0.000000, 0.335768, 0.962201],
	[-0.693550, 0.087036, 1.512698, -0.000000, -1.000000, 0.000000, 0.335768, 0.752773],
	[-0.683029, 0.087036, 1.565296, -0.000000, -1.000000, 0.000000, 0.333175, 0.739814],
	[-0.653222, 0.087036, 1.609905, -0.000000, -1.000000, 0.000000, 0.325829, 0.728824],
	[-0.608614, 0.087036, 1.639711, -0.000000, -1.000000, 0.000000, 0.314835, 0.721480],
	[-0.556050, 0.087036, 1.650198, -0.000000, -1.000000, 0.000000, 0.301880, 0.718896],
	[0.519060, 0.087036, 1.650198, -0.000000, -1.000000, 0.000000, 0.036907, 0.718896],
	[0.571624, 0.087036, 1.639711, -0.000000, -1.000000, 0.000000, 0.023952, 0.721480],
	[0.616233, 0.087036, 1.609905, -0.000000, -1.000000, 0.000000, 0.012957, 0.728824],
	[0.646039, 0.087036, 1.565296, -0.000000, -1.000000, 0.000000, 0.005611, 0.739814],
	[0.656560, 0.087036, 1.512698, -0.000000, -1.000000, 0.000000, 0.003018, 0.752773],
	[0.519042, 0.197081, 0.525163, 0.000000, 1.000000, 0.000000, 0.629590, 0.583456],
	[-0.018495, 0.197081, 1.087677, 0.000000, 1.000000, 0.000000, 0.351378, 0.292419],
	[0.571624, 0.197081, 0.535643, 0.000000, 1.000000, 0.000000, 0.656805, 0.578033],
	[0.616233, 0.197081, 0.565449, 0.000000, 1.000000, 0.000000, 0.679893, 0.562612],
	[0.646039, 0.197081, 0.610058, 0.000000, 1.000000, 0.000000, 0.695320, 0.539532],
	[0.656542, 0.197081, 0.662663, 0.000000, 1.000000, 0.000000, 0.700765, 0.512315],
	[-0.556050, 0.197081, 0.525156, 0.000000, 1.000000, 0.000000, 0.073156, 0.583459],
	[-0.608614, 0.197081, 0.535643, 0.000000, 1.000000, 0.000000, 0.045950, 0.578033],
	[-0.653222, 0.197081, 0.565449, 0.000000, 1.000000, 0.000000, 0.022862, 0.562612],
	[-0.683029, 0.197081, 0.610058, 0.000000, 1.000000, 0.000000, 0.007436, 0.539532],
	[-0.693550, 0.197081, 0.662656, 0.000000, 1.000000, 0.000000, 0.001990, 0.512319],
	[-0.693550, 0.197081, 1.512698, 0.000000, 1.000000, 0.000000, 0.001990, 0.072519],
	[-0.683029, 0.197081, 1.565296, 0.000000, 1.000000, 0.000000, 0.007436, 0.045306],
	[-0.653222, 0.197081, 1.609905, 0.000000, 1.000000, 0.000000, 0.022862, 0.022227],
	[-0.608614, 0.197081, 1.639711, 0.000000, 1.000000, 0.000000, 0.045950, 0.006804],
	[-0.556050, 0.197081, 1.650198, 0.000000, 1.000000, 0.000000, 0.073156, 0.001379],
	[0.519060, 0.197081, 1.650198, 0.000000, 1.000000, 0.000000, 0.629599, 0.001379],
	[0.571624, 0.197081, 1.639711, 0.000000, 1.000000, 0.000000, 0.656805, 0.006804],
	[0.616233, 0.197081, 1.609905, 0.000000, 1.000000, 0.000000, 0.679893, 0.022227],
	[0.646039, 0.197081, 1.565296, 0.000000, 1.000000, 0.000000, 0.695320, 0.045306],
	[0.656560, 0.197081, 1.512698, 0.000000, 1.000000, 0.000000, 0.700765, 0.072519],
	[0.231505, 0.087036, 1.312845, 1.000000, 0.000000, 0.000000, 0.858268, 0.199235],
	[0.231505, 0.062062, -0.287488, 1.000000, 0.000000, 0.000000, 0.872391, 0.580412],
	[0.231505, 0.087036, -0.287488, 1.000000, 0.000000, 0.000000, 0.858268, 0.580412],
	[0.231505, 0.062062, 1.312845, 1.000000, 0.000000, 0.000000, 0.872391, 0.199235],
	[-0.268495, 0.087036, 1.312845, 0.000000, 0.000000, 1.000000, 0.739176, 0.199235],
	[0.231505, 0.062062, 1.312845, 0.000000, 0.000000, 1.000000, 0.858172, 0.179279],
	[0.231505, 0.087036, 1.312845, 0.000000, 0.000000, 1.000000, 0.858268, 0.199235],
	[-0.268495, 0.062062, 1.312845, 0.000000, 0.000000, 1.000000, 0.739112, 0.179279],
	[-0.268495, 0.062062, -0.287488, -1.000000, 0.000000, -0.000000, 0.724978, 0.580412],
	[-0.268495, 0.062062, 1.312845, -1.000000, 0.000000, -0.000000, 0.724978, 0.199235],
	[-0.268495, 0.087036, 1.312845, -1.000000, 0.000000, -0.000000, 0.739176, 0.199235],
	[-0.268495, 0.087036, -0.287488, -1.000000, 0.000000, -0.000000, 0.739176, 0.580412],
	[0.231505, 0.087036, 1.312845, 0.000000, 1.000000, 0.000000, 0.858268, 0.199235],
	[-0.268495, 0.087036, -0.287488, 0.000000, 1.000000, 0.000000, 0.739176, 0.580412],
	[-0.268495, 0.087036, 1.312845, 0.000000, 1.000000, 0.000000, 0.739176, 0.199235],
	[0.231505, 0.087036, -0.287488, 0.000000, 1.000000, 0.000000, 0.858268, 0.580412],
	[0.231505, 0.062062, 1.312845, -0.000000, -1.000000, 0.000000, 0.872391, 0.199235],
	[-0.268495, 0.062062, 1.312845, -0.000000, -1.000000, 0.000000, 0.991483, 0.199235],
	[-0.268495, 0.062062, -0.287488, -0.000000, -1.000000, 0.000000, 0.991483, 0.580412],
	[0.231505, 0.062062, -0.287488, -0.000000, -1.000000, 0.000000, 0.872391, 0.580412],
	[0.108539, 0.197081, 1.035059, 0.165500, 0.983800, -0.068600, 0.987454, 0.119858],
	[-0.018495, 0.222121, 1.087678, 0.000000, 1.000000, 0.000000, 0.910599, 0.088024],
	[0.119006, 0.197081, 1.087678, 0.179200, 0.983800, 0.000000, 0.993786, 0.088024],
	[0.078733, 0.197081, 0.990451, 0.126700, 0.983800, -0.126700, 0.969421, 0.146846],
	[0.034124, 0.197081, 0.960644, 0.068600, 0.983800, -0.165500, 0.942433, 0.164879],
	[-0.018495, 0.197081, 0.950178, -0.000000, 0.983800, -0.179200, 0.910599, 0.171211],
	[-0.071114, 0.197081, 0.960644, -0.068600, 0.983800, -0.165500, 0.878764, 0.164879],
	[-0.115722, 0.197081, 0.990451, -0.126700, 0.983800, -0.126700, 0.851776, 0.146846],
	[-0.145529, 0.197081, 1.035059, -0.165500, 0.983800, -0.068600, 0.833744, 0.119858],
	[-0.155995, 0.197081, 1.087678, -0.179200, 0.983800, 0.000000, 0.827411, 0.088024],
	[-0.145529, 0.197081, 1.140298, -0.165500, 0.983800, 0.068600, 0.833744, 0.056189],
	[-0.115722, 0.197081, 1.184906, -0.126700, 0.983800, 0.126700, 0.851776, 0.029202],
	[-0.071114, 0.197081, 1.214712, -0.068600, 0.983800, 0.165500, 0.878764, 0.011169],
	[-0.018495, 0.197081, 1.225179, -0.000000, 0.983800, 0.179200, 0.910599, 0.004836],
	[0.034124, 0.197081, 1.214712, 0.068600, 0.983800, 0.165500, 0.942433, 0.011169],
	[0.078733, 0.197081, 1.184906, 0.126700, 0.983800, 0.126700, 0.969421, 0.029202],
	[0.108539, 0.197081, 1.140298, 0.165500, 0.983800, 0.068600, 0.987454, 0.056189],
	[0.244005, -0.007938, 1.775178, 1.000000, 0.000000, 0.000000, 0.498307, 0.679381],
	[0.244005, -0.157938, 0.437678, 1.000000, 0.000000, 0.000000, 0.530374, 0.961404],
	[0.244005, -0.007938, 0.437678, 1.000000, 0.000000, 0.000000, 0.498307, 0.961404],
	[0.244005, -0.157938, 1.775178, 1.000000, 0.000000, 0.000000, 0.530374, 0.679381],
	[-0.280995, -0.007938, 1.775178, 0.000000, 0.000000, 1.000000, 0.386403, 0.679381],
	[0.244005, -0.157938, 1.775178, 0.000000, 0.000000, 1.000000, 0.498307, 0.646116],
	[0.244005, -0.007938, 1.775178, 0.000000, 0.000000, 1.000000, 0.498307, 0.679381],
	[-0.280995, -0.157938, 1.775178, 0.000000, 0.000000, 1.000000, 0.386403, 0.646116],
	[-0.280995, -0.157938, 0.437678, -1.000000, 0.000000, -0.000000, 0.354738, 0.961404],
	[-0.280995, -0.157938, 1.775178, -1.000000, 0.000000, -0.000000, 0.354738, 0.679381],
	[-0.280995, -0.007938, 1.775178, -1.000000, 0.000000, -0.000000, 0.386403, 0.679381],
	[-0.280995, -0.007938, 0.437678, -1.000000, 0.000000, -0.000000, 0.386403, 0.961404],
	[0.244005, -0.007938, 1.775178, 0.000000, 1.000000, 0.000000, 0.498307, 0.679381],
	[-0.280995, -0.007938, 0.437678, 0.000000, 1.000000, 0.000000, 0.386403, 0.961404],
	[-0.280995, -0.007938, 1.775178, 0.000000, 1.000000, 0.000000, 0.386403, 0.679381],
	[0.244005, -0.007938, 0.437678, 0.000000, 1.000000, 0.000000, 0.498307, 0.961404],
	[-0.280995, -0.157938, 0.437678, 0.000000, 0.000000, -1.000000, 0.386403, 0.993296],
	[-0.280995, -0.007938, 0.437678, 0.000000, 0.000000, -1.000000, 0.386403, 0.961404],
	[0.244005, -0.157938, 0.437678, 0.000000, 0.000000, -1.000000, 0.498307, 0.993296],
	[0.244005, -0.007938, 0.437678, 0.000000, 0.000000, -1.000000, 0.498307, 0.961404],
	[0.256505, -0.157938, 1.787678, 1.000000, 0.000000, 0.000000, 0.572135, 0.851701],
	[0.256505, -0.207938, -0.287322, 1.000000, 0.000000, 0.000000, 0.995664, 0.829507],
	[0.256505, -0.157938, -0.287322, 1.000000, 0.000000, 0.000000, 0.995664, 0.851701],
	[0.256505, -0.207938, 1.787678, 1.000000, 0.000000, 0.000000, 0.572135, 0.829507],
	[-0.293495, -0.157938, 1.787678, 0.000000, 0.000000, 1.000000, 0.572135, 0.975116],
	[0.256505, -0.207938, 1.787678, 0.000000, 0.000000, 1.000000, 0.551487, 0.851701],
	[0.256505, -0.157938, 1.787678, 0.000000, 0.000000, 1.000000, 0.572135, 0.851701],
	[-0.293495, -0.207938, 1.787678, 0.000000, 0.000000, 1.000000, 0.551487, 0.975116],
	[-0.293495, -0.207938, -0.287322, -1.000000, 0.000000, -0.000000, 0.995664, 0.996290],
	[-0.293495, -0.207938, 1.787678, -1.000000, 0.000000, -0.000000, 0.572135, 0.996290],
	[-0.293495, -0.157938, 1.787678, -1.000000, 0.000000, -0.000000, 0.572135, 0.975116],
	[-0.293495, -0.157938, -0.287322, -1.000000, 0.000000, -0.000000, 0.995664, 0.975116],
	[0.256505, -0.157938, 1.787678, 0.000000, 1.000000, 0.000000, 0.572135, 0.851701],
	[-0.293495, -0.157938, -0.287322, 0.000000, 1.000000, 0.000000, 0.995664, 0.975116],
	[-0.293495, -0.157938, 1.787678, 0.000000, 1.000000, 0.000000, 0.572135, 0.975116],
	[0.256505, -0.157938, -0.287322, 0.000000, 1.000000, 0.000000, 0.995664, 0.851701],
	[0.256505, -0.207938, 1.787678, -0.000000, -1.000000, 0.000000, 0.572135, 0.829507],
	[-0.293495, -0.207938, 1.787678, -0.000000, -1.000000, 0.000000, 0.572135, 0.706020],
	[-0.293495, -0.207938, -0.287322, -0.000000, -1.000000, 0.000000, 0.995664, 0.706020],
	[0.256505, -0.207938, -0.287322, -0.000000, -1.000000, 0.000000, 0.995664, 0.829507],
];

const indexes = [
	84, 85, 86,
	84, 87, 85,
	0, 1, 2,
	0, 20, 1,
	3, 0, 2,
	1, 20, 21,
	33, 3, 2,
	20, 18, 21,
	33, 32, 3,
	21, 18, 19,
	31, 32, 33,
	18, 16, 19,
	31, 30, 32,
	19, 16, 17,
	29, 30, 31,
	16, 15, 17,
	29, 28, 30,
	17, 15, 12,
	8, 28, 29,
	12, 15, 13,
	8, 10, 28,
	12, 13, 14,
	8, 9, 10,
	10, 9, 11,
	14, 13, 22,
	14, 22, 23,
	23, 22, 24,
	23, 24, 25,
	25, 24, 26,
	25, 26, 27,
	27, 26, 5,
	27, 5, 4,
	4, 5, 6,
	7, 4, 6,
	6, 40, 7,
	7, 40, 41,
	40, 38, 41,
	41, 38, 39,
	38, 34, 39,
	39, 34, 36,
	34, 35, 36,
	36, 35, 37,
	42, 43, 44,
	43, 42, 45,
	43, 48, 44,
	43, 45, 46,
	48, 43, 49,
	43, 46, 47,
	49, 43, 50,
	43, 47, 62,
	50, 43, 51,
	61, 43, 62,
	43, 52, 51,
	60, 43, 61,
	52, 43, 53,
	59, 43, 60,
	53, 43, 54,
	58, 43, 59,
	54, 43, 55,
	57, 43, 58,
	55, 43, 56,
	56, 43, 57,
	63, 64, 65,
	63, 69, 64,
	66, 65, 64,
	70, 64, 69,
	67, 66, 64,
	71, 64, 70,
	68, 67, 64,
	72, 64, 71,
	83, 68, 64,
	72, 73, 64,
	83, 64, 82,
	74, 64, 73,
	82, 64, 81,
	75, 64, 74,
	81, 64, 80,
	76, 64, 75,
	80, 64, 79,
	77, 64, 76,
	79, 64, 78,
	78, 64, 77,
	88, 89, 90,
	88, 91, 89,
	92, 93, 94,
	95, 92, 94,
	96, 97, 98,
	96, 99, 97,
	100, 101, 102,
	103, 100, 102,
	104, 105, 106,
	107, 105, 104,
	106, 105, 120,
	108, 105, 107,
	120, 105, 119,
	109, 105, 108,
	119, 105, 118,
	110, 105, 109,
	118, 105, 117,
	111, 105, 110,
	117, 105, 116,
	112, 105, 111,
	116, 105, 115,
	113, 105, 112,
	115, 105, 114,
	114, 105, 113,
	121, 122, 123,
	121, 124, 122,
	125, 126, 127,
	125, 128, 126,
	129, 130, 131,
	132, 129, 131,
	133, 134, 135,
	133, 136, 134,
	137, 138, 139,
	140, 139, 138,
	141, 142, 143,
	141, 144, 142,
	145, 146, 147,
	145, 148, 146,
	149, 150, 151,
	152, 149, 151,
	153, 154, 155,
	153, 156, 154,
	157, 158, 159,
	160, 157, 159,
];

export const hitTargetRectangleMesh = Mesh.fromArray(vertices, indexes);
