import React, { useState } from 'react'
import _ from 'lodash'
import { withTheme } from '@mui/styles'
import cStyles from '../../styles/Properties.module.css'
import Typography from '@mui/material/Typography';
import { useStore as globalUseStore } from '../store/global/store'
import { useStore as searchUseStore } from '../store/search/store'
import Carousel from '../Carousel'
import EstateAgencyLogo from '../Logo/EstateAgencyLogo'
import PropertyTitle from './PropertyTitle'
import PropertyPrice from './PropertyPrice'
import FilterIcons from '../Filters/FilterIcons'
import getComponentCopy from '../store/global/getComponentCopy'
import Container from '../Container';
import { PROPERTY } from '../pages/pageSections'
import Button from '../Button';
import { VARIANT_PRIMARY } from '../Button';
import PropertyLocation from './PropertyLocation'
import PropertyImage from './PropertyImage'
import PropertyImages from './PropertyImages'
import NoPropertySelected from './NoPropertySelected'
import FadeIn from '../TransitionGroup/FadeIn'
import Modal from '../Modal'

const PropertyLarge = props => {
    const [globalState] = globalUseStore()
    const [searchState] = searchUseStore()
    const [largeImagesOpen, setLargeImagesOpen] = useState({})

    const {
        selectedProperty = {}
    } = searchState

	const {
        theme = {}
    } = props

    if(_.isEmpty(selectedProperty)) {
        return <NoPropertySelected />
    }

    const {
        locale
    } = globalState

    const {
        largeImages = [],
        baseUrl = "",
        name = "",
        description = "",
        id = "",
        url = "",
        images = []
    } = selectedProperty

    const componentCopy = getComponentCopy({
		state: globalState,
		section: PROPERTY
    })

    const title = PropertyTitle({
        componentCopy,
        ...selectedProperty
    })

    const location = PropertyLocation(selectedProperty)

    const price = PropertyPrice({
        ...selectedProperty,
        componentCopy,
        locale
    })

    const displayLargeImages = PropertyImages(largeImages)
    const dotsImages = PropertyImages(images)

    return (
        <FadeIn key={`fadein-${id}`}>
            <div 
                className={cStyles['property-large']}
                key={`property-large-${id}`}>

                <div className={cStyles['property-images']}>
                    <Carousel 
                        images={displayLargeImages.map((image, index) => <PropertyImage 
                            baseUrl={baseUrl} 
                            name={name}
                            dots={true}
                            key={index}
                            dotImage={dotsImages[index]}
                            image={image}/>
                        )}
                        onClick={index => setLargeImagesOpen({index})}
                        dots={true}
                        startPosition={largeImagesOpen.index}
                    />

                    <EstateAgencyLogo name={name}/>
                </div>

                <Container>
                    <Typography 
                        component="h2" 
                        variant="h2"
                        style={{ marginTop: '2rem'}}>

                        {title}
                    </Typography>

                    <Typography 
                        component="h4" 
                        variant="h4"
                        style={{ 
                            marginTop: '0.5rem',
                            color: theme.palette.textGrey
                        }}>

                        {location}
                    </Typography>

                    <Typography 
                        component="h3" 
                        variant="h3"
                        style={{ 
                            marginTop: '0.5rem',
                            color: theme.palette.textGrey
                        }}>

                        {price}
                    </Typography>

                    <Typography 
                        component="p" 
                        variant="body1"
                        style={{ 
                            margin: '0.5rem 0 1rem 0',
                            color: theme.palette.textGrey
                        }}>

                        {description}
                    </Typography>

                    <FilterIcons 
                        items={selectedProperty}
                    />

                    <a 
                        href={baseUrl+url} 
                        rel="noreferrer"
                        target="_blank">

                        <Button 
                            text="Go To Estate Agency"
                            type={VARIANT_PRIMARY}
                            styles={{
                                display: 'block',
                                margin: '2rem auto 0 auto',
                                fontWeight: 400
                            }}
                        />
                    </a>
                </Container>

                {!_.isEmpty(largeImagesOpen) &&
                    <Modal 
                        open={largeImagesOpen}
                        modalClassName="modal-content-container--80"
                        handleClose={() => setLargeImagesOpen({})}>

                        <div className={cStyles['property-images']}>
                            <Carousel 
                                images={displayLargeImages.map((image, index) => <PropertyImage 
                                    baseUrl={baseUrl} 
                                    name={name}
                                    dots={true}
                                    key={index}
                                    image={image}/>
                                )}
                                onClick={index => setLargeImagesOpen({index})}
                                dots={true}
                                startPosition={largeImagesOpen.index}
                            />

                            <EstateAgencyLogo name={name}/>
                        </div>
                    </Modal>
                }
            </div>
        </FadeIn>
    )
}

export default withTheme(PropertyLarge);