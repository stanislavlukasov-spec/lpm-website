import React from 'react'
import Typography from '@mui/material/Typography';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import ShowerIcon from '@mui/icons-material/Shower';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { withTheme } from '@mui/styles'

const PropertyIcon = props => {
    const {
        type,
        value,
        theme = {}
    } = props

    if(!value) {
        return false
    }

    const iconStyle = { 
        fill: theme.palette.textGrey,
        width: '1.3rem'
    }

    return (
        <div className="property-icon container-flex-center">
            {type == 'bedroom' && <SingleBedIcon style={iconStyle}/>}
            {type == 'bathroom' && <ShowerIcon style={{ ...iconStyle, width: '1.1rem'}}/>}
            {type == 'sea' && <BeachAccessIcon style={{ ...iconStyle, width: '0.9rem' }}/>}
            
            <Typography 
                component="span"
                variant="body1">

                {value}
            </Typography>
        </div>
    )
}

export default withTheme(PropertyIcon);