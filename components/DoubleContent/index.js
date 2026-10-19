import React from 'react'
import cStyles from '../../styles/DoubleContentStyles.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { withTheme } from '@mui/styles';
import { getBreakPoint } from '../BreakPoint'
import { join } from '../Helpers/joinClasses'

const DoubleContent = props => {
    const {
        theme = {},
        children
    } = props
    
    const bp = getBreakPoint({
        theme,
        useMediaQuery
    })

    return (
        <div className={join(cStyles['double-content'], cStyles[`double-content-${bp}`])}>
           {children}
        </div>
    )
}

export default withTheme(DoubleContent);