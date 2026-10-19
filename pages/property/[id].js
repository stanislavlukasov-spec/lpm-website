import Head from 'next/head'
import _ from 'lodash'
import { useStore } from '../../components/store/global/store'
import Header, { HEADER_TYPE_INVERT, HEADER_SIZE_SMALL } from '../../components/Headers/main'
import Footer from '../../components/Footer'
import FadeIn from '../../components/TransitionGroup/FadeIn'
import SelectedProperty from '../../components/Properties/SelectedProperty'
import DynamicFilters from '../../components/Filters/Dynamic'
import PropertyTitle from '../../components/Properties/PropertyTitle'
import getComponentCopy from '../../components/store/global/getComponentCopy'
import { PROPERTY } from '../../components/pages/pageSections'

import { 
    SECTION_NAV,
    SECTION_SELECTED_PROPERTY,
    FOOTER,
    SECTION_FILTERS
} from '../../components/pages/pageSections'

export default function Property() {
    const [state] = useStore()
    
    const {
        pageConfig = {},
        filtersUuid,
        property = {}
    } = state

    const {
        description
    } = property

    const componentCopy = getComponentCopy({
		state,
		section: PROPERTY
    })

    const title = PropertyTitle({
        componentCopy,
        ...property
    })

    const {
        pages = {}
    } = pageConfig

    if(_.isEmpty(pages.SearchPage)) {
        return false
    }

    return (
        <div>
            <Head>
                <title>{title || "Explore Propeties in Cyprus"}</title>
                <meta name="description" content={description || "Find properties for rent or buy in Cyprus"}/>
            </Head>

            <FadeIn>
                <div>
                    {pages.PropertyPage.map((item, index) => {
                        if(item == SECTION_NAV) return <Header 
                            type={HEADER_TYPE_INVERT}
                            size={HEADER_SIZE_SMALL}
                            key={filtersUuid}
                        />

                        if(item == SECTION_FILTERS) return <DynamicFilters key={filtersUuid}/>
                        if(item == SECTION_SELECTED_PROPERTY) return <SelectedProperty key={index} />
                        if(item == FOOTER) return <Footer key={index}/>
                        
                        return false
                    })}
                </div>
            </FadeIn>
        </div>
    )
}
