import React, { useRef, Fragment } from 'react'
import _ from 'lodash'
import cStyles from '../../styles/Filters.module.css'
import { withTheme } from '@mui/styles';
import { useStore } from '../store/global/store'
import Container from '../Container'
import { setSearchUuid, setOpenFilters, setFilters } from '../store/global/reducer'
import Chip from '../Chip'
import FilterListIcon from '@mui/icons-material/FilterList'
import { getBreakPoint, BREAKPOINT_LG } from '../BreakPoint'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import Button from '../Button'
import { getUserFilters } from './userFilters'
import singleMultipleText from '../Helpers/singleMultipleText'
import setFiltersUrlParams from '../store/global/setFiltersUrlParams'
import { ROUTE_SEARCH_PAGE } from '../Settings/routes'

const FavouriteFilters = props => {
    const {
        theme = {}
    } = props

    const [state, dispatch] = useStore()

    const {
        filters = {}
    } = state

    const router = useRouter()
    const filtersRef = useRef()
    filtersRef.current = filters

    const userFilters = getUserFilters(filtersRef.current)
    const userFiltersLength = Object.keys(userFilters).length

    const bp = getBreakPoint({
        theme,
        useMediaQuery
    })

    function handleClick(filter) {
        const updatedFilters = {
            ...filtersRef.current,
            ...filter  
        }

        const filtersUrlParams = setFiltersUrlParams(updatedFilters)

        dispatch(setFilters(updatedFilters))
        router.push(`${ROUTE_SEARCH_PAGE}?${filtersUrlParams}`)

        setTimeout(() => {
            dispatch(setSearchUuid())
        }, 300)
    }

    function handleDelete(filter) {
        let updatedState = {...filtersRef.current}
        const item = Object.keys(filter)[0]

        if(item) {
            delete updatedState[item]
        }

        if(typeof filter == 'boolean') {
            updatedState = {}
        }

        const filtersUrlParams = setFiltersUrlParams(updatedState)

        dispatch(setFilters(updatedState))
        router.push(`${ROUTE_SEARCH_PAGE}?${filtersUrlParams}`)
        
        setTimeout(() => {
            dispatch(setSearchUuid())
        }, 300)
    }

    const {
        pool,
        newBuild = "",
        type = "",
        distanceToTheSea,
        subType
    } = filtersRef.current

    const Renderitem = props => {
        return (
            <Chip 
                label={props.label}
                active={props.active}
                handleClick={() => handleClick(props.filter)}
                handleDelete={() => handleDelete(props.filter)}
                styles={{ margin: '0 0.5rem 0 0'}}
            />
        )
    }

    const largeBp = bp == BREAKPOINT_LG

    return (
        <Container>
            <div className={cStyles['container-flex-center']}>
                <div className={cStyles['favourite-filters']}>
                    <div className={cStyles['favourite-filters--content']}>
                        {largeBp &&
                            <Fragment>
                                <Renderitem 
                                    label="Pool" 
                                    filter={{ pool: true }}
                                    active={pool}
                                />

                                <Renderitem 
                                    label="New Build" 
                                    filter={{ newBuild: true }}
                                    active={newBuild}
                                />

                                <Renderitem 
                                    label="Apartment" 
                                    filter={{ type: 'Apartment'}}
                                    active={type == 'Apartment'}
                                />

                                <Renderitem 
                                    label="House" 
                                    filter={{ type: 'House'}}
                                    active={type == 'House'}
                                />

                                <Renderitem 
                                    label="Villa" 
                                    filter={{ type: 'Villa'}}
                                    active={type == 'Villa'}
                                />

                                <Renderitem 
                                    label="Close to the sea" 
                                    filter={{ distanceToTheSea: 300}}
                                    active={distanceToTheSea <= 300}
                                />

                                <Renderitem 
                                    label="Maisonette" 
                                    filter={{ subType: 'Maisonette'}}
                                    active={subType == 'Maisonette'}
                                />

                                <Renderitem 
                                    label="Detached" 
                                    filter={{ subType: 'Detached'}}
                                    active={subType == 'Detached'}
                                />
                            </Fragment>
                        }

                        {!_.isEmpty(userFilters) &&
                            <Chip 
                                label={`Clear ${userFiltersLength} ${singleMultipleText('Filter', userFiltersLength)}`}
                                active={true}
                                handleDelete={() => handleDelete(true)}
                                styles={{ margin: '0 0.5rem 0 0'}}
                                color="third"
                            />
                        }
                    </div>
                </div>
                

                <Button 
                    text="Filters"
                    styles={largeBp ? {} : { margin: '1.5rem 0 0 auto' }}
                    onClick={() => dispatch(setOpenFilters(true))}
                    endIcon={<FilterListIcon />}
                />          
        
            </div>
        </Container>
    )
}

export default withTheme(FavouriteFilters);