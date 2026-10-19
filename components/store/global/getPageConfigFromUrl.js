import { 
		SECTION_HERO_XL_EXPLORE, 
		RECENT_PROPERTIES_TO_RENT, 
		RECENT_PROPERTIES_FOR_SALE, 
		HERO_DOUBLE_FIND_NEW_BUILD_PROPERTY,
		POPULAR_LOCATIONS,
		FOOTER,
		SECTION_NAV,
		SECTION_FILTERS,
		SECTION_SEARCH_RESULTS,
		SECTION_SELECTED_PROPERTY,
		SECTION_HERO_SEARCH
} from '../../pages/pageSections'

import Troodos from '../../../public/images/locations/troodos.jpg'
import Larnaca from '../../../public/images/locations/larnaca.jpg'
import Limassol from '../../../public/images/locations/limassol.jpg'
import Nicosia from '../../../public/images/locations/nicosia.jpg'
import Paphos from '../../../public/images/locations/pafos.jpg'
import Protaras from '../../../public/images/locations/protaras.jpg'

import { LANGUAGE_ENGLISH } from './locales'

export default function getPageConfigFromUrl() {
	return {
		pages: {
			HomePage: [
				SECTION_NAV,
				SECTION_FILTERS,
				SECTION_HERO_XL_EXPLORE,
				RECENT_PROPERTIES_TO_RENT,
				RECENT_PROPERTIES_FOR_SALE,
				HERO_DOUBLE_FIND_NEW_BUILD_PROPERTY,
				POPULAR_LOCATIONS,
				FOOTER
			],
			SearchPage: [
				SECTION_NAV,
				SECTION_HERO_SEARCH,
				SECTION_FILTERS,
				SECTION_SEARCH_RESULTS,
				FOOTER
			],
			PropertyPage: [
				SECTION_NAV,
				SECTION_FILTERS,
				SECTION_SELECTED_PROPERTY,
				FOOTER
			]
		},
		locations: {
			[LANGUAGE_ENGLISH]: [
				{
					name: 'Nicosia',
					title: 'Properties in Nicosia',
					description: 'Located 50km from the coast, the island’s capital is perfect place for those who love city life.',
					icon: Nicosia
				},
				{
					name: 'Larnaca',
					title: 'Properties in Larnaca',
					description: 'if you want a more relaxed pace of life away from areas overrun with expats and tourists, sleepier and more levantine Larnaca could be the place for you.',
					icon: Larnaca
				},
				{
					name: 'Limassol',
					title: 'Properties in Limassol',
					description: 'Limassol is the island’s second largest urban area. Head here for an intriguing combination of modern architecture and remnants of the island’s multicultural past.',
					icon: Limassol
				},
				{
					name: 'Paphos',
					title: 'Properties in Paphos',
					description: "Overseas property buyers continue to flock to Paphos to take advantage of the well-established expat community.",
					icon: Paphos
				},
				{
					name: 'Famagusta',
					title: 'Properties in Famagusta',
					description: 'A city of antiquities, Famagusta lies on the east coast of Cyprus by the island’s deepest harbour and some of the best beaches on the island.',
					icon: Protaras
				},
				{
					name: 'Troodos',
					title: 'Properties in Troodos',
					description: 'If you prefer to spend your time away from big cities, Troödos Mountains, rising to nearly 2000m, could be the perfect spot.',
					icon: Troodos
				}
			]
		}
	}
}