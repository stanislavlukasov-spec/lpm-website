import React, { useCallback, useRef, useState } from 'react'
import { withTheme } from '@mui/styles';
import { useStore } from '../store/global/store'
import Container from '../Container'
import Modal from '../Modal'
import { setSearchUuid, setOpenFilters, setFilters } from '../store/global/reducer'
import Typography from '@mui/material/Typography';
import getComponentCopy from '../store/global/getComponentCopy'
import Select from '../Select'
import Autocomplete from '../Select/Autocomplete'
import { BUILDING_TYPES, TYPES, SUB_TYPES, TYPE_SALE } from '../store/global/types'
import MenuItem from '@mui/material/MenuItem';
import DoubleBasicContainer from '../DoubleContent/BasicContainer'
import Divider from '@mui/material/Divider';
import Button from '../Button'
import CountButtons from '../Button/CountButtons'
import Switch from '../Switch'
import { useRouter } from 'next/router'
import Chip from '../Chip'
import PropertyDistanceToTheSea from '../Properties/PropertyDistanceToTheSea'
import getCurrencyIcon from '../Helpers/getCurrencyIcon'
import { ROUTE_SEARCH_PAGE } from '../Settings/routes'
import setFiltersUrlParams from '../store/global/setFiltersUrlParams'

import { 
	SECTION_FILTERS,
} from '../pages/pageSections'

const DynamicFilters = props => {
    const [state, dispatch] = useStore()
    const router = useRouter()

    const {
        cities = [],
        areas = [],
        locale,
        currency,
        openFilters,
        filters = {}
    } = state

    const [localFilters, setLocalFilters] = useState(filters)
    const localFiltersRef = useRef()
    localFiltersRef.current = localFilters

    const {
        saleRent = "",
        type = "",
        district = "",
        area = "",
        subType = "",
        bedrooms = 0,
        bathrooms = 0,
        storeys = 0,
        newBuild, 
        pool, 
        distanceToTheSea = "",
        totalArea = "",
        livingSpace = "",
        price = "",
    } = localFilters

    const {
        theme
    } = props

    const componentCopy = getComponentCopy({
		state,
		section: SECTION_FILTERS
	})

    function convertToCurrency(price) {
        return getCurrencyIcon({
            locale,
            currency,
            price: price.toString()
        })
    }

    let commonProps = {
        formProps: {
            sx: {
                m: 1 
            },
            style: {
                borderRight: `0.065rem solid ${theme.palette.grey[200]}`
            }
        },
        containerStyles: {
            width: '100%', 
            margin: '1.5rem 0 0'
        },
        displayEmpty: true
    }

    const handleOnClick = useCallback(() => {        
        dispatch(setFilters(localFiltersRef.current))
        dispatch(setOpenFilters(false))

        const filtersUrlParams = setFiltersUrlParams(localFiltersRef.current)

        setTimeout(() => {
            dispatch(setSearchUuid())
            router.push(`${ROUTE_SEARCH_PAGE}?${filtersUrlParams}`)
        }, 300)
    }, []);

    const RenderDivider = () => (
        <Divider 
            style={{ marginTop: '2rem' }} 
            color={theme.palette.grey[50]}
        />
    )

    let priceOptions = [
        '500',
        '1000',
        '1500',
        '2500',
        '4000',
        '6000',
        '10000'
    ]

    if(saleRent == TYPE_SALE) {
        priceOptions = [
            '25000',
            '50000',
            '100000',
            '150000',
            '250000',
            '400000',
            '700000',
            '1000000',
            '1500000'
        ]
    }

    let livingSpaceOptions = [
        10,
        50,
        100,
        200,
        500,
        '1000'
    ]

    let distanceToSeaOptions = [
        0,
        100,
        250,
        500,
        1000,
        '2000'
    ]

    const convertPrice = price => {
        if(_.isString(price)) {
            return convertToCurrency(price) + '+'
        }

        return convertToCurrency(price)
    }

    const convertArea = area => {
        if(_.isString(area)) {
            return `${area}+㎡`
        }

        return area+'㎡'
    }

    const convertDistance = distance => {
        if(_.isString(distance)) {
            return PropertyDistanceToTheSea(distance) + '+'
        }

        return PropertyDistanceToTheSea(distance)
    }

    return (
        <Container>
            {openFilters &&
                <Modal 
                    open={openFilters}
                    modalClassName="modal-content-container--40rem"
                    handleClose={() => dispatch(setOpenFilters(false))}>

                    <Typography 
						component="h3" 
						variant="h3">

						{componentCopy.filters}
					</Typography>

                    <DoubleBasicContainer>
                        <div>
                            <Select
                                value={saleRent}
                                onChange={value => {
                                    let updatedFilters = {...localFilters}
                                    delete updatedFilters.price

                                    setLocalFilters({
                                        ...updatedFilters,
                                        saleRent: value
                                    })
                                }}
                                label={componentCopy.type}
                                {...commonProps}>

                                <MenuItem disabled selected value="">
                                    {componentCopy.saleAndRent}
                                </MenuItem>

                                {TYPES.map((item, index) => (
                                    <MenuItem 
                                        value={item} 
                                        key={index}>

                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        
                        <div>
                            <Select
                                value={type}
                                onChange={value => {
                                    setLocalFilters({
                                        ...localFilters,
                                        type: value
                                    })
                                }}
                                {...commonProps}
                                label={componentCopy.propertyType}>

                                <MenuItem disabled selected value="">
                                    {componentCopy.any}
                                </MenuItem>

                                {BUILDING_TYPES.map((item, index) => (
                                    <MenuItem 
                                        value={item} 
                                        key={index}>

                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </DoubleBasicContainer>

                    <Select
                        value={district}
                        onChange={value => {
                            setLocalFilters({
                                ...localFilters,
                                district: value
                            })
                        }}
                        label={componentCopy.district}
                        {...commonProps}>

                        <MenuItem disabled selected value="">
                            {componentCopy.any}
                        </MenuItem>

                        {cities.map((item, index) => (
                            <MenuItem 
                                value={item} 
                                key={index}>

                                {item}
                            </MenuItem>
                        ))}
                    </Select>

                    <Autocomplete 
                        label={componentCopy.area}
                        {...commonProps}
                        value={area}
                        placeholder={componentCopy.anyArea}
                        options={areas[district] || []}
                        onChange={value => {
                            setLocalFilters({
                                ...localFilters,
                                area: value
                            })
                        }}
                    />

                    <RenderDivider />

                    <CountButtons 
                        text={componentCopy.bedrooms}
                        value={bedrooms}
                        styles={commonProps.containerStyles}
                        handleChange={value => {
                            setLocalFilters({
                                ...localFilters,
                                bedrooms: value
                            })
                        }}
                    />

                    <CountButtons 
                        text={componentCopy.bathrooms}
                        value={bathrooms}
                        styles={commonProps.containerStyles}
                        handleChange={value => {
                            setLocalFilters({
                                ...localFilters,
                                bathrooms: value
                            })
                        }}
                    />

                    <CountButtons 
                        text={componentCopy.storeys}
                        value={storeys}
                        styles={commonProps.containerStyles}
                        handleChange={value => {
                            setLocalFilters({
                                ...localFilters,
                                storeys: value
                            })
                        }}
                    />

                    <RenderDivider />

                    <div style={commonProps.containerStyles}>
                        <Typography 
                            component="span" 
                            variant="body1"
                            style={theme.typography.body1}> 

                            Price From
                        </Typography>

                        <div>
                            {priceOptions.map((item, index) => {
                                return (
                                    <Chip 
                                        label={convertPrice(item)}
                                        active={parseInt(price) == item}
                                        key={index}
                                        handleClick={() => {
                                            setLocalFilters({
                                                ...localFilters,
                                                price: item
                                            })
                                        }}
                                        handleDelete={() => {
                                            let updatedFilters = {...localFilters}
                                            delete updatedFilters.price
                                            setLocalFilters({
                                                ...updatedFilters
                                            })
                                        }}
                                    />
                                )
                            })} 
                        </div>
                    </div>

                    <RenderDivider />

                    <div style={commonProps.containerStyles}>
                        <Typography 
                            component="span" 
                            variant="body1"
                            style={theme.typography.body1}> 

                            Living Space From
                        </Typography>

                        <div>
                            {livingSpaceOptions.map((item, index) => {
                                return (
                                    <Chip  
                                        label={convertArea(item)}
                                        active={parseInt(livingSpace) == item}
                                        key={index}
                                        handleClick={() => {
                                            setLocalFilters({
                                                ...localFilters,
                                                livingSpace: item
                                            })
                                        }}
                                        handleDelete={() => {
                                            let updatedFilters = {...localFilters}
                                            delete updatedFilters.livingSpace
                                            setLocalFilters({
                                                ...updatedFilters
                                            })
                                        }}
                                    />
                                )
                            })} 
                        </div>
                    </div>

                    <RenderDivider />

                    <div style={commonProps.containerStyles}>
                        <Typography 
                            component="span" 
                            variant="body1"
                            style={theme.typography.body1}> 

                            Total Area From
                        </Typography>  

                        <div>
                            {livingSpaceOptions.map((item, index) => (
                                <Chip 
                                    label={convertArea(item)}
                                    active={parseInt(totalArea) == item}
                                    key={index}
                                    handleClick={() => {
                                        setLocalFilters({
                                            ...localFilters,
                                            totalArea: item
                                        })
                                    }}
                                    handleDelete={() => {
                                        let updatedFilters = {...localFilters}
                                        delete updatedFilters.totalArea
                                        setLocalFilters({
                                            ...updatedFilters
                                        })
                                    }}
                                />
                            ))} 
                        </div>          
                    </div>

                    <RenderDivider />

                    <div style={commonProps.containerStyles}>
                        <Typography 
                            component="span" 
                            variant="body1"
                            style={theme.typography.body1}> 

                            Distance To The Sea Up To
                        </Typography>  

                        <div>
                            {distanceToSeaOptions.map((item, index) => (
                                <Chip 
                                    label={convertDistance(item)}
                                    active={parseInt(distanceToTheSea) == item}
                                    key={index}
                                    handleClick={() => {
                                        setLocalFilters({
                                            ...localFilters,
                                            distanceToTheSea: item
                                        })
                                    }}
                                    handleDelete={() => {
                                        let updatedFilters = {...localFilters}
                                        delete updatedFilters.distanceToTheSea
                                        setLocalFilters({
                                            ...updatedFilters
                                        })
                                    }}
                                />
                            ))} 
                        </div>          
                    </div>

                    <RenderDivider />

                    <Switch 
                        label={componentCopy.pool}
                        styles={commonProps.containerStyles}
                        checked={pool}
                        onChange={value => {
                            let updatedFilters = {...localFilters}
                            if(value) updatedFilters.pool = true
                            if(!value) delete updatedFilters.pool

                            setLocalFilters(updatedFilters)
                        }}
                    />

                    <Switch 
                        label={componentCopy.newBuild}
                        styles={commonProps.containerStyles}
                        checked={newBuild}
                        onChange={value => {
                            let updatedFilters = {...localFilters}
                            if(value) updatedFilters.newBuild = true
                            if(!value) delete updatedFilters.newBuild

                            setLocalFilters(updatedFilters)
                        }}
                    />

                    <Button 
                        text={componentCopy.applyFilters}
                        styles={{
                            marginTop: '2rem',
                            ...theme.typography.h5,
                            padding: '0.7rem 2rem',
                            width: '100%'
                        }}
                        onClick={handleOnClick}
                    />
                </Modal>
            }
        </Container>
    )
}

export default withTheme(DynamicFilters);