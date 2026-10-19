import React from 'react'
import { withTheme } from '@mui/styles'
import cStyles from '../../styles/Properties.module.css'
import Typography from '@mui/material/Typography';
import { useStore as globalUseStore } from '../store/global/store'
import Carousel from '../Carousel'
import EstateAgencyLogo from '../Logo/EstateAgencyLogo'
import PropertyTitle from './PropertyTitle'
import PropertyPrice from './PropertyPrice'
import PropertyIcon from './PropertyIcon'
import PropertyDistanceToTheSea from './PropertyDistanceToTheSea'
import getComponentCopy from '../store/global/getComponentCopy'
import { PropertyImageBasic, getSrc } from './PropertyImage'
import PropertyLocation from './PropertyLocation'
import { PROPERTY } from '../pages/pageSections'
import { join } from '../Helpers/joinClasses'
import { parseLetters } from '../Helpers/parseLetters'
import PropertyUrl from './PropertyUrl'
import { HrefBlank } from '../Link/href'
import { ROUTE_PROPERTY } from '../Settings/routes'
import { useRouter } from 'next/router'
import { setProperty } from '../store/global/reducer'
import FadeIn from '../TransitionGroup/FadeIn' 

const Property = props => {
    const [globalState, dispatch] = globalUseStore()	

	const {
        id = "",
        theme = {},
        itemName = "",
        city = "",
        area = "",
        bedrooms,
        bathrooms,
        distanceToTheSea = "",
        images = []
    } = props
    
    const {
		locale = "",
        selectedProperty = {}
    } = globalState	

    const componentCopy = getComponentCopy({
		state: globalState,
		section: PROPERTY
    })

    const typeTitleProps = {
        component: "h5",
        variant: "h5",
        style: { 
            color: theme.palette.textGrey, 
            marginRight: 'auto' 
        }
    }

    const title = PropertyTitle({
        componentCopy,
        ...props
    })

    const price = PropertyPrice({
        ...props,
        componentCopy,
        locale
    })

    const location = PropertyLocation({
        area,
        city
    })

    const router = useRouter()
    const selected = selectedProperty.id == id

    const handlePropertyClick = () => {
        dispatch(setProperty(props))
        router.push(`${ROUTE_PROPERTY}/${id}`)
    }

    return (
        <div 
            id={parseLetters(id)}
            className={join(cStyles['property'], cStyles[selected ? 'selected-property' : ''])}  
            onClick={() => handlePropertyClick()}>

            <FadeIn delay={600}>
                <HrefBlank href={PropertyUrl(props)}>
                    <div className={cStyles['property-images']}>
                        <Carousel>
                            {images.map((item, index) => {
                                const imageProps = {
                                    ...props,
                                    dotImage: item,
                                    image: item
                                }

                                return (
                                    <PropertyImageBasic 
                                        {...imageProps}
                                        key={index}
                                    />
                                )
                            })}
                        </Carousel>

                        <EstateAgencyLogo name={itemName}/>
                    </div>

                    <div className={cStyles['property-details']}>
                        <Typography {...typeTitleProps}>
                            {title}
                        </Typography>

                        <Typography {...typeTitleProps}>
                            {price}
                        </Typography>

                        <Typography 
                            component="p"
                            variant="body1"
                            style={{ textTransform: 'capitalize' }}>

                            {location}
                        </Typography>
        
                        <div className={cStyles['container-flex-center']}>
                            <PropertyIcon type="bedroom" value={bedrooms}/>
                            <PropertyIcon type="bathroom" value={bathrooms}/>
                            <PropertyIcon type="sea" value={PropertyDistanceToTheSea(distanceToTheSea)}/>
                        </div>
                    </div>
                </HrefBlank>
            </FadeIn>
        </div>
    )
}

export default withTheme(Property);