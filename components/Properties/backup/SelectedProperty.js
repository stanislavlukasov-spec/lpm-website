import React, { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
import { withTheme } from '@mui/styles'
import cStyles from '../../styles/Properties.Selected.module.css'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useStore as globalUseStore } from '../store/global/store'
import PropertyTitle from './PropertyTitle'
import PropertyPrice from './PropertyPrice'
import getComponentCopy from '../store/global/getComponentCopy'
import { getSrc } from './PropertyImage'
import PropertyLocation from './PropertyLocation'
import { PROPERTY } from '../pages/pageSections'
import NoPropertySelected from './NoPropertySelected'
import getUrlOptions from '../store/global/getUrlOptions'
import PropertyImages from './PropertyImages'
import Container from '../Container'
import { parseLetters } from '../Helpers/parseLetters'
import FilterIcons from '../Filters/FilterIcons'
import Button, { VARIANT_SECONDARY, VARIANT_PRIMARY} from '../Button'
import Carousel, { Modal, ModalGateway } from "react-images"
import { getBreakPoint, BREAKPOINT_XS, BREAKPOINT_LG } from '../BreakPoint'
import useMediaQuery from '@mui/material/useMediaQuery'
import { join } from '../Helpers/joinClasses'
import { useRouter } from 'next/router'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ImageIcon from '@mui/icons-material/Image';
import ModalComponent from '../Modal'
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded'
import $ from 'jquery'
import PropertyUrl from './PropertyUrl';

const SectionSelectedProperty = props => {
    const [globalState] = globalUseStore()	
    const router = useRouter()

    const {
		locale = "",
        properties = [],
        recentPropertiesRent = [],
        recentPropertiesSale = [],
    } = globalState	

    const propertiesRef = useRef()
    propertiesRef.current = properties

    const propertiesSaleRef = useRef()
    propertiesSaleRef.current = recentPropertiesSale

    const [selectedId, setSelectedId] = useState("")
    const [selectedProperty, setSelectedProperty] = useState({})
    const [propertiesHistory, setPropertiesHistory] = useState(propertiesRef.current)
    const [propertiesSaleHistory, setPropertiesSaleHistory] = useState(propertiesSaleRef.current)
    const [largeImagesOpen, setLargeImagesOpen] = useState(false)
    const [readMore, setReadMore] = useState(false)

    const {
        theme = {}
    } = props

    const {
        baseUrl = "",
        url = "",
        itemName = "",
        city = "",
        area = "",
        description,
        largeImages = [],
    } = selectedProperty

    function setProperty() {
        const optionsFromUrl = getUrlOptions()
        const id = optionsFromUrl.id

        if((id && selectedId !== id) || _.isEmpty(selectedProperty) && id) {
            let selectedProperty = propertiesRef.current.find(item => item.id == id) || {}

            if(_.isEmpty(selectedProperty)) {
                selectedProperty = recentPropertiesRent.find(item => item.id == id) || {}
            }

            if(_.isEmpty(selectedProperty)) {
                selectedProperty = propertiesSaleRef.current.find(item => item.id == id) || {}
            }

            setSelectedProperty(selectedProperty)
            setSelectedId(id)
        }

        if(_.isEmpty(id)) {
            setSelectedProperty({})
        }
    }

    useEffect(() => {
        router.events.on("routeChangeComplete", () => {
            setProperty()
        });
        
     }, [router.events]);

    useEffect(() => {
        setProperty()
    }, [])

    useEffect(() => {
        if(!_.isEqual(propertiesHistory, propertiesRef.current)) {
            setProperty()
            setPropertiesHistory(propertiesRef.current)
        }

        if(!_.isEqual(propertiesSaleHistory, propertiesSaleRef.current)) {
            setProperty()
            setPropertiesSaleHistory(propertiesSaleRef.current)
        }
    })

    const componentCopy = getComponentCopy({
		state: globalState,
		section: PROPERTY
    })

    const title = PropertyTitle({
        componentCopy,
        ...selectedProperty
    })

    const price = PropertyPrice({
        ...selectedProperty,
        componentCopy,
        locale
    })

    const location = PropertyLocation({
        area,
        city
    })

    const displayLargeImages = PropertyImages(largeImages)
    const src = getSrc({
        baseUrl,
        itemName,
        image: displayLargeImages[0]
    })

    const styles = {
        background: `url(${src.large}) no-repeat center center / cover`
    }

    const bp = getBreakPoint({
        theme,
        useMediaQuery
    })

    const XSMALL = bp == BREAKPOINT_XS
    const SUBSTRING = XSMALL ? 160 : 400
    let descriptionSubstring = description

    if (descriptionSubstring && descriptionSubstring.length > SUBSTRING) {
        descriptionSubstring = descriptionSubstring.substring(0, SUBSTRING) + "..."
    }

    function handleTextClick(e) {
        e.stopPropagation()
    }

    return (
        <div className={cStyles['section-selected-property']}>
            {_.isEmpty(selectedProperty) &&
                <NoPropertySelected />
            }

            {!_.isEmpty(selectedProperty) &&
                <div className={cStyles['selected-property--image-container']}>
                    <div 
                        style={styles} 
                        className={cStyles['cover-image']}>
                        
                    </div>

                    <div className={join(cStyles['gradient'], cStyles['cover-container'])}></div>
                    <div 
                        style={{ backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, transparent)` }}
                        className={join(cStyles['gradient-top'], cStyles['cover-container'])}>
                    </div>

                    <div className={join(cStyles['cover-copy'], cStyles['cover-container'])}>
                        <Container 
                            className={cStyles['height-container']}  
                            onClick={() => setLargeImagesOpen(true)}>

                            <div className={cStyles['cover-copy-container']}>
                                {title &&
                                    <Typography 
                                        component="h2" 
                                        onClick={e => handleTextClick(e)}
                                        variant={XSMALL ? "h3" : "h2"}>
        
                                        {title}
                                    </Typography>
                                }

                                {location &&
                                    <Typography 
                                        component="h4" 
                                        variant={XSMALL ? "h5" : "h4"}
                                        onClick={e => handleTextClick(e)}
                                        style={{ 
                                            marginTop: '0.5rem'
                                        }}>
        
                                        {location}
                                    </Typography>
                                }

                                {price &&
                                    <Typography 
                                        component="h3" 
                                        variant={XSMALL ? "h4" : "h3"}
                                        onClick={e => handleTextClick(e)}
                                        style={{ 
                                            marginTop: '0.5rem'
                                        }}>
        
                                        {price}
                                    </Typography>
                                }

                                <div>
                                    {descriptionSubstring &&
                                        <Typography 
                                            component="p" 
                                            variant={XSMALL ? "body2" : "body1"}
                                            onClick={e => handleTextClick(e)}
                                            style={{ 
                                                marginTop: '0.5rem',
                                                color: 'white'
                                            }}>
            
                                            {descriptionSubstring}
                                        </Typography>
                                    }

                                    <div className={cStyles['container-flex']}>
                                        <Button 
                                            text="Read More"
                                            type="third"
                                            styles={{
                                                margin: '1rem 0.5rem 0 0',
                                                fontWeight: 400
                                            }}
                                            onClick={e => {
                                                handleTextClick(e)
                                                setReadMore(true)
                                            }}
                                        />

                                        <Button 
                                            text="Images"
                                            type="third"
                                            styles={{
                                                margin: '1rem 0.5rem 0 0',
                                                fontWeight: 400
                                            }}
                                            onClick={() => setLargeImagesOpen(true)}
                                            endIcon={<ImageIcon />}
                                        />
                                    </div>
                                </div>

                                <div className={XSMALL ? '' : cStyles['container-flex']}>
                                    <Button 
                                        text="Estate Agency Website"
                                        type={VARIANT_SECONDARY}
                                        variant="outlined"
                                        styles={{
                                            margin: XSMALL ? '1rem 0.5rem 0 0' : '2rem 0.5rem 0 0',
                                            fontWeight: 400,
                                        }}
                                        onClick={e => {
                                            handleTextClick(e)
                                            window.open(PropertyUrl(selectedProperty), '_blank');
                                        }}
                                        endIcon={<OpenInNewIcon />}
                                    />

                                    <Button 
                                        text="Scroll Down"
                                        className={cStyles['button-pulsating']}
                                        type={VARIANT_SECONDARY}
                                        variant="outlined"
                                        styles={{
                                            margin: XSMALL ? '1rem 0 0' : '2rem 0 0',
                                            fontWeight: 400,
                                        }}
                                        onClick={e => {
                                            handleTextClick(e)
                                            const item = $(`#${parseLetters(selectedProperty.id)}`) || {}

                                            if(item.length > 0) {
                                                $('html, body').animate({
                                                    scrollTop: item.offset().top
                                                }, 500);
                                            }
                                        }}
                                        endIcon={<ArrowCircleDownRoundedIcon />}
                                    />
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            }

            {readMore &&
                <ModalComponent 
                    open={readMore}
                    handleClose={() => setReadMore(false)}>

                    <Container>
                        <div className={cStyles['readmore-container']}>
                            {description &&
                                <div>
                                    <Typography 
                                        component="h3" 
                                        variant="h3"
                                        style={{ marginBottom: '1rem' }}>
        
                                        Description
                                    </Typography>

                                    <Typography 
                                        component="p" 
                                        variant="body1">
        
                                        {description}
                                    </Typography>

                                    <Divider 
                                        style={{ margin: '1rem 0' }} 
                                        color={theme.palette.grey[50]}
                                    />
                                </div>
                            }

                            <Typography 
                                component="h3" 
                                variant="h3"
                                style={{ marginBottom: '1rem' }}>

                                Additional Information
                            </Typography>

                            <FilterIcons 
                                items={selectedProperty}
                                color="primary"
                            />
                        </div>
                    </Container>
                </ModalComponent>
            }           

            <ModalGateway>
                {largeImagesOpen &&
                    <Modal onClose={() => setLargeImagesOpen(false)}>
                        <Carousel
                            currentIndex={0}
                            views={displayLargeImages.map(item => {
                                const src = getSrc({
                                    baseUrl,
                                    itemName,
                                    image: item
                                })
        
                                return {
                                    src: src.large
                                }
                            })}
                        />
                    </Modal>
                }
            </ModalGateway>
        </div>
    )
}

export default withTheme(SectionSelectedProperty);