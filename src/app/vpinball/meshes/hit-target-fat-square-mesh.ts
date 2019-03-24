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
	[0.232901, -0.011557, 1.647248, 1.000000, 0.000000, -0.000000, 0.878684, 0.235616],
	[0.232901, -0.161552, 0.709748, 1.000000, 0.000000, -0.000000, 0.910751, 0.540358],
	[0.232901, -0.011557, 0.709748, 1.000000, 0.000000, -0.000000, 0.878684, 0.540358],
	[0.232901, -0.161552, 1.647248, 1.000000, 0.000000, -0.000000, 0.910751, 0.235616],
	[-0.267099, -0.011557, 1.647248, -0.000000, 0.000000, 1.000000, 0.766781, 0.235616],
	[0.232901, -0.161552, 1.647248, -0.000000, 0.000000, 1.000000, 0.878684, 0.199672],
	[0.232901, -0.011557, 1.647248, -0.000000, 0.000000, 1.000000, 0.878684, 0.235616],
	[-0.267099, -0.161552, 1.647248, -0.000000, 0.000000, 1.000000, 0.766781, 0.199672],
	[-0.267099, -0.161552, 0.709748, -1.000000, 0.000000, -0.000000, 0.735116, 0.540358],
	[-0.267099, -0.161552, 1.647248, -1.000000, 0.000000, -0.000000, 0.735116, 0.235616],
	[-0.267099, -0.011557, 1.647248, -1.000000, 0.000000, -0.000000, 0.766781, 0.235616],
	[-0.267099, -0.011557, 0.709748, -1.000000, 0.000000, -0.000000, 0.766781, 0.540358],
	[0.232901, -0.011557, 1.647248, 0.000000, 1.000000, -0.000000, 0.878684, 0.235616],
	[-0.267099, -0.011557, 0.709748, 0.000000, 1.000000, -0.000000, 0.766781, 0.540358],
	[-0.267099, -0.011557, 1.647248, 0.000000, 1.000000, -0.000000, 0.766781, 0.235616],
	[0.232901, -0.011557, 0.709748, 0.000000, 1.000000, -0.000000, 0.878684, 0.540358],
	[-0.267099, -0.161552, 0.709748, 0.000000, 0.000000, -1.000000, 0.766781, 0.574820],
	[-0.267099, -0.011557, 0.709748, 0.000000, 0.000000, -1.000000, 0.766781, 0.540358],
	[0.232901, -0.161552, 0.709748, 0.000000, 0.000000, -1.000000, 0.878684, 0.574820],
	[0.232901, -0.011557, 0.709748, 0.000000, 0.000000, -1.000000, 0.878684, 0.540358],
	[0.245401, -0.161552, 1.659748, 1.000000, 0.000000, -0.000000, 0.967616, 0.925422],
	[0.245401, -0.211551, -0.102752, 1.000000, 0.000000, -0.000000, 0.574145, 0.933867],
	[0.245401, -0.161552, -0.102752, 1.000000, 0.000000, -0.000000, 0.574145, 0.925422],
	[0.245401, -0.211551, 1.659748, 1.000000, 0.000000, -0.000000, 0.967616, 0.933867],
	[-0.279599, -0.161552, 1.659748, -0.000000, 0.000000, 1.000000, 0.967616, 0.869199],
	[0.245401, -0.211551, 1.659748, -0.000000, 0.000000, 1.000000, 0.986802, 0.925422],
	[0.245401, -0.161552, 1.659748, -0.000000, 0.000000, 1.000000, 0.967616, 0.925422],
	[-0.279599, -0.211551, 1.659748, -0.000000, 0.000000, 1.000000, 0.986802, 0.869199],
	[-0.279599, -0.211551, -0.102752, -1.000000, 0.000000, -0.000000, 0.574145, 0.860995],
	[-0.279599, -0.211551, 1.659748, -1.000000, 0.000000, -0.000000, 0.967616, 0.860995],
	[-0.279599, -0.161552, 1.659748, -1.000000, 0.000000, -0.000000, 0.967616, 0.869199],
	[-0.279599, -0.161552, -0.102752, -1.000000, 0.000000, -0.000000, 0.574145, 0.869199],
	[0.245401, -0.161552, 1.659748, 0.000000, 1.000000, -0.000000, 0.967616, 0.925422],
	[-0.279599, -0.161552, -0.102752, 0.000000, 1.000000, -0.000000, 0.574145, 0.869199],
	[-0.279599, -0.161552, 1.659748, 0.000000, 1.000000, -0.000000, 0.967616, 0.869199],
	[0.245401, -0.161552, -0.102752, 0.000000, 1.000000, -0.000000, 0.574145, 0.925422],
	[0.245401, -0.211551, 1.659748, 0.000000, -1.000000, 0.000000, 0.967616, 0.933867],
	[-0.279599, -0.211551, 1.659748, 0.000000, -1.000000, 0.000000, 0.967616, 0.990129],
	[-0.279599, -0.211551, -0.102752, 0.000000, -1.000000, 0.000000, 0.574145, 0.990129],
	[0.245401, -0.211551, -0.102752, 0.000000, -1.000000, 0.000000, 0.574145, 0.933867],
	[0.232901, 0.163437, 1.447248, 1.000000, 0.000000, -0.000000, 0.928326, 0.785638],
	[0.232901, 0.113439, -0.102752, 1.000000, 0.000000, -0.000000, 0.574145, 0.794083],
	[0.232901, 0.163437, -0.102752, 1.000000, 0.000000, -0.000000, 0.574145, 0.785638],
	[0.232901, 0.113439, 1.447248, 1.000000, 0.000000, -0.000000, 0.928326, 0.794083],
	[-0.267099, 0.163437, 1.447248, -0.000000, 0.000000, 1.000000, 0.928326, 0.729415],
	[0.232901, 0.113439, 1.447248, -0.000000, 0.000000, 1.000000, 0.946869, 0.785638],
	[0.232901, 0.163437, 1.447248, -0.000000, 0.000000, 1.000000, 0.928326, 0.785638],
	[-0.267099, 0.113439, 1.447248, -0.000000, 0.000000, 1.000000, 0.946869, 0.729415],
	[-0.267099, 0.113439, -0.102752, -1.000000, 0.000000, -0.000000, 0.574145, 0.721211],
	[-0.267099, 0.113439, 1.447248, -1.000000, 0.000000, -0.000000, 0.928326, 0.721211],
	[-0.267099, 0.163437, 1.447248, -1.000000, 0.000000, -0.000000, 0.928326, 0.729415],
	[-0.267099, 0.163437, -0.102752, -1.000000, 0.000000, -0.000000, 0.574145, 0.729415],
	[0.232901, 0.163437, 1.447248, 0.000000, 1.000000, -0.000000, 0.928326, 0.785638],
	[-0.267099, 0.163437, -0.102752, 0.000000, 1.000000, -0.000000, 0.574145, 0.729415],
	[-0.267099, 0.163437, 1.447248, 0.000000, 1.000000, -0.000000, 0.928326, 0.729415],
	[0.232901, 0.163437, -0.102752, 0.000000, 1.000000, -0.000000, 0.574145, 0.785638],
	[0.232901, 0.113439, 1.447248, 0.000000, -1.000000, 0.000000, 0.928326, 0.794083],
	[-0.267099, 0.113439, 1.447248, 0.000000, -1.000000, 0.000000, 0.928326, 0.850345],
	[-0.267099, 0.113439, -0.102752, 0.000000, -1.000000, 0.000000, 0.574145, 0.850345],
	[0.232901, 0.113439, -0.102752, 0.000000, -1.000000, 0.000000, 0.574145, 0.794083],
	[-0.567099, 0.200039, 1.697248, -0.514000, 0.854900, 0.069800, 0.120328, 0.094287],
	[-0.560400, 0.200039, 1.722248, -0.459800, 0.847400, 0.265400, 0.122950, 0.084503],
	[-0.517099, 0.213436, 1.697248, -0.108700, 0.988100, 0.108700, 0.139896, 0.094287],
	[-0.542099, 0.200039, 1.740549, -0.265400, 0.847400, 0.459800, 0.130112, 0.077341],
	[-0.517099, 0.200039, 1.747248, -0.069800, 0.854900, 0.514000, 0.139896, 0.074719],
	[-0.592099, 0.163437, 1.740549, -0.758600, 0.482300, 0.438000, 0.110544, 0.077341],
	[-0.603701, 0.163437, 1.697248, -0.865300, 0.488300, 0.112900, 0.106003, 0.094287],
	[-0.603701, 0.113439, 1.747248, -0.858900, 0.127800, 0.495900, 0.101412, 0.070414],
	[-0.617099, 0.113439, 1.697248, -0.983400, 0.128100, 0.128100, 0.096064, 0.090373],
	[-0.567099, 0.113439, 1.783850, -0.495900, 0.127800, 0.858900, 0.116023, 0.055803],
	[-0.560400, 0.163437, 1.772248, -0.438000, 0.482300, 0.758600, 0.122950, 0.064935],
	[-0.517099, 0.163437, 1.783850, -0.112900, 0.488300, 0.865300, 0.139896, 0.060394],
	[-0.517099, 0.113439, 1.797248, -0.128100, 0.128100, 0.983400, 0.135983, 0.050454],
	[0.109935, 0.188437, 1.144629, 0.165400, 0.983900, -0.068500, 0.987454, 0.119858],
	[-0.017099, 0.213450, 1.197248, 0.000000, 1.000000, -0.000000, 0.910599, 0.088024],
	[0.120402, 0.188437, 1.197248, 0.179000, 0.983900, -0.000000, 0.993786, 0.088024],
	[0.080129, 0.188437, 1.100020, 0.126600, 0.983900, -0.126600, 0.969421, 0.146846],
	[0.035521, 0.188437, 1.070214, 0.068500, 0.983900, -0.165400, 0.942433, 0.164879],
	[-0.017099, 0.188437, 1.059747, -0.000000, 0.983900, -0.179000, 0.910599, 0.171211],
	[-0.069718, 0.188437, 1.070214, -0.068500, 0.983900, -0.165400, 0.878764, 0.164879],
	[-0.114326, 0.188437, 1.100020, -0.126600, 0.983900, -0.126600, 0.851776, 0.146846],
	[-0.144133, 0.188437, 1.144629, -0.165400, 0.983900, -0.068500, 0.833744, 0.119858],
	[-0.154599, 0.188437, 1.197248, -0.179000, 0.983900, -0.000000, 0.827411, 0.088024],
	[-0.144133, 0.188437, 1.249867, -0.165400, 0.983900, 0.068500, 0.833744, 0.056189],
	[-0.114326, 0.188437, 1.294476, -0.126600, 0.983900, 0.126600, 0.851776, 0.029202],
	[-0.069718, 0.188437, 1.324282, -0.068500, 0.983900, 0.165400, 0.878764, 0.011169],
	[-0.017099, 0.188437, 1.334749, -0.000000, 0.983900, 0.179000, 0.910599, 0.004836],
	[0.035521, 0.188437, 1.324282, 0.068500, 0.983900, 0.165400, 0.942433, 0.011169],
	[0.080129, 0.188437, 1.294476, 0.126600, 0.983900, 0.126600, 0.969421, 0.029202],
	[0.109935, 0.188437, 1.249867, 0.165400, 0.983900, 0.068500, 0.987454, 0.056189],
	[0.122956, 0.213411, 1.139235, -0.804600, 0.491500, 0.333300, 0.390390, 0.312673],
	[0.109935, 0.188437, 1.144629, -0.804600, 0.491500, 0.333300, 0.385294, 0.310562],
	[0.120402, 0.188437, 1.197248, -0.870900, 0.491500, 0.000000, 0.389391, 0.289969],
	[0.134496, 0.213411, 1.197248, -0.870900, 0.491500, 0.000000, 0.394907, 0.289969],
	[0.090095, 0.213411, 1.090055, -0.615800, 0.491500, 0.615800, 0.377530, 0.331920],
	[0.080129, 0.188437, 1.100020, -0.615800, 0.491500, 0.615800, 0.373629, 0.328020],
	[0.040914, 0.213411, 1.057193, -0.333300, 0.491500, 0.804600, 0.358282, 0.344781],
	[0.035521, 0.188437, 1.070214, -0.333300, 0.491500, 0.804600, 0.356171, 0.339685],
	[-0.017099, 0.213411, 1.045653, 0.000000, 0.491500, 0.870900, 0.335578, 0.349297],
	[-0.017099, 0.188437, 1.059747, 0.000000, 0.491500, 0.870900, 0.335578, 0.343781],
	[-0.075111, 0.213411, 1.057193, 0.333300, 0.491500, 0.804600, 0.312874, 0.344781],
	[-0.069718, 0.188437, 1.070214, 0.333300, 0.491500, 0.804600, 0.314985, 0.339685],
	[-0.124292, 0.213411, 1.090055, 0.615800, 0.491500, 0.615800, 0.293627, 0.331920],
	[-0.114326, 0.188437, 1.100020, 0.615800, 0.491500, 0.615800, 0.297527, 0.328020],
	[-0.157154, 0.213411, 1.139235, 0.804600, 0.491500, 0.333300, 0.280766, 0.312673],
	[-0.144133, 0.188437, 1.144629, 0.804600, 0.491500, 0.333300, 0.285862, 0.310562],
	[-0.168693, 0.213411, 1.197248, 0.870900, 0.491500, 0.000000, 0.276250, 0.289969],
	[-0.154599, 0.188437, 1.197248, 0.870900, 0.491500, 0.000000, 0.281765, 0.289969],
	[-0.157154, 0.213411, 1.255261, 0.804600, 0.491500, -0.333300, 0.280766, 0.267265],
	[-0.144133, 0.188437, 1.249867, 0.804600, 0.491500, -0.333300, 0.285862, 0.269376],
	[-0.124292, 0.213411, 1.304441, 0.615800, 0.491500, -0.615800, 0.293627, 0.248017],
	[-0.114326, 0.188437, 1.294476, 0.615800, 0.491500, -0.615800, 0.297527, 0.251918],
	[-0.075111, 0.213411, 1.337303, 0.333300, 0.491500, -0.804600, 0.312874, 0.235156],
	[-0.069718, 0.188437, 1.324282, 0.333300, 0.491500, -0.804600, 0.314985, 0.240252],
	[-0.017099, 0.213411, 1.348842, -0.000000, 0.491500, -0.870900, 0.335578, 0.230640],
	[-0.017099, 0.188437, 1.334749, -0.000000, 0.491500, -0.870900, 0.335578, 0.236156],
	[0.040914, 0.213411, 1.337303, -0.333300, 0.491500, -0.804600, 0.358282, 0.235156],
	[0.035521, 0.188437, 1.324282, -0.333300, 0.491500, -0.804600, 0.356171, 0.240252],
	[0.090095, 0.213411, 1.304441, -0.615800, 0.491500, -0.615800, 0.377530, 0.248017],
	[0.080129, 0.188437, 1.294476, -0.615800, 0.491500, -0.615800, 0.373629, 0.251918],
	[0.122956, 0.213411, 1.255261, -0.804600, 0.491500, -0.333300, 0.390390, 0.267265],
	[0.109935, 0.188437, 1.249867, -0.804600, 0.491500, -0.333300, 0.385294, 0.269376],
	[-0.168693, 0.213411, 1.197248, 0.000100, 1.000000, 0.000000, 0.276250, 0.289969],
	[-0.517099, 0.213436, 0.697248, -0.108700, 0.988100, -0.108700, 0.139896, 0.485650],
	[-0.017099, 0.213411, 1.348842, -0.000000, 1.000000, -0.000100, 0.335578, 0.230640],
	[0.482901, 0.213436, 1.697248, 0.108700, 0.988100, 0.108700, 0.531260, 0.094287],
	[0.134496, 0.213411, 1.197248, -0.000100, 1.000000, 0.000000, 0.394907, 0.289969],
	[0.482901, 0.213436, 0.697248, 0.108700, 0.988100, -0.108700, 0.531260, 0.485650],
	[-0.017099, 0.213411, 1.045653, 0.000000, 1.000000, 0.000100, 0.335578, 0.349297],
	[-0.157154, 0.213411, 1.139235, 0.000000, 1.000000, -0.000000, 0.280766, 0.312673],
	[-0.124292, 0.213411, 1.090055, 0.000000, 1.000000, -0.000000, 0.293627, 0.331920],
	[-0.075111, 0.213411, 1.057193, 0.000000, 1.000000, -0.000000, 0.312874, 0.344781],
	[0.040914, 0.213411, 1.057193, 0.000000, 1.000000, -0.000000, 0.358282, 0.344781],
	[0.090095, 0.213411, 1.090055, 0.000000, 1.000000, -0.000000, 0.377530, 0.331920],
	[0.122956, 0.213411, 1.139235, 0.000000, 1.000000, -0.000000, 0.390390, 0.312673],
	[0.122956, 0.213411, 1.255261, 0.000000, 1.000000, -0.000000, 0.390390, 0.267265],
	[0.090095, 0.213411, 1.304441, 0.000000, 1.000000, -0.000000, 0.377530, 0.248017],
	[0.040914, 0.213411, 1.337303, 0.000000, 1.000000, -0.000000, 0.358282, 0.235156],
	[-0.075111, 0.213411, 1.337303, 0.000000, 1.000000, -0.000000, 0.312874, 0.235156],
	[-0.124292, 0.213411, 1.304441, 0.000000, 1.000000, -0.000000, 0.293627, 0.248017],
	[-0.157154, 0.213411, 1.255261, 0.000000, 1.000000, -0.000000, 0.280766, 0.267265],
	[0.482901, 0.200039, 1.747248, 0.069800, 0.854900, 0.514000, 0.531260, 0.074719],
	[0.482901, 0.163437, 1.783850, 0.112900, 0.488300, 0.865300, 0.531260, 0.060394],
	[0.482901, 0.113439, 1.797248, 0.128100, 0.128100, 0.983400, 0.535173, 0.050454],
	[-0.567099, 0.200039, 0.697248, -0.514000, 0.854900, -0.069800, 0.120328, 0.485650],
	[-0.617099, 0.113439, 0.697248, -0.983400, 0.128100, -0.128100, 0.096064, 0.489564],
	[-0.603701, 0.163437, 0.697248, -0.865300, 0.488300, -0.112900, 0.106003, 0.485650],
	[0.526203, 0.200039, 1.722248, 0.459800, 0.847400, 0.265400, 0.548206, 0.084503],
	[0.532901, 0.200039, 1.697248, 0.514000, 0.854900, 0.069800, 0.550828, 0.094287],
	[0.507901, 0.200039, 1.740549, 0.265400, 0.847400, 0.459800, 0.541044, 0.077341],
	[0.582901, 0.113439, 1.697248, 0.983400, 0.128100, 0.128100, 0.575093, 0.090373],
	[0.569504, 0.163437, 1.697248, 0.865300, 0.488300, 0.112900, 0.565153, 0.094287],
	[0.557901, 0.163437, 1.740549, 0.758600, 0.482300, 0.438000, 0.560612, 0.077341],
	[0.569504, 0.113439, 1.747248, 0.858900, 0.127800, 0.495900, 0.569744, 0.070414],
	[0.526203, 0.163437, 1.772248, 0.438000, 0.482300, 0.758600, 0.548206, 0.064935],
	[0.532901, 0.113439, 1.783850, 0.495900, 0.127800, 0.858900, 0.555133, 0.055803],
	[0.532901, 0.200039, 0.697248, 0.514000, 0.854900, -0.069800, 0.550828, 0.485650],
	[0.582901, 0.113439, 0.697248, 0.983400, 0.128100, -0.128100, 0.575093, 0.489564],
	[0.569504, 0.163437, 0.697248, 0.865300, 0.488300, -0.112900, 0.565153, 0.485650],
	[-0.560400, 0.200039, 0.672248, -0.459800, 0.847400, -0.265400, 0.122950, 0.495435],
	[-0.542099, 0.200039, 0.653947, -0.265400, 0.847400, -0.459800, 0.130112, 0.502597],
	[-0.517099, 0.200039, 0.647248, -0.069800, 0.854900, -0.514000, 0.139896, 0.505219],
	[-0.592099, 0.163437, 0.653947, -0.758600, 0.482300, -0.438000, 0.110544, 0.502597],
	[-0.603701, 0.113439, 0.647248, -0.858900, 0.127800, -0.495900, 0.101412, 0.509524],
	[-0.560400, 0.163437, 0.622248, -0.438000, 0.482300, -0.758600, 0.122950, 0.515003],
	[-0.567099, 0.113439, 0.610645, -0.495900, 0.127800, -0.858900, 0.116023, 0.524135],
	[-0.517099, 0.163437, 0.610645, -0.112900, 0.488300, -0.865300, 0.139896, 0.519543],
	[-0.517099, 0.113439, 0.597248, -0.128100, 0.128100, -0.983400, 0.135983, 0.529483],
	[0.482901, 0.200039, 0.647248, 0.069800, 0.854900, -0.514000, 0.531260, 0.505219],
	[-0.292099, 0.163437, 0.610645, 0.000000, 0.575100, -0.818100, 0.228009, 0.519543],
	[-0.292099, 0.113439, 0.597248, -0.000000, 0.130500, -0.991400, 0.228009, 0.529483],
	[0.526203, 0.200039, 0.672248, 0.459800, 0.847400, -0.265400, 0.548206, 0.495435],
	[0.507901, 0.200039, 0.653947, 0.265400, 0.847400, -0.459800, 0.541044, 0.502597],
	[0.557901, 0.163437, 0.653947, 0.758600, 0.482300, -0.438000, 0.560612, 0.502597],
	[0.569504, 0.113439, 0.647248, 0.858900, 0.127800, -0.495900, 0.569744, 0.509524],
	[0.532901, 0.113439, 0.610645, 0.495900, 0.127800, -0.858900, 0.555133, 0.524135],
	[0.526203, 0.163437, 0.622248, 0.438000, 0.482300, -0.758600, 0.548206, 0.515003],
	[0.482901, 0.163437, 0.610645, 0.112900, 0.488300, -0.865300, 0.531260, 0.519543],
	[0.482901, 0.113439, 0.597248, 0.128100, 0.128100, -0.983400, 0.535173, 0.529483],
	[0.482901, -0.236550, 1.797248, 0.130500, 0.000000, 0.991400, 0.565113, 0.014527],
	[-0.517099, -0.236550, 1.797248, -0.130500, 0.000000, 0.991400, 0.106044, 0.014527],
	[-0.617099, -0.236550, 1.697248, -0.991400, 0.000000, 0.130500, 0.060137, 0.060434],
	[-0.617099, -0.236550, 0.697248, -0.991400, 0.000000, -0.130500, 0.060137, 0.519503],
	[0.582901, -0.236550, 1.697248, 0.991400, 0.000000, 0.130500, 0.611020, 0.060434],
	[0.569504, -0.236550, 1.747248, 0.866000, 0.000000, 0.500000, 0.604869, 0.037481],
	[0.532901, -0.236550, 1.783850, 0.500000, 0.000000, 0.866000, 0.588066, 0.020678],
	[0.582901, -0.236550, 0.697248, 0.991400, 0.000000, -0.130500, 0.611020, 0.519503],
	[0.482901, -0.236550, 0.597248, 0.130500, 0.000000, -0.991400, 0.565113, 0.565410],
	[0.257901, -0.236550, 0.597248, 0.000000, 0.000000, -1.000000, 0.461822, 0.565410],
	[0.257901, 0.113439, 0.597248, -0.000000, 0.130500, -0.991400, 0.443203, 0.529483],
	[0.257901, 0.163437, 0.610645, 0.000000, 0.575100, -0.818100, 0.443203, 0.519543],
	[-0.517099, -0.236550, 0.597248, -0.130500, 0.000000, -0.991400, 0.106044, 0.565410],
	[-0.292099, -0.236550, 0.597248, 0.000000, 0.000000, -1.000000, 0.209334, 0.565410],
	[0.482901, -0.236550, 1.747248, 0.000000, -1.000000, 0.000000, 0.057297, 0.744448],
	[0.482901, -0.236550, 1.797248, 0.000000, -1.000000, 0.000000, 0.057297, 0.733725],
	[-0.517099, -0.236550, 1.797248, 0.000000, -1.000000, 0.000000, 0.271764, 0.733725],
	[-0.517099, -0.236550, 1.747248, 0.000000, -1.000000, 0.000000, 0.271764, 0.744448],
	[-0.567099, -0.236550, 1.697248, 0.000000, -1.000000, 0.000000, 0.282488, 0.755172],
	[-0.617099, -0.236550, 1.697248, 0.000000, -1.000000, 0.000000, 0.293211, 0.755172],
	[-0.617099, -0.236550, 0.697248, 0.000000, -1.000000, 0.000000, 0.293211, 0.969639],
	[-0.567099, -0.236550, 0.697248, 0.000000, -1.000000, 0.000000, 0.282488, 0.969639],
	[0.532901, -0.236550, 1.697248, 0.000000, -1.000000, 0.000000, 0.046574, 0.755172],
	[0.582901, -0.236550, 1.697248, 0.000000, -1.000000, 0.000000, 0.035850, 0.755172],
	[0.569504, -0.236550, 1.747248, 0.000000, -1.000000, 0.000000, 0.038724, 0.744448],
	[0.526203, -0.236550, 1.722248, 0.000000, -1.000000, 0.000000, 0.048010, 0.749810],
	[0.532901, -0.236550, 1.783850, 0.000000, -1.000000, 0.000000, 0.046574, 0.736598],
	[0.507901, -0.236550, 1.740549, 0.000000, -1.000000, 0.000000, 0.051935, 0.745885],
	[0.532901, -0.236550, 0.697248, 0.000000, -1.000000, 0.000000, 0.046574, 0.969639],
	[0.582901, -0.236550, 0.697248, 0.000000, -1.000000, 0.000000, 0.035850, 0.969639],
	[0.257901, -0.236550, 0.647248, 0.000000, -1.000000, 0.000000, 0.105552, 0.980362],
	[0.257901, -0.236550, 0.597248, 0.000000, -1.000000, 0.000000, 0.105552, 0.991086],
	[0.482901, -0.236550, 0.597248, 0.000000, -1.000000, 0.000000, 0.057297, 0.991086],
	[0.482901, -0.236550, 0.647248, 0.000000, -1.000000, 0.000000, 0.057297, 0.980362],
	[-0.517099, -0.236550, 0.647248, 0.000000, -1.000000, 0.000000, 0.271764, 0.980362],
	[-0.517099, -0.236550, 0.597248, 0.000000, -1.000000, 0.000000, 0.271764, 0.991086],
	[-0.292099, -0.236550, 0.597248, 0.000000, -1.000000, 0.000000, 0.223509, 0.991086],
	[-0.292099, -0.236550, 0.647248, 0.000000, -1.000000, 0.000000, 0.223509, 0.980362],
	[-0.603701, -0.236550, 1.747248, -0.866000, 0.000000, 0.500000, 0.066287, 0.037481],
	[-0.567099, -0.236550, 1.783850, -0.500000, 0.000000, 0.866000, 0.083090, 0.020678],
	[-0.603701, -0.236550, 1.747248, 0.000000, -1.000000, 0.000000, 0.290338, 0.744448],
	[-0.560400, -0.236550, 1.722248, 0.000000, -1.000000, 0.000000, 0.281051, 0.749810],
	[-0.542099, -0.236550, 1.740549, 0.000000, -1.000000, 0.000000, 0.277126, 0.745885],
	[-0.567099, -0.236550, 1.783850, 0.000000, -1.000000, 0.000000, 0.282488, 0.736598],
	[0.569504, -0.236550, 0.647248, 0.866000, 0.000000, -0.500000, 0.604869, 0.542457],
	[0.532901, -0.236550, 0.610645, 0.500000, 0.000000, -0.866000, 0.588066, 0.559260],
	[0.569504, -0.236550, 0.647248, 0.000000, -1.000000, 0.000000, 0.038724, 0.980362],
	[0.526203, -0.236550, 0.672248, 0.000000, -1.000000, 0.000000, 0.048010, 0.975001],
	[0.507901, -0.236550, 0.653947, 0.000000, -1.000000, 0.000000, 0.051935, 0.978926],
	[0.532901, -0.236550, 0.610645, 0.000000, -1.000000, 0.000000, 0.046574, 0.988212],
	[-0.603701, -0.236550, 0.647248, -0.866000, 0.000000, -0.500000, 0.066287, 0.542457],
	[-0.567099, -0.236550, 0.610645, -0.500000, 0.000000, -0.866000, 0.083090, 0.559260],
	[-0.603701, -0.236550, 0.647248, 0.000000, -1.000000, 0.000000, 0.290338, 0.980362],
	[-0.560400, -0.236550, 0.672248, 0.000000, -1.000000, 0.000000, 0.281051, 0.975001],
	[-0.567099, -0.236550, 0.610645, 0.000000, -1.000000, 0.000000, 0.282488, 0.988212],
	[-0.542099, -0.236550, 0.653947, 0.000000, -1.000000, 0.000000, 0.277126, 0.978926],
	[0.482901, 0.163437, 1.747248, -0.130500, 0.000000, -0.991400, 0.073112, 0.761845],
	[0.482901, -0.236550, 1.747248, -0.130500, 0.000000, -0.991400, 0.057297, 0.744448],
	[-0.517099, -0.236550, 1.747248, 0.130500, 0.000000, -0.991400, 0.271764, 0.744448],
	[-0.517099, 0.163437, 1.747248, 0.130500, 0.000000, -0.991400, 0.255949, 0.761845],
	[-0.567099, 0.163437, 1.697248, 0.991400, 0.000000, -0.130500, 0.265091, 0.770987],
	[-0.567099, -0.236550, 1.697248, 0.991400, 0.000000, -0.130500, 0.282488, 0.755172],
	[-0.567099, -0.236550, 0.697248, 0.991400, 0.000000, 0.130500, 0.282488, 0.969639],
	[-0.567099, 0.163437, 0.697248, 0.991400, 0.000000, 0.130500, 0.265091, 0.953824],
	[0.532901, 0.163437, 1.697248, -0.991400, 0.000000, -0.130500, 0.063970, 0.770987],
	[0.532901, -0.236550, 1.697248, -0.991400, 0.000000, -0.130500, 0.046574, 0.755172],
	[0.526203, -0.236550, 1.722248, -0.866000, 0.000000, -0.500000, 0.048010, 0.749810],
	[0.526203, 0.163437, 1.722248, -0.866000, 0.000000, -0.500000, 0.065195, 0.766416],
	[0.532901, 0.163437, 0.697248, -0.991400, 0.000000, 0.130500, 0.063970, 0.953824],
	[0.532901, -0.236550, 0.697248, -0.991400, 0.000000, 0.130500, 0.046574, 0.969639],
	[0.257901, 0.113439, 0.597248, -1.000000, 0.000000, -0.000000, 0.114251, 0.972107],
	[0.257901, -0.236550, 0.597248, -1.000000, 0.000000, -0.000000, 0.105552, 0.991086],
	[0.257901, -0.236550, 0.647248, -1.000000, 0.000000, -0.000000, 0.105552, 0.980362],
	[0.257901, 0.163437, 0.647248, -1.000000, 0.000000, -0.000000, 0.114251, 0.962965],
	[0.257901, 0.163437, 0.647248, -0.000000, 0.000000, 1.000000, 0.114251, 0.962965],
	[0.257901, -0.236550, 0.647248, -0.000000, 0.000000, 1.000000, 0.105552, 0.980362],
	[0.482901, -0.236550, 0.647248, -0.130500, 0.000000, 0.991400, 0.057297, 0.980362],
	[0.482901, 0.163437, 0.647248, -0.130500, 0.000000, 0.991400, 0.073112, 0.962965],
	[-0.517099, 0.163437, 0.647248, 0.130500, 0.000000, 0.991400, 0.255949, 0.962965],
	[-0.517099, -0.236550, 0.647248, 0.130500, 0.000000, 0.991400, 0.271764, 0.980362],
	[-0.292099, -0.236550, 0.647248, -0.000000, 0.000000, 1.000000, 0.223509, 0.980362],
	[-0.292099, 0.163437, 0.647248, -0.000000, 0.000000, 1.000000, 0.214811, 0.962965],
	[-0.292099, 0.163437, 0.647248, 1.000000, 0.000000, -0.000000, 0.214811, 0.962965],
	[-0.292099, -0.236550, 0.647248, 1.000000, 0.000000, -0.000000, 0.223509, 0.980362],
	[-0.292099, 0.113439, 0.597248, 1.000000, 0.000000, -0.000000, 0.214811, 0.972107],
	[-0.292099, -0.236550, 0.597248, 1.000000, 0.000000, -0.000000, 0.223509, 0.991086],
	[0.507901, -0.236550, 1.740549, -0.500000, 0.000000, -0.866000, 0.051935, 0.745885],
	[0.507901, 0.163437, 1.740549, -0.500000, 0.000000, -0.866000, 0.068541, 0.763070],
	[-0.560400, 0.163437, 1.722248, 0.866000, 0.000000, -0.500000, 0.263866, 0.766416],
	[-0.560400, -0.236550, 1.722248, 0.866000, 0.000000, -0.500000, 0.281051, 0.749810],
	[-0.542099, 0.163437, 1.740549, 0.500000, 0.000000, -0.866000, 0.260520, 0.763070],
	[-0.542099, -0.236550, 1.740549, 0.500000, 0.000000, -0.866000, 0.277126, 0.745885],
	[0.526203, 0.163437, 0.672248, -0.866000, 0.000000, 0.500000, 0.065195, 0.958394],
	[0.526203, -0.236550, 0.672248, -0.866000, 0.000000, 0.500000, 0.048010, 0.975001],
	[0.507901, 0.163437, 0.653947, -0.500000, 0.000000, 0.866000, 0.068541, 0.961741],
	[0.507901, -0.236550, 0.653947, -0.500000, 0.000000, 0.866000, 0.051935, 0.978926],
	[-0.560400, -0.236550, 0.672248, 0.866000, 0.000000, 0.500000, 0.281051, 0.975001],
	[-0.560400, 0.163437, 0.672248, 0.866000, 0.000000, 0.500000, 0.263866, 0.958394],
	[-0.542099, -0.236550, 0.653947, 0.500000, 0.000000, 0.866000, 0.277126, 0.978926],
	[-0.542099, 0.163437, 0.653947, 0.500000, 0.000000, 0.866000, 0.260520, 0.961741],
	[0.257901, 0.163437, 0.610645, -1.000000, 0.000000, -0.000000, 0.114251, 0.969658],
	[-0.292099, 0.163437, 0.610645, 1.000000, 0.000000, -0.000000, 0.214811, 0.969658],
	[0.257901, 0.163437, 0.647248, 0.000000, -1.000000, 0.000000, 0.114251, 0.962965],
	[0.482901, 0.163437, 0.647248, 0.000000, -1.000000, 0.000000, 0.073112, 0.962965],
	[-0.017099, 0.163437, 1.197248, 0.000000, -1.000000, 0.000000, 0.164531, 0.862405],
	[-0.292099, 0.163437, 0.647248, 0.000000, -1.000000, 0.000000, 0.214811, 0.962965],
	[0.507901, 0.163437, 0.653947, 0.000000, -1.000000, 0.000000, 0.068541, 0.961741],
	[0.526203, 0.163437, 0.672248, 0.000000, -1.000000, 0.000000, 0.065195, 0.958394],
	[0.532901, 0.163437, 0.697248, 0.000000, -1.000000, 0.000000, 0.063970, 0.953824],
	[0.532901, 0.163437, 1.697248, 0.000000, -1.000000, 0.000000, 0.063970, 0.770987],
	[0.526203, 0.163437, 1.722248, 0.000000, -1.000000, 0.000000, 0.065195, 0.766416],
	[0.507901, 0.163437, 1.740549, 0.000000, -1.000000, 0.000000, 0.068541, 0.763070],
	[0.482901, 0.163437, 1.747248, 0.000000, -1.000000, 0.000000, 0.073112, 0.761845],
	[-0.517099, 0.163437, 1.747248, 0.000000, -1.000000, 0.000000, 0.255949, 0.761845],
	[-0.542099, 0.163437, 1.740549, 0.000000, -1.000000, 0.000000, 0.260520, 0.763070],
	[-0.560400, 0.163437, 1.722248, 0.000000, -1.000000, 0.000000, 0.263866, 0.766416],
	[-0.567099, 0.163437, 1.697248, 0.000000, -1.000000, 0.000000, 0.265091, 0.770987],
	[-0.567099, 0.163437, 0.697248, 0.000000, -1.000000, 0.000000, 0.265091, 0.953824],
	[-0.560400, 0.163437, 0.672248, 0.000000, -1.000000, 0.000000, 0.263866, 0.958394],
	[-0.542099, 0.163437, 0.653947, 0.000000, -1.000000, 0.000000, 0.260520, 0.961741],
	[-0.517099, 0.163437, 0.647248, 0.000000, -1.000000, 0.000000, 0.255949, 0.962965],
	[0.257901, 0.163437, 0.610645, 0.000000, -1.000000, 0.000000, 0.114251, 0.969658],
	[-0.292099, 0.163437, 0.610645, 0.000000, -1.000000, 0.000000, 0.214811, 0.969658],
];

const indexes = [
	0, 1, 2,
	0, 3, 1,
	4, 5, 6,
	4, 7, 5,
	8, 9, 10,
	11, 8, 10,
	12, 13, 14,
	12, 15, 13,
	16, 17, 18,
	19, 18, 17,
	20, 21, 22,
	20, 23, 21,
	24, 25, 26,
	24, 27, 25,
	28, 29, 30,
	31, 28, 30,
	32, 33, 34,
	32, 35, 33,
	36, 37, 38,
	39, 36, 38,
	40, 41, 42,
	40, 43, 41,
	44, 45, 46,
	44, 47, 45,
	48, 49, 50,
	51, 48, 50,
	52, 53, 54,
	52, 55, 53,
	56, 57, 58,
	59, 56, 58,
	60, 61, 62,
	65, 61, 60,
	62, 138, 139,
	62, 139, 140,
	62, 124, 138,
	62, 140, 122,
	70, 61, 65,
	61, 63, 62,
	63, 61, 70,
	122, 123, 62,
	123, 122, 129,
	123, 129, 130,
	123, 130, 131,
	123, 131, 128,
	62, 123, 60,
	71, 63, 70,
	63, 64, 62,
	71, 64, 63,
	64, 141, 62,
	71, 142, 64,
	141, 64, 142,
	124, 62, 125,
	125, 62, 141,
	125, 137, 124,
	125, 136, 137,
	125, 135, 136,
	126, 135, 125,
	71, 70, 72,
	142, 71, 143,
	72, 143, 71,
	72, 70, 69,
	69, 70, 65,
	179, 143, 72,
	72, 180, 179,
	72, 69, 180,
	143, 179, 185,
	218, 180, 69,
	185, 155, 143,
	155, 142, 143,
	155, 185, 184,
	69, 67, 218,
	69, 65, 67,
	217, 218, 67,
	184, 153, 155,
	153, 184, 183,
	155, 154, 142,
	153, 154, 155,
	154, 141, 142,
	183, 150, 153,
	150, 183, 186,
	149, 141, 154,
	125, 141, 149,
	152, 154, 153,
	152, 149, 154,
	150, 152, 153,
	152, 147, 149,
	125, 149, 147,
	150, 151, 152,
	151, 147, 152,
	186, 157, 150,
	151, 150, 157,
	186, 223, 157,
	148, 147, 151,
	125, 147, 148,
	157, 158, 151,
	148, 151, 158,
	174, 157, 223,
	174, 158, 157,
	223, 224, 174,
	158, 156, 148,
	125, 148, 156,
	173, 158, 174,
	173, 156, 158,
	175, 174, 224,
	175, 173, 174,
	224, 187, 175,
	173, 171, 156,
	178, 175, 187,
	187, 188, 178,
	178, 188, 189,
	175, 176, 173,
	178, 176, 175,
	176, 171, 173,
	178, 189, 177,
	177, 176, 178,
	177, 189, 190,
	172, 171, 176,
	177, 172, 176,
	168, 177, 190,
	177, 168, 172,
	168, 190, 169,
	171, 172, 127,
	156, 171, 127,
	172, 168, 127,
	156, 127, 125,
	126, 125, 127,
	134, 126, 127,
	127, 133, 134,
	127, 132, 133,
	127, 128, 132,
	127, 123, 128,
	127, 168, 161,
	161, 123, 127,
	168, 169, 161,
	123, 161, 160,
	166, 161, 169,
	123, 160, 159,
	164, 161, 166,
	160, 161, 164,
	167, 166, 169,
	167, 169, 170,
	191, 170, 192,
	167, 170, 191,
	167, 191, 230,
	165, 166, 167,
	230, 165, 167,
	165, 164, 166,
	165, 230, 229,
	162, 160, 164,
	162, 159, 160,
	163, 164, 165,
	229, 163, 165,
	162, 164, 163,
	163, 229, 182,
	182, 145, 163,
	145, 162, 163,
	145, 182, 181,
	146, 159, 162,
	145, 146, 162,
	123, 159, 144,
	144, 159, 146,
	144, 60, 123,
	181, 68, 145,
	145, 68, 146,
	181, 217, 68,
	67, 68, 217,
	146, 66, 144,
	66, 146, 68,
	60, 144, 66,
	67, 66, 68,
	65, 60, 66,
	65, 66, 67,
	73, 74, 75,
	76, 74, 73,
	75, 74, 89,
	77, 74, 76,
	89, 74, 88,
	78, 74, 77,
	88, 74, 87,
	79, 74, 78,
	87, 74, 86,
	80, 74, 79,
	86, 74, 85,
	81, 74, 80,
	85, 74, 84,
	82, 74, 81,
	84, 74, 83,
	83, 74, 82,
	90, 91, 92,
	92, 93, 90,
	91, 90, 94,
	93, 92, 121,
	94, 95, 91,
	121, 120, 93,
	95, 94, 96,
	120, 121, 119,
	96, 97, 95,
	119, 118, 120,
	97, 96, 98,
	118, 119, 117,
	98, 99, 97,
	117, 116, 118,
	99, 98, 100,
	116, 117, 115,
	100, 101, 99,
	115, 114, 116,
	101, 100, 102,
	114, 115, 113,
	102, 103, 101,
	113, 112, 114,
	103, 102, 104,
	112, 113, 111,
	104, 105, 103,
	111, 110, 112,
	105, 104, 106,
	110, 111, 109,
	106, 107, 105,
	109, 108, 110,
	107, 106, 108,
	108, 109, 107,
	193, 194, 195,
	195, 196, 193,
	194, 193, 206,
	195, 222, 196,
	206, 205, 194,
	221, 196, 222,
	205, 206, 204,
	219, 221, 222,
	205, 204, 203,
	220, 221, 219,
	201, 203, 204,
	219, 198, 220,
	201, 202, 203,
	220, 198, 197,
	202, 201, 207,
	197, 198, 199,
	207, 208, 202,
	199, 200, 197,
	226, 208, 207,
	200, 199, 231,
	225, 208, 226,
	200, 231, 232,
	226, 227, 225,
	233, 232, 231,
	225, 227, 228,
	233, 234, 232,
	227, 212, 228,
	234, 233, 214,
	211, 228, 212,
	214, 213, 234,
	211, 212, 209,
	209, 210, 211,
	213, 214, 215,
	215, 216, 213,
	235, 236, 237,
	237, 238, 235,
	236, 235, 266,
	238, 237, 270,
	266, 265, 236,
	270, 269, 238,
	265, 266, 246,
	269, 270, 268,
	246, 245, 265,
	268, 267, 269,
	245, 246, 243,
	267, 268, 240,
	243, 244, 245,
	240, 239, 267,
	244, 243, 247,
	239, 240, 241,
	247, 248, 244,
	241, 242, 239,
	248, 247, 271,
	242, 241, 275,
	271, 272, 248,
	275, 276, 242,
	272, 271, 273,
	276, 275, 277,
	273, 274, 272,
	277, 278, 276,
	274, 273, 256,
	278, 277, 258,
	256, 255, 274,
	258, 257, 278,
	255, 256, 253,
	253, 254, 255,
	257, 258, 259,
	259, 260, 257,
	249, 250, 251,
	251, 252, 249,
	252, 279, 249,
	261, 262, 263,
	263, 280, 261,
	264, 263, 262,
	281, 282, 283,
	282, 285, 283,
	283, 285, 286,
	283, 286, 287,
	283, 287, 288,
	288, 289, 283,
	289, 290, 283,
	283, 290, 291,
	291, 292, 283,
	292, 293, 283,
	283, 293, 294,
	283, 294, 295,
	295, 296, 283,
	296, 297, 283,
	297, 298, 283,
	283, 298, 299,
	299, 284, 283,
	283, 284, 281,
	300, 281, 284,
	301, 300, 284,
];

export const hitFatTargetSquareMesh = Mesh.fromArray(vertices, indexes);
