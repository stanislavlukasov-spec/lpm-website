import getPageConfigFromUrl from './getPageConfigFromUrl'
import { getCitiesFromUrlUnsorted, getCitiesFromUrl } from './getCitiesFromUrl'
import getPageCopy from './getPageCopy'
import locales from './locales'
import { AREAS_CYPRUS } from './areasCyprus'
import { TYPE_SALE } from '../global/types'
import { v4 as uuidv4 } from 'uuid';

const SET_PROPERTIES = 'SET_PROPERTIES'
const SET_SEARCH_UUID = 'SET_SEARCH_UUID'
const SET_RECENT_PROPERTIES_RENT = 'SET_RECENT_PROPERTIES_RENT'
const SET_RECENT_PROPERTIES_SALE = 'SET_RECENT_PROPERTIES_SALE'
const SET_FETCHING_DATA = 'SET_FETCHING_DATA'
const SET_PAGE_CONFIG = 'SET_PAGE_CONFIG'
const SET_LOCALE = 'SET_LOCALE'
const SET_PROPERTY = 'SET_PROPERTY'
const SET_OPEN_FILTERS = 'SET_OPEN_FILTERS'
const SET_FILTERS = 'SET_FILTERS'

export const DEFAUlT_FILTERS = {
	saleRent: TYPE_SALE
}

export const initialState = {
	pageConfig: getPageConfigFromUrl(),
	copy: getPageCopy(),
	locales,
	locale: locales[0],
	country: 'Cyprus',
	cities: getCitiesFromUrl(),
	citiesUnsorted: getCitiesFromUrlUnsorted(),
	currency: 'EUR',
	currencyIcon: '€',
	areas: AREAS_CYPRUS,
	properties: [],
	fetchingData: false,
	recentPropertiesRent: [],
	recentPropertiesSale: [],
	searchUuid: uuidv4(),
	filtersUuid: uuidv4(),
	property: {},
	openFilters: false,
	filters: {}
};

export const setPageConfig = (pageConfig) => ({
	type: SET_PAGE_CONFIG,
	pageConfig
});

export const setLocale = (locale) => ({
	type: SET_LOCALE,
	locale
});

export const setProperties = (properties) => ({
	type: SET_PROPERTIES,
	properties
});

export const setRecentPropertiesSale = (recentPropertiesSale) => ({
	type: SET_RECENT_PROPERTIES_SALE,
	recentPropertiesSale
});

export const setRecentPropertiesRent = (recentPropertiesRent) => ({
	type: SET_RECENT_PROPERTIES_RENT,
	recentPropertiesRent
});

export const setFetchingData = (fetchingData) => ({
	type: SET_FETCHING_DATA,
	fetchingData
});

export const setSearchUuid = () => ({
	type: SET_SEARCH_UUID
});

export const setProperty = (property) => ({
	type: SET_PROPERTY,
	property
});

export const setOpenFilters = (openFilters) => ({
	type: SET_OPEN_FILTERS,
	openFilters
});

export const setFilters = (filters) => ({
	type: SET_FILTERS,
	filters
});

export const globalReducer = (state = initialState, action) => {
	let result = {
		...state
	}

	if (action.type === SET_PAGE_CONFIG) {
		result.pageConfig = action.pageConfig
	}

	if (action.type === SET_LOCALE) {
		result.locale = action.locale
	}

	if (action.type === SET_PROPERTIES) {
		result.properties = action.properties
	}

	if (action.type === SET_RECENT_PROPERTIES_SALE) {
		result.recentPropertiesSale = action.recentPropertiesSale
	}

	if (action.type === SET_RECENT_PROPERTIES_RENT) {
		result.recentPropertiesRent = action.recentPropertiesRent
	}

	if (action.type === SET_FETCHING_DATA) {
		result.fetchingData = action.fetchingData
	}

	if (action.type === SET_SEARCH_UUID) {
		result.searchUuid = uuidv4()
	}

	if (action.type === SET_PROPERTY) {
		result.property = action.property
	}

	if (action.type === SET_OPEN_FILTERS) {
		result.openFilters = action.openFilters
	}

	if (action.type === SET_FILTERS) {
		result.filters = action.filters
		result.filtersUuid = uuidv4()
	}

	return result
};