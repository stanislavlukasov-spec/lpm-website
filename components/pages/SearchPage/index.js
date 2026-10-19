import React from 'react'
import _ from 'lodash'
import Header, { HEADER_TYPE_INVERT } from '../../Headers/main'
import FavouriteFilters from '../../Filters/Favourite'
import Footer from '../../Footer'
import SearchResults from '../../Properties/SearchResults'
import HeroSearchPage from '../../Heros/HeroSearchPage'
import { useStore } from '../../store/global/store'
import FadeIn from '../../TransitionGroup/FadeIn'
import DynamicFilters from '../../Filters/Dynamic'

import { 
    SECTION_NAV,
    SECTION_FILTERS,
    SECTION_SEARCH_RESULTS,
    FOOTER,
    SECTION_HERO_SEARCH
} from '../pageSections'

export const SEARCH_PAGE_CONTENT_CLASS = "search-page--content"

const SearchPage = props => {
    const [state] = useStore()
    
    const {
        pageConfig = {},
        filtersUuid
    } = state

    const {
        pages = {}
    } = pageConfig

    if(_.isEmpty(pages.SearchPage)) {
        return false
    }

	return (
        <FadeIn>
            <section className="selected-property">
                {pages.SearchPage.map((item, index) => {
                    if(item == SECTION_NAV) return <Header 
                        key={filtersUuid} 
                        position="relative"
                        filtersButtonSearchQuery={true}
                        type={HEADER_TYPE_INVERT}
                    />

                    if(item == SECTION_HERO_SEARCH) return <HeroSearchPage key={index} />

                    if(item == SECTION_FILTERS) return (
                        <React.Fragment key={index}>
                            <FavouriteFilters key={filtersUuid}/>
                            <DynamicFilters key={`dynamic_`+filtersUuid}/>
                        </React.Fragment>
                    )
                    
                    if(item == SECTION_SEARCH_RESULTS) return <SearchResults key={index} {...props}/>
                    if(item == FOOTER) return <Footer key={index} styles={{ marginTop: 0 }}/>
                    
                    return false
                })}
            </section>
        </FadeIn>
	)
}

export default SearchPage