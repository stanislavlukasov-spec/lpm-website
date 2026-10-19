import React, { useState, Fragment, useEffect } from 'react'
import _ from 'lodash'
import { withTheme } from '@mui/styles'
import cStyles from '../../styles/SelectedProperty.module.css'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useStore as globalUseStore } from '../store/global/store'
import PropertyTitle from './PropertyTitle'
import PropertyPrice from './PropertyPrice'
import getComponentCopy from '../store/global/getComponentCopy'
import { getSrc } from './PropertyImage'
import PropertyLocation from './PropertyLocation'
import { PROPERTY } from '../pages/pageSections'
import PropertyImages from './PropertyImages'
import Container from '../Container'
import FilterIcons from '../Filters/FilterIcons'
import Button, { VARIANT_OUTLINED, VARIANT_SECONDARY, VARIANT_PRIMARY} from '../Button'
import Carousel, { Modal, ModalGateway } from "react-images"
import { getBreakPoint, BREAKPOINT_XS, BREAKPOINT_LG } from '../BreakPoint'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ImageIcon from '@mui/icons-material/Image';
import PropertyUrl from './PropertyUrl';
import Grid from '@mui/material/Grid'
import EstateAgencyLogo from '../Logo/EstateAgencyLogo'
import GoogleMaps from '../GoogleMaps'
import singleMultipleText from '../Helpers/singleMultipleText'
import PropertiesYouMayLike from '../Properties/PropertiesYouMayLike'
import { DOMAIN_INFO } from '../store/global/domains'
import Skeleton from '@mui/material/Skeleton'
import NoPropertyImage from './NoPropertyImage'
import { URL, PROPERTY_URL, HEADERS } from '../PropertiesApi/options'
import axios from 'axios'

const SectionSelectedProperty = props => {
    const [state] = globalUseStore()	
    const router = useRouter()
    const { id } = router.query

    const {
		locale = "",
        property = {}
    } = state	

    const [fetching, setFetching] = useState(false)
    const [largeImagesOpen, setLargeImagesOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(property)

    const {
        theme = {}
    } = props

    const {
        baseUrl = "",
        itemName,
        city = "",
        area = "",
        description,
        largeImages = [],
        lat,
        lng,
    } = selectedProperty

    const componentCopy = getComponentCopy({
		state: state,
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
    
    const imageSrc = getSrc({
        baseUrl,
        itemName,
        image: displayLargeImages[0]
    })

    const styles = {
        background: `url(${imageSrc.large}) no-repeat center center / cover`
    }

    const bp = getBreakPoint({
        theme,
        useMediaQuery
    })

    const bpXsmall = bp == BREAKPOINT_XS
    const bpLarge = bp == BREAKPOINT_LG

    const RenderDivider = () => {
        return (
            <Divider className={bpLarge ? cStyles['divider'] : cStyles['divider-sm']}/>
        )
    }

    const agency = DOMAIN_INFO.find(item => item.name == itemName) || {}

    useEffect(() => {
        if(_.isEmpty(selectedProperty) && id && !fetching) {
            setFetching(true)
            
            axios.get(`${URL}/${PROPERTY_URL}/${id}`, { headers: HEADERS })
                .then(res => {
                    const response = res.data || {}
                    setSelectedProperty(response.data || {})
                    setFetching(false)
                })
        }

        if(property.id && property.id !== selectedProperty.id) {
            setSelectedProperty(property)
        }
    })

    const skeletonProps = {
        variant: 'rectangular', 
        width: '100%',
        height: '1.5rem',
        className: cStyles['text']
    }

    return (
        <div className={cStyles['selected-property-background']}>
            <Container small={true}>
                <Button 
                    text="Return"
                    type="third"
                    styles={{
                        margin: '1rem 0',
                        fontWeight: 400
                    }}
                    onClick={e => router.back()}
                    variant={VARIANT_OUTLINED}
                    size="small"
                />

                <div 
                    className={cStyles['section-selected-property']} 
                    onClick={() => setLargeImagesOpen(true)}>

                    {_.isEmpty(selectedProperty) &&
                        <NoPropertyImage fetching={fetching}/>
                    }

                    <div className={cStyles['selected-property--image-container']}>
                        <div 
                            style={styles} 
                            className={cStyles['cover-image']}>
                            
                        </div>

                        {!_.isEmpty(displayLargeImages) &&
                            <div className={cStyles['cover-container']}>
                                <Button 
                                    text={`${displayLargeImages.length} ${singleMultipleText('Image', displayLargeImages.length)}`}
                                    type={VARIANT_SECONDARY}
                                    styles={{
                                        margin: '0 1rem 1rem 0',
                                        fontWeight: 400
                                    }}
                                    onClick={() => setLargeImagesOpen(true)}
                                    endIcon={<ImageIcon />}
                                />
                            </div>
                        }
                    </div>
                </div>

                <div className={cStyles['content']}>
                    <Grid 
                        container 
                        spacing={4}>

                        <Grid item 
                            xs={12} 
                            lg={8}>

                            {fetching 
                            ? 
                                <Fragment>
                                    <Skeleton 
                                        {...skeletonProps}
                                        height="2rem"
                                    />

                                    <Skeleton 
                                        {...skeletonProps}
                                        width="70%"
                                    />  

                                    <Skeleton 
                                        {...skeletonProps}
                                        width="40%"
                                    /> 
                                </Fragment>
                            : 
                                <Fragment>
                                    <Typography 
                                        component="h1" 
                                        variant={bpXsmall ? "h3" : "h2"}>

                                        {title}
                                    </Typography>

                                    {location &&
                                        <Typography 
                                            component="p" 
                                            variant="h4"
                                            className={cStyles['text']}>

                                            {location}
                                        </Typography>
                                    }

                                    {price &&
                                        <Typography 
                                            component="p" 
                                            variant="h3"
                                            className={cStyles['text']}>

                                            {price}
                                        </Typography>
                                    }
                                </Fragment>
                            }

                            <RenderDivider />
                        </Grid>

                        <Grid 
                            style={!bpLarge ? { paddingTop: 0 } : {}}
                            item xs={12} 
                            lg={4}>

                            {fetching 
                                ? 
                                    <Fragment>
                                        <Skeleton 
                                            {...skeletonProps}
                                            height="2rem"
                                        /> 

                                        <Skeleton 
                                            {...skeletonProps}
                                        /> 
                                    </Fragment>
                                :
                                !_.isEmpty(agency) &&
                                    <Fragment>
                                        <div className={cStyles['container-flex']}>
                                            <Typography 
                                                component="p" 
                                                variant="h4">
                    
                                                Hosted by {agency.title}
                                            </Typography>

                                            <EstateAgencyLogo 
                                                name={itemName}
                                                className={cStyles['estate-logo']}
                                            />
                                        </div>

                                        <Button 
                                            text="View on agency website"
                                            type={VARIANT_PRIMARY}
                                            styles={{
                                                margin: '1rem 0 0'
                                            }}
                                            onClick={e => window.open(PropertyUrl(selectedProperty), '_blank')}
                                            endIcon={<OpenInNewIcon />}
                                        />

                                        {!bpLarge &&
                                            <RenderDivider />
                                        }
                                    </Fragment>
                            }
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item 
                            xs={12}
                            lg={8}>

                        {fetching 
                            ?
                                <Fragment>
                                    <Skeleton 
                                        {...skeletonProps}
                                    /> 

                                    <Skeleton 
                                        {...skeletonProps}
                                    /> 

                                    <Skeleton 
                                        {...skeletonProps}
                                    /> 
                                </Fragment>
                            :
                            description &&
                                <Fragment>
                                    <Typography 
                                        component="p" 
                                        variant="h3">
            
                                        Description
                                    </Typography>

                                    <Typography 
                                        component="p" 
                                        className={cStyles['large-marging-text']}>

                                        {description}
                                    </Typography>
                                </Fragment>
                        }
                        </Grid>
                        
                        <Grid 
                            item 
                            xs={12}
                            lg={4}>

                            {fetching 
                                ?
                                    <Fragment>
                                        <Skeleton 
                                            {...skeletonProps}
                                        /> 

                                        <Skeleton 
                                            {...skeletonProps}
                                        /> 

                                        <Skeleton 
                                            {...skeletonProps}
                                        /> 
                                    </Fragment>
                                :
                                <Fragment>
                                    <Typography 
                                        component="p" 
                                        variant="h3">
            
                                        What it offers
                                    </Typography>

                                    <FilterIcons 
                                        items={selectedProperty}
                                        color="primary"
                                        className={cStyles['large-marging-text']}
                                    />
                                </Fragment>
                            }
                        </Grid>
                    </Grid>

                    {(lat && lng) &&
                        <Fragment>
                            <RenderDivider />

                            <Typography 
                                component="p" 
                                variant="h3">

                                Find it on the map
                            </Typography>

                            <GoogleMaps 
                                {...selectedProperty} 
                                className={cStyles['large-marging-text']}
                            />
                        </Fragment>
                    }

                    <RenderDivider />

                    {fetching 
                        ?
                            <Fragment>
                                <Skeleton 
                                    {...skeletonProps}
                                /> 

                                <Skeleton 
                                    {...skeletonProps}
                                /> 

                                <Skeleton 
                                    {...skeletonProps}
                                /> 
                            </Fragment>
                        :
                        <Fragment>
                            <Typography 
                                component="p" 
                                variant="h3">

                                Properties you may like
                            </Typography>

                            <PropertiesYouMayLike 
                                {...selectedProperty}
                                key={selectedProperty.id}
                            />
                        </Fragment>
                    }

                </div>
            </Container>

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