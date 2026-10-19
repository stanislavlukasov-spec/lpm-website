import Head from 'next/head'
import _ from 'lodash'
import HeroXLExplore from '../components/Heros/HeroXLExplore'
import HeroDoubleNewBuild from '../components/Heros/HeroDoubleNewBuild'
import Header from '../components/Headers/main'
import RecentProperties from '../components/Properties/RecentProperties'
import PopularLocations from '../components/PopularLocations'
import Footer from '../components/Footer'
import { useStore } from '../components/store/global/store'
import { TYPE_RENT, TYPE_SALE } from '../components/store/global/types'
import FadeIn from '../components/TransitionGroup/FadeIn'
import DynamicFilters from '../components/Filters/Dynamic'

import { 
    SECTION_NAV,
    SECTION_HERO_XL_EXPLORE, 
    RECENT_PROPERTIES_TO_RENT, 
    RECENT_PROPERTIES_FOR_SALE,
    HERO_DOUBLE_FIND_NEW_BUILD_PROPERTY,
    POPULAR_LOCATIONS,
    FOOTER,
    SECTION_FILTERS
} from '../components/pages/pageSections'

export default function Home() {
    const [state] = useStore()
      
    const {
        pageConfig = {},
        filtersUuid
    } = state

    const {
        pages = {}
    } = pageConfig

    if(_.isEmpty(pages.HomePage)) {
        return false
    }

    return (
        <div>
            <Head>
                <title>Explore Propeties in Cyprus from Leading Estate Egents</title>
                <meta name="description" content="Find properties for rent or buy in Cyprus from top estate agents all in one place."/>
            </Head>

            <FadeIn>
                <div>
                    {pages.HomePage.map((item, index) => {
                        if(item == SECTION_NAV) return <Header key={filtersUuid}/>
                        if(item == SECTION_FILTERS) return <DynamicFilters key={filtersUuid}/>
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
        </div>
    )
}
