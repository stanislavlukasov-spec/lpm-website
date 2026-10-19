import React from 'react'
import cStyles from '../../styles/Filters.module.css'
import { withTheme } from '@mui/styles';
import { useStore } from '../store/global/store'
import { 
    FILTERS, 
    FILTER_TYPE_DISTANCE, 
    FILTER_TYPE_BOOL, 
    FILTER_TYPE_METERS,
    FILTER_BEDROOMS, 
    FILTER_BATHROOMS, 
    FILTER_LIVING_SPACE, 
    FILTER_TOTAL_AREA, 
    FILTER_POOL, 
    FILTER_NEW_BUILDING,
    FILTER_PARKING,
    FILTER_STOREYS,
    FILTER_APPLIENCES,
    FILTER_VIEW,
    FILTER_FURNITURE,
    FILTER_AIR_CONDITIONING,
    FILTER_DISTANCE_TO_THE_SEA,
    FILTER_YEAR_OF_CONSTRUCTION,
    FILTER_GATED_COMPLEX,
    FILTER_TITLE
} from './options'
import PropertyDistanceToTheSea from '../Properties/PropertyDistanceToTheSea'
import { SECTION_FILTERS } from '../pages/pageSections'
import getComponentCopy from '../store/global/getComponentCopy'
import Typography from '@mui/material/Typography'
import { join } from '../Helpers/joinClasses'

export function orderFilters(filters) {
    let result = []

    if(filters[FILTER_BEDROOMS]) result.push({name: FILTER_BEDROOMS, value: filters[FILTER_BEDROOMS]})
    if(filters[FILTER_BATHROOMS]) result.push({name: FILTER_BATHROOMS, value: filters[FILTER_BATHROOMS]})
    if(filters[FILTER_LIVING_SPACE]) result.push({name: FILTER_LIVING_SPACE, value: filters[FILTER_LIVING_SPACE]})
    if(filters[FILTER_TOTAL_AREA]) result.push({name: FILTER_TOTAL_AREA, value: filters[FILTER_TOTAL_AREA]})
    if(filters[FILTER_POOL]) result.push({name: FILTER_POOL, value: filters[FILTER_POOL]})
    if(filters[FILTER_NEW_BUILDING]) result.push({name: FILTER_NEW_BUILDING, value: filters[FILTER_NEW_BUILDING]})
    if(filters[FILTER_PARKING]) result.push({name: FILTER_PARKING, value: filters[FILTER_PARKING]})
    if(filters[FILTER_STOREYS]) result.push({name: FILTER_STOREYS, value: filters[FILTER_STOREYS]})
    if(filters[FILTER_APPLIENCES]) result.push({name: FILTER_APPLIENCES, value: filters[FILTER_APPLIENCES]})
    if(filters[FILTER_VIEW]) result.push({name: FILTER_VIEW, value: filters[FILTER_VIEW]})
    if(filters[FILTER_FURNITURE]) result.push({name: FILTER_FURNITURE, value: filters[FILTER_FURNITURE]})
    if(filters[FILTER_AIR_CONDITIONING]) result.push({name: FILTER_AIR_CONDITIONING, value: filters[FILTER_AIR_CONDITIONING]})
    if(filters[FILTER_DISTANCE_TO_THE_SEA]) result.push({name: FILTER_DISTANCE_TO_THE_SEA, value: filters[FILTER_DISTANCE_TO_THE_SEA]})
    if(filters[FILTER_YEAR_OF_CONSTRUCTION]) result.push({name: FILTER_YEAR_OF_CONSTRUCTION, value: filters[FILTER_YEAR_OF_CONSTRUCTION]})
    if(filters[FILTER_GATED_COMPLEX]) result.push({name: FILTER_GATED_COMPLEX, value: filters[FILTER_GATED_COMPLEX]})
    if(filters[FILTER_TITLE]) result.push({name: FILTER_TITLE, value: filters[FILTER_TITLE]})

    return result
}

export function getFilterIconText(props) {
    const {
        filterItem = {},
        value
    } = props 

    const {
        type = ""
    } = filterItem

    let result = value

    switch (type) {
        case FILTER_TYPE_BOOL:
            result = ''
        break;

        case FILTER_TYPE_DISTANCE:
            result = PropertyDistanceToTheSea(value)
        break;

        case FILTER_TYPE_METERS:
            result = value+' ㎡'
        break;
    }

    return result
}

const FilterIcons = props => {
    const [state] = useStore()

    const {
        items = {},
        styles = {},
        className = ""
    } = props

    const componentCopy = getComponentCopy({
		state,
		section: SECTION_FILTERS
    })

    const orderedFilters = orderFilters(items)

    return (
        <div 
            className={join(cStyles['filter-icons'], className)}
            style={styles}>

            {orderedFilters.map((item, index) => {
                const filterItem = FILTERS.find(fitem => fitem.name == item.name)

                if(!filterItem) {
                    return false
                }

                const itemText = getFilterIconText({filterItem, value: item.value, componentCopy})

                return (
                    <div className={cStyles['grid-item']}>
                        <filterItem.icon className={cStyles['icon']} />

                        <div>
                            <Typography 
                                component="p"
                                variant="body1">

                                <b>{componentCopy[filterItem.name]}</b>
                            </Typography>

                            {itemText &&
                                <Typography 
                                    component="p"
                                    variant="body1">
        
                                    {itemText}
                                </Typography>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default withTheme(FilterIcons);