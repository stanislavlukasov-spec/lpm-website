import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { withTheme } from '@mui/styles';

const Section = props => {
    const {
        theme = {}
    } = props 

    const {
        children,
        className = "",
        xsPadding = theme.sections.padding.xs
    } = props
    
    const bpLarge = useMediaQuery(theme.breakpoints.up('lg'))

    return (
        <div 
            className={className}
            style={{ padding: bpLarge ? theme.sections.padding.lg : xsPadding }}>

            {children}
        </div>
    )
}

export default withTheme(Section);