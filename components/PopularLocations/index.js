import React from 'react'
import cStyles from '../../styles/PopularLocations.module.css'
import { useStore } from '../store/global/store'
import { withTheme } from '@mui/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { POPULAR_LOCATIONS } from '../pages/pageSections'
import getComponentCopy from '../store/global/getComponentCopy'
import Section from '../Section'
import Container from '../Container'
import Location from './Location'
import { join } from '../Helpers/joinClasses'

const PopularLocations = props => {
    const [state] = useStore()

    const {
        country = "",
        pageConfig = {},
        locale = {}
    } = state

    const {
        locations = {}
    } = pageConfig

	const {
		theme = {}
    } = props

    const componentCopy = getComponentCopy({
		state,
		section: POPULAR_LOCATIONS
    })

    let bp = 'xs'
    const bpSmall = useMediaQuery(theme.breakpoints.up('sm'));
    const bpLarge = useMediaQuery(theme.breakpoints.up('lg'));

    if(bpSmall) bp = 'sm'
    if(bpLarge) bp = 'lg'

    const locationsLocale = locations[locale.code] || []
    
    return (
		<Section xsPadding={theme.sections.padding.lg}>
			<Container>
                <Typography 
                    component="h2" 
                    variant="h2"
                    style={{ 
                        textAlign: 'center'
                    }}>

                    {componentCopy.title.replace('{country}', country)}
                </Typography>

				<div className={join(cStyles['popular-locations'], cStyles[`popular-locations-${bp}`])}> 
                    {locationsLocale.map((item, index) => {
                        return (
                            <Location 
                                {...item}
                                key={index}
                            />
                        )
                    })}
				</div>
			</Container>
		</Section>
    )
}

export default withTheme(PopularLocations);