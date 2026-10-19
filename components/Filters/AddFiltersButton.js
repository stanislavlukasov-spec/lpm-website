import React from 'react'
import _ from 'lodash'
import cStyles from '../../styles/Filters.module.css'
import { withTheme } from '@mui/styles';
import getUrlOptions from '../store/global/getUrlOptions'
import Button, { VARIANT_SECONDARY } from '../Button'
import SearchIcon from '@mui/icons-material/Search'
import { getBreakPoint, BREAKPOINT_XS } from '../BreakPoint'
import useMediaQuery from '@mui/material/useMediaQuery'
import FindPropertyButton from '../Heros/FindPropertyButton'

function getTextString(bp, filters) {
    const {
        district = "",
        bedrooms,
        bathrooms
    } = filters

    let bedText = "Bedroom"
    let bathText = "Bathroom"

    if(bp == BREAKPOINT_XS) {
        bedText = "Bed"
        bathText = "Bath"
    }

    let array = []

    if(district) array.push(district)
    if(bedrooms) array.push(`${bedrooms} ${bedText}`)
    if(bathrooms) array.push(`${bathrooms} ${bathText}`)

    if(_.isEmpty(array)) {
        return "Let's find your property"
    }

    return array.join(' | ')
}

const AddFiltersButton = props => {
    const {
        theme,
        handleFiltersOpen = () => {},
        filled
    } = props
    
    return (
        <div className={cStyles['add-filters-button']}>
            <FindPropertyButton onClick={() => handleFiltersOpen(true)}/>
        </div>
    )
}

export default withTheme(AddFiltersButton);