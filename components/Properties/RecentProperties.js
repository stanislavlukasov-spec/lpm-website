import React, { useEffect } from 'react'
import _ from 'lodash'
import { withTheme } from '@mui/styles'
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Container from '../Container';
import PropertiesGrid from '../Properties/PropertiesGrid'
import { useStore as globalUseStore } from '../store/global/store'
import Section from '../Section'
import getComponentCopy from '../store/global/getComponentCopy'
import { URL, RECENT_PROPERTIES_URL, HEADERS } from '../PropertiesApi/options'
import axios from 'axios'
import { ROUTE_SEARCH_PAGE } from '../Settings/routes'
import { setRecentPropertiesRent, setRecentPropertiesSale } from '../store/global/reducer'
import { TYPE_SALE, TYPE_RENT } from '../store/global/types'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getBreakPoint, BREAKPOINT_XS } from '../BreakPoint'
import useMediaQuery from '@mui/material/useMediaQuery'
import cStyles from '../../styles/Properties.module.css'

const RecentProperties = props => {
    const [globalState, dispatch] = globalUseStore()

	const {
        section = "",
        type,
        theme
    } = props
    
    const {
		country = "",
        recentPropertiesRent = [],
        recentPropertiesSale = []
    } = globalState	

    const componentCopy = getComponentCopy({
		state: globalState,
		section
    })

    const bp = getBreakPoint({
        theme,
        useMediaQuery
    })

    const isTypeSale = type == TYPE_SALE
    const titleText = componentCopy.title || ""
    const properties = isTypeSale ? recentPropertiesSale : recentPropertiesRent
    const router = useRouter()

    useEffect(() => {
        if(_.isEmpty(properties)) {
            axios.get(`${URL}/${RECENT_PROPERTIES_URL}?saleRent=${type}`, { headers: HEADERS })
                .then(res => {
                    const response = res.data || {}
                    let properties = response.data || []
        
                    if(isTypeSale) {
                        dispatch(setRecentPropertiesSale(properties))
                    } else {
                        dispatch(setRecentPropertiesRent(properties))
                    }
                })
        }
    }, [])
    
    return (
        <Section className={cStyles['recent-properties']}>
            <Container>
                <div className={cStyles['container-flex-center']}>
                    <Typography 
                        component="h2" 
                        variant={bp == BREAKPOINT_XS ? "h3" : "h2"}
                        style={{ 
                            marginRight: 'auto' ,
                            paddingRight: '1rem'
                        }}>

                        {titleText.replace('{country}', country)}
                    </Typography>

                    <Link 
                        href={`${ROUTE_SEARCH_PAGE}?saleRent=${type}`}
                        className={cStyles['no-underline']}>

                        <Chip 
                            label={componentCopy.viewAll} 
                            color="primary"
                        />
                    </Link>
                </div>

                <PropertiesGrid 
                    section={section}
                    items={_.take(properties, 8)}
                    maxItemCount={8}
                    recentPropertiesType={type}
                />
            </Container>
        </Section>
    )
}

export default withTheme(RecentProperties);