import React, { useState } from 'react'
import _ from 'lodash'
import cStyles from '../../styles/Filters.module.css'
import { withTheme } from '@mui/styles';
import { useStore } from '../store/global/store'
import { setSearchUuid, setFilters } from '../store/global/reducer'
import setFiltersUrlParams from '../store/global/setFiltersUrlParams'
import MenuItem from '@mui/material/MenuItem';
import Select from '../Select';
import Button from '../Button';
import { SECTION_FILTERS } from '../pages/pageSections'
import { INT_OPTIONS } from './options'
import { BUILDING_TYPES, TYPES } from '../store/global/types'
import getComponentCopy from '../store/global/getComponentCopy'
import { ROUTE_SEARCH_PAGE } from '../Settings/routes'
import { useRouter } from 'next/router'

const FilterHero = props => {
    const [state, dispatch] = useStore()

    const {
        filters = {}
    } = state

    const [localFilters, setLocalFilters] = useState(!_.isEmpty(filters) ? filters : { saleRent: 'Sale' })
    const filtersUrlParams = setFiltersUrlParams(localFilters)
    const router = useRouter()

    const {
        theme = {},
        selectWidths = {
            district: '10rem',
            saleRent: '6rem',
            bedrooms: '8rem',
            type: '9rem'
        },
        styles = {},
        buttonStyles = {},
        applyOnChange
    } = props

    const {
        cities = []
    } = state

    const {
        district = "",
        bathrooms = "",
        bedrooms = "",
        type = "",
        saleRent = ""
    } = localFilters

    const componentCopy = getComponentCopy({
		state,
		section: SECTION_FILTERS
	})

    const formProps = {
        sx: {
            m: 1 
        },
        style: {
            borderRight: `0.065rem solid ${theme.palette.grey[200]}`
        }
    }
    
    return (
        <div 
            id="filters-container--hero"
            className={cStyles['filters-container--hero']}
            style={styles}>

            <Select
                value={district}
                onChange={value => {
                    setLocalFilters({
                        ...localFilters,
                        district: value
                    })
                }}
                formProps={formProps}
                type="no-border"
                label={componentCopy.district}
                style={{ width: selectWidths.district}}>

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

            <Select
                value={saleRent}
                onChange={value => {
                    setLocalFilters({
                        ...localFilters,
                        saleRent: value
                    })
                }}
                style={{ minWidth: selectWidths.saleRent}}
                formProps={formProps}
                type="no-border"
                label={componentCopy.type}
                displayEmpty>

                <MenuItem disabled selected value="">
                    {componentCopy.any}
                </MenuItem>

                {TYPES.map((item, index) => (
                    <MenuItem 
                        value={item} 
                        key={index}>

                        {item}
                    </MenuItem>
                ))}
            </Select>

            <Select
                value={Number.isInteger(bedrooms) ? `${bedrooms}+` : bedrooms}
                onChange={value => {
                    setLocalFilters({
                        ...localFilters,
                        bedrooms: value
                    })
                }}
                style={{ minWidth: selectWidths.bedrooms}}
                formProps={formProps}
                type="no-border"
                label={componentCopy.bedrooms}
                displayEmpty>

                <MenuItem disabled selected value="">
                    {componentCopy.any}
                </MenuItem>

                {INT_OPTIONS.map((item, index) => (
                    <MenuItem 
                        value={item} 
                        key={index}>

                        {item}
                    </MenuItem>
                ))}
            </Select>

            <Select
                value={Number.isInteger(bathrooms) ? `${bathrooms}+` : bathrooms}
                onChange={value => {
                    setLocalFilters({
                        ...localFilters,
                        bathrooms: value
                    })
                }}
                style={{ minWidth: selectWidths.bedrooms}}
                formProps={formProps}
                type="no-border"
                label={componentCopy.bathrooms}
                displayEmpty>

                <MenuItem disabled selected value="">
                    {componentCopy.any}
                </MenuItem>

                {INT_OPTIONS.map((item, index) => (
                    <MenuItem 
                        value={item} 
                        key={index}>

                        {item}
                    </MenuItem>
                ))}
            </Select>

            <Select
                value={type}
                onChange={value => {
                    setLocalFilters({
                        ...localFilters,
                        type: value
                    })
                }}
                style={{ minWidth: selectWidths.type}}
                formProps={{ m: 1 }}
                type="no-border"
                label={componentCopy.propertyType}
                displayEmpty>

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

            {!applyOnChange &&
                <Button 
                    text={componentCopy.explore}
                    styles={{
                        ...theme.typography.subtitle1,
                        height: '4.625rem',
                        padding: '0 4rem',
                        borderRadius: theme.shape.borderRadius,
                        ...buttonStyles
                    }}
                    onClick={() => {
                        dispatch(setFilters(localFilters))
                        router.push(`${ROUTE_SEARCH_PAGE}?${filtersUrlParams}`)
                        setTimeout(()=> {
                            dispatch(setSearchUuid())
                        }, 300)
                    }}
                />
            }
        </div>
    )
}

export default withTheme(FilterHero)