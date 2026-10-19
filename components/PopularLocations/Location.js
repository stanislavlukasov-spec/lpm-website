import React from 'react'
import { withTheme } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import { ROUTE_SEARCH_PAGE } from '../Settings/routes'
import cStyles from '../../styles/PopularLocations.module.css'
import { join } from '../Helpers/joinClasses'
import useMediaQuery from '@mui/material/useMediaQuery'
import { getBreakPoint, BREAKPOINT_LG } from '../BreakPoint'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Location = props => {
	const {
        theme = {},
        description,
        icon,
        title = "",
        name = ""
    } = props

    const bp = getBreakPoint({
        theme,
        useMediaQuery
    })

    const router = useRouter()
    const large = bp == BREAKPOINT_LG

    return (
        <Card 
            sx={{ minWidth: '100%' }}
            style={{ marginBottom: bp !== BREAKPOINT_LG ? '2rem' : '0' }}>

            <CardContent>
                <div 
                    onClick={() => router.push(`${ROUTE_SEARCH_PAGE}?district=${name}`)}
                    className={join(cStyles[large ? 'location' : ''], cStyles['location-link'])}>
                    
                    <Image 
                        src={icon} 
                        layout={large ? '' : 'intrinsic'}
                        alt={title}
                        width={large ? 240 : undefined}
                        height={large ? 160 : undefined}
                        className={cStyles['location-image-container']}
                    />

                    <div className={cStyles[large ? 'location-content' : 'location-content-sm']}>
                        <Typography 
                            component="h3" 
                            variant="h3"
                            style={{ color: theme.palette.textGrey }}>

                            {title}
                        </Typography>

                        <Typography 
                            component="p" 
                            variant="body2"
                            style={{ color: theme.palette.textGrey, marginTop: '1rem' }}>

                            {description}
                        </Typography>
                    </div>
                </div> 
            </CardContent>
        </Card>
    )
}

export default withTheme(Location);