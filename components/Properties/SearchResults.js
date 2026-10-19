import React, { useEffect, useState, useRef, Fragment } from 'react'
import _ from 'lodash'
import { withTheme } from '@mui/styles'
import cStyles from '../../styles/Properties.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Container from '../Container';
import PropertiesGrid from '../Properties/PropertiesGrid'
import { getBreakPoint } from '../BreakPoint'
import Pagination from '@mui/material/Pagination'
import FiltersText from './FiltersText'
import { globalUseStore } from '../store/global/store'
import { setProperties, setFetchingData, setRecentPropertiesSale, setFilters } from '../store/global/reducer'
import getUrlOptions from '../store/global/getUrlOptions'
import { TYPE_SALE, TYPE_RENT } from '../store/global/types'
import { URL, SEARCH_PROPERTIES_URL, RECENT_PROPERTIES_URL, HEADERS } from '../PropertiesApi/options'
import getComponentCopy from '../store/global/getComponentCopy'
import { SECTION_SEARCH_RESULTS } from '../pages/pageSections'
import axios from 'axios'
import $ from 'jquery'
import { join } from '../Helpers/joinClasses'

export const SEARCH_TYPE_ADD = 'add'
export const PAGE_ITEMS = 16

const SearchResults = props => {
	const {
        theme = {}
    } = props	

    const [state, dispatch] = globalUseStore()

    const {
        country = "",
        properties = [],
        searchUuid,
        recentPropertiesRent = [],
        recentPropertiesSale = [],
        fetchingData,
        filters = {}
    } = state

    const [options, setOptions] = useState({
        searchResults: false,
        pageNumber: 1,
        totalPages: 0
    })

    const [searchUuidHistory, setSearchUuidHistory] = useState(searchUuid)

    const optionsRef = useRef()
    optionsRef.current = options

    const bk = getBreakPoint({
        theme,
        useMediaQuery
    })

    const componentCopy = getComponentCopy({
		state: state,
		section: SECTION_SEARCH_RESULTS
    })

    const optionsFromUrl = getUrlOptions()

    const {
        recentPropertiesType = ""
    } = optionsFromUrl

    function scrollTop() {
        $(`html`).animate({ scrollTop: 0 }, 500)
    }

    function searchRecentPropertiesForSale() {
        axios.get(`${URL}/${RECENT_PROPERTIES_URL}?saleRent=${filters.saleRent || TYPE_SALE}`, { headers: HEADERS })
        .then(res => {
            const response = res.data || {}
            let properties = response.data || []
            dispatch(setRecentPropertiesSale(properties))
        })
    }

    function searchProperties(props = {}) {
        const {
            pageNumber = 1,
            dispatchFilters
        } = props

        let filtersToUse = filters 

        if(!_.isEmpty(optionsFromUrl.filters) && dispatchFilters) {
            filtersToUse = optionsFromUrl.filters || {}
            dispatch(setFilters(filtersToUse))
        }

        dispatch(setFetchingData(true))
        scrollTop()

        axios.post(
            `${URL}/${SEARCH_PROPERTIES_URL}`, 
            {
                filters: filtersToUse,
                from: ((pageNumber - 1) * 18) + 1
            },
            { 
                headers: HEADERS 
            })
            .then(res => {
                const response = res.data || {}
                const responseData = response.data || {}
                const total = response.total || {}

                dispatch(setProperties(responseData))
                dispatch(setFetchingData(false))

                if(_.isEmpty(responseData)) {
                    searchRecentPropertiesForSale()
                }

                setOptions({
                    ...optionsRef.current,
                    searchResults: true,
                    totalPages: (total.value / PAGE_ITEMS) || 0,
                    pageNumber
                })
            })
    }

    useEffect(() => {
        searchProperties({ dispatchFilters: true })

        return () => {}
    }, [])

    useEffect(() => {
        if(!_.isEqual(searchUuidHistory, searchUuid)) {
            searchProperties()
            setSearchUuidHistory(searchUuid)
        }
    })

    const filtersText = FiltersText({
        componentCopy,
        recentPropertiesType,
        filters,
        country,
        properties,
        fetchingData
    })

    const noResults = !fetchingData && _.isEmpty(properties)
    const displayNoResultsSale = filters.saleRent == TYPE_SALE && !_.isEmpty(recentPropertiesSale)
    const displayNoResultsRent = filters.saleRent == TYPE_RENT && !_.isEmpty(recentPropertiesRent)

    const RenderDefaultProperties = props => (
        <Fragment>
            <Typography 
                component="h3" 
                variant="h3"
                style={{ 
                    margin: '2rem auto 0 0' 
                }}>

                Here are some properties for {props.type.toLowerCase()}
            </Typography>

            <PropertiesGrid 
                className="search-results-grid"
                maxItemCount={18}
                items={props.properties}
            />
        </Fragment>
    )

    return (
        <div className={join(cStyles['search-results'], cStyles[`search-results-${bk}`])}>
            <Container>
                <div className={cStyles['container-flex-center']}>
                    <Typography 
                        component="h1" 
                        variant="h2"
                        style={{ 
                            margin: '2rem auto 0 0' 
                        }}>

                        {filtersText}
                    </Typography>
                </div>

                {(!_.isEmpty(properties) && !fetchingData) &&
                    <Fragment>
                        <PropertiesGrid 
                            className="search-results-grid"
                            items={properties}
                            maxItemCount={18}
                            //handleClick={property => handlePropertySelection(property)}
                        />

                        {optionsRef.current.totalPages > 0 &&
                            <div 
                                className={cStyles['container-flex-center-center']}
                                style={{ padding: '2rem 0'}}>
        
                                <Pagination 
                                    count={Math.trunc(optionsRef.current.totalPages)} 
                                    color="primary" 
                                    page={optionsRef.current.pageNumber}
                                    onChange={(e, pageNumber) => searchProperties({ pageNumber })}
                                />
                            </div>
                        }
                    </Fragment>
                }

                {fetchingData &&
                    <PropertiesGrid 
                        className="search-results-grid"
                        maxItemCount={18}
                        items={[]}
                    />
                }

                {noResults &&
                    <Fragment>
                        {displayNoResultsSale &&
                            <RenderDefaultProperties 
                                type="sale"
                                properties={recentPropertiesSale}
                            />
                        }

                        {displayNoResultsRent &&
                            <RenderDefaultProperties 
                                type="rent"
                                properties={recentPropertiesRent}
                            />
                        }
                    </Fragment>
                }
            </Container>
        </div>
    )
}

export default withTheme(SearchResults);