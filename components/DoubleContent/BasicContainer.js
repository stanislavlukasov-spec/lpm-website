import React from 'react'
import cStyles from '../../styles/DoubleContentStyles.module.css'
import { withTheme } from '@mui/styles';

const DoubleBasicContainer = props => {
    const {
        children
    } = props

    return (
        <div className={cStyles['double-content-basic']}>
           {children}
        </div>
    )
}

export default withTheme(DoubleBasicContainer);