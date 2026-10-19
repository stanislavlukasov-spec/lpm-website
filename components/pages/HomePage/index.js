import React, { Fragment } from 'react'
import _ from 'lodash'
import HeroXLExplore from '../../Heros/HeroXLExplore'
import HeroDoubleNewBuild from '../../Heros/HeroDoubleNewBuild'
import Header from '../../Headers/main'
import RecentProperties from '../../Properties/RecentProperties'
import PopularLocations from '../../PopularLocations'
import Footer from '../../Footer'
import { useStore } from '../../store/global/store'
import { TYPE_RENT, TYPE_SALE } from '../../store/global/types'
import FadeIn from '../../TransitionGroup/FadeIn'
import { Helmet } from "react-helmet"

import { 
    SECTION_HERO_XL_EXPLORE, 
    RECENT_PROPERTIES_TO_RENT, 
    RECENT_PROPERTIES_FOR_SALE,
    HERO_DOUBLE_FIND_NEW_BUILD_PROPERTY,
    POPULAR_LOCATIONS,
    FOOTER
} from '../pageSections'

const HomePage = () => {
    const [state] = useStore()
    
    const {
        pageConfig = {}
    } = state

    const {
        pages = {}
    } = pageConfig

    if(_.isEmpty(pages.HomePage)) {
        return false
    }

	return (
        <Fragment>
            <Helmet>
                <title>Explore Propeties in Cyprus from Leading Estate Egents</title>
                <meta name="description" content="Find properties for rent or buy in Cyprus from top estate agents all in one place."/>
            </Helmet>

            <FadeIn>
                <div>
                    <Header />
                    
                    {pages.HomePage.map((item, index) => {
                        if(item == SECTION_HERO_XL_EXPLORE) return <HeroXLExplore key={index}/>
                        if(item == RECENT_PROPERTIES_TO_RENT) return <RecentProperties type={TYPE_RENT} section={RECENT_PROPERTIES_TO_RENT} key={index}/>
                        if(item == RECENT_PROPERTIES_FOR_SALE) return <RecentProperties type={TYPE_SALE} section={RECENT_PROPERTIES_FOR_SALE} key={index}/>
                        if(item == HERO_DOUBLE_FIND_NEW_BUILD_PROPERTY) return <HeroDoubleNewBuild key={index}/>
                        if(item == POPULAR_LOCATIONS) return <PopularLocations key={index}/>
                        if(item == FOOTER) return <Footer key={index}/>
                        
                        return false
                    })}
                </div>
            </FadeIn>
        </Fragment>
	)
}

export default HomePage