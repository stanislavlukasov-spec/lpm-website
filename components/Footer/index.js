import React from 'react'
import _ from 'lodash'
import Container from '../Container'
import footerStyles from '../../styles/Footer.module.css'
import Logo from '../Logo'
import useMediaQuery from '@mui/material/useMediaQuery';
import { withTheme } from '@mui/styles';
import { FOOTER } from '../pages/pageSections'
import { useStore } from '../store/global/store'
import { BUILDING_TYPES, TYPE_BUY, TYPE_RENT, TYPE_SALE } from '../store/global/types'
import { CONTACT_EMAIL, DOMAIN } from '../Settings/about'
import getComponentCopy from '../store/global/getComponentCopy'
import Typography from '@mui/material/Typography'
import { ROUTE_PROPERTIES_PAGE } from '../Settings/routes'
import { useRouter } from 'next/router'

const Footer = props => {
    const [state] = useStore()
    const router = useRouter()

    const {
        citiesUnsorted = []
    } = state

    const {
        theme = {},
        styles = {}
    } = props

    const bpLarge = useMediaQuery(theme.breakpoints.up('lg'))
    const bpSmall = useMediaQuery(theme.breakpoints.up('sm'))
    
    let bp = 'xs' 
    if(bpSmall) bp = 'sm' 
    if(bpLarge) bp = 'lg' 

    const componentCopy = getComponentCopy({
		state,
		section: FOOTER
    })
    
    const takenCities = _.take(citiesUnsorted, 4)
    const types = _.take(BUILDING_TYPES, 4)

    const getUrl = props => {
        return `${ROUTE_PROPERTIES_PAGE}/${props.city.toLocaleLowerCase()}/${props.saleRent.toLocaleLowerCase()}-${props.type.toLocaleLowerCase()}?saleRent=${props.saleRentFilter}&type=${props.type}&district=${props.city}`
    }

    function handleClick(link) {
        router.push(link)
    }

    return (
        <div className={footerStyles.footer}>
            <div 
                className={footerStyles[`footer-${bp}`]}
                style={styles}>

                <Container>
                    <div>
                        <Logo 
                            white={false} 
                            styles={{ margin: 'auto' }}
                        />

                        <Typography 
                            component="p" 
                            variant="caption"
                            style={{ margin: '1rem 0' }}>

                            {componentCopy.logoDescription}
                        </Typography>

                        <Typography 
                            component="p" 
                            variant="caption">

                            <b>{CONTACT_EMAIL}</b>
                        </Typography>
                    </div>

                    <div className={footerStyles.footerContent}>
                        {takenCities.map((city, index) => {
                            return (
                                <div key={index}>
                                    <Typography 
                                        component="p" 
                                        variant="caption">

                                        <b>{componentCopy.propertiesInCity.replace('{city}', city)}</b>
                                    </Typography>

                                    {types.map((type, index) => {
                                        return (
                                            <Typography 
                                                component="p" 
                                                variant="caption"
                                                key={index}
                                                onClick={() => handleClick(getUrl({ type, city, saleRent: TYPE_BUY, saleRentFilter: TYPE_SALE }))}>
            
                                                {componentCopy.buyInCity
                                                    .replace('{type}',type)
                                                    .replace('{city}',city)
                                                } 
                                            </Typography>
                                        )
                                    })}

                                    {types.map((type, index) => {
                                        return (
                                            <Typography 
                                                component="p" 
                                                variant="caption"
                                                key={index}
                                                onClick={() => handleClick(getUrl({ type, city, saleRent: TYPE_RENT, saleRentFilter: TYPE_RENT }))}>
            
                                                {componentCopy.rentInCity
                                                    .replace('{type}',type)
                                                    .replace('{city}',city)
                                                } 
                                            </Typography>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </Container>

                <div className={footerStyles.footerRights}>
                    <Typography 
                        component="p" 
                        variant="caption">

                        <b>{DOMAIN}</b>
                    </Typography>

                    <Typography 
                        component="p" 
                        variant="caption">

                        {componentCopy.rights}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default withTheme(Footer);