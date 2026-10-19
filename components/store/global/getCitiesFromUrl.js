import _ from 'lodash'

function getCyprusCities() {
	return [
		'Nicosia',
		'Limassol',
		'Larnaca',
		'Paphos',
		'Famagusta',
		'Troodos'
	]
}

export function getCitiesFromUrl() {
	let cities = getCyprusCities()
	return cities.sort()
}

export function getCitiesFromUrlUnsorted() {
	return getCyprusCities()
}