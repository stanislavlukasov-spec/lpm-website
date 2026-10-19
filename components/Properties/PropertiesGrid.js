import React from 'react'
import _ from 'lodash'
import { withTheme } from '@mui/styles'
import cStyles from '../../styles/Properties.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import Property from './Property'
import Skeleton from '@mui/material/Skeleton'
import { getBreakPoint } from '../BreakPoint'
import { join } from '../Helpers/joinClasses'

const PropertiesGrid = props => {
	const {
        theme = {},
        items = [],
        className = "search-results-grid",
        fetchingProperties,
        maxItemCount,
        recentPropertiesType = "",
        handleClick = () => {}
    } = props	

    const bp = getBreakPoint({
        theme,
        useMediaQuery
    })

    const RenderSkeleton = () => (
        <div className={cStyles['property']}> 
            <Skeleton 
                variant="rectangular" 
                width="100%"
                height="17.625rem"
            />

            <Skeleton style={{ marginTop: '0.5rem' }}/>
            <Skeleton width="60%" />
        </div>
    )

    const displayLoadingState = fetchingProperties || _.isEmpty(items)

    return (
        <div className={join(cStyles[className], cStyles[`${className}-${bp}`])}> 
            {displayLoadingState &&
                Array.apply(0, Array(maxItemCount)).map(function (x, i) {
                    return <RenderSkeleton key={i} />
                })
            }

            {!displayLoadingState &&
                items.map((item, index) => {
                    return (
                        <Property 
                            {...item}
                            key={index}
                            recentPropertiesType={recentPropertiesType}
                            handleClick={handleClick}
                        />
                    )
                })
            }
        </div>
    )
}

export default withTheme(PropertiesGrid);