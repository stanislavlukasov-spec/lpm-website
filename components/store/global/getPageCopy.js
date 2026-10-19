import { 
	SECTION_HERO_XL_EXPLORE, 
	SECTION_FILTERS, 
	RECENT_PROPERTIES_TO_RENT, 
	RECENT_PROPERTIES_FOR_SALE,
	HERO_DOUBLE_FIND_NEW_BUILD_PROPERTY,
	POPULAR_LOCATIONS,
	FOOTER,
	PROPERTY,
	SECTION_SEARCH_RESULTS
} from '../../pages/pageSections'

import { LANGUAGE_ENGLISH } from './locales'

export default function getPageCopy() {
	const propertyEnglish = getPropertyCopyEnglish()
	const exploreEnglish = getExploreEnglish()

	return {
		[SECTION_HERO_XL_EXPLORE]: {
			[LANGUAGE_ENGLISH]: {
				heroText: '#1 Property Market Explorer in {country}',
				heroDescription: 'Find properties to buy and rent from leading estate agents in {country} all under one roof',
				findProperty: "Let's find your property"
			}
		},
		[SECTION_FILTERS]: {
			[LANGUAGE_ENGLISH]: {
				district: 'District',
				area: 'Area',
				anyArea: 'Any Area',
				bedrooms: 'Bedrooms',
				bathrooms: 'Bathrooms',
				propertyType: 'Property Type',
				livingSpace: 'Living Space',
				totalArea: 'Total Area',
				storeys: 'Storeys',
				pool: 'Pool',
				appliances: 'Appliances',
				view: 'View',
				furniture: 'Furniture',
				airConditioning: 'Air Conditioning',
				parking: 'Parking',
				newBuilding: 'New Building',
				distanceToTheSea: 'Distance To The Sea',
				yearOfConstruction: 'Year Of Construction',
				gatedComplex: 'Gated Complex',
				title: 'Title',
				type: 'Type',
				subType: 'Sub Type',
				any: 'Any',
				filters: 'Filters',
				buy: 'Buy',
				rent: 'Rent',
				saleAndRent: 'Sale and Rent',
				price: 'Price',
				from: 'From',
				to: 'To',
				perMonth: 'p/m',
				newBuild: 'New Build',
				applyFilters: 'Apply Filters',
				noFiltersSelected: 'Select Filters...',
				filtersApplied: 'Filters Applied',
				...exploreEnglish
			}
		},
		[RECENT_PROPERTIES_TO_RENT] : {
			[LANGUAGE_ENGLISH]: {
				title: 'Just Added Properties To Rent In {country}',
				...propertyEnglish
			}
		},
		[RECENT_PROPERTIES_FOR_SALE] : {
			[LANGUAGE_ENGLISH]: {
				title: 'Just Added Properties For Sale In {country}',
				...propertyEnglish
			}
		},
		[PROPERTY]: {
			[LANGUAGE_ENGLISH]: propertyEnglish
		},
		[HERO_DOUBLE_FIND_NEW_BUILD_PROPERTY]: {
			[LANGUAGE_ENGLISH]: {
				title: 'Find your perfect newly built property',
				description: 'Hommeexplore lets you find all newly built properties in {country} from multiple estate agents.',
				...exploreEnglish
			}
		},
		[POPULAR_LOCATIONS] :{
			[LANGUAGE_ENGLISH]: {
				title: 'Popular Locations In {country}'
			}
		},
		[FOOTER]: {
			[LANGUAGE_ENGLISH]: {
				logoDescription: 'Find properties to buy and rent from leading estate agents',
				rights: 'All rights reserved',
				propertiesInCity: 'Properties in {city}',
				buyInCity: 'Buy {type} in {city}',
				rentInCity: 'Rent {type} in {city}'
			}
		},
		[SECTION_SEARCH_RESULTS]: {
			[LANGUAGE_ENGLISH]: {
				recentPropertiesToRent: 'Just Added Properties To Rent In {country}',
				recentPropertiesForSale: 'Just Added Properties For Sale In {country}',
				results: 'Results',
				for: 'for',
				bedroom: 'Bedroom',
				bathroom: 'Bathroom',
				in: 'in'
			}
		}
	}
}

function getPropertyCopyEnglish() {
	return {
		viewAll: 'View All',
		rent: 'Rent',
		buy: 'Buy',
		bedroom: 'Bedroom',
		apartment: 'Apartment',
		house: 'House',
		villa: 'Villa',
		penthouse: 'Penthouse',
		studio: 'Studio',
		office: 'Office',
		commercial: 'Commercial',
		building: 'Building',
		shop: 'Shop',
		property: 'Property',
		perMonth: 'p/m',
		priceNotAvailable: 'Price On Request'
	}
}

function getExploreEnglish() {
	return {
		explore: 'Explore'
	}
}