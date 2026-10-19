import React from 'react'
import { withTheme } from '@mui/styles'
import cStyles from '../../styles/Label.module.css'

const Label = props => {
	const {
        theme = {},
        text = "",
        styles = {},
        onClick = () => {}
    } = props
    
    return (
        <div 
            className={cStyles.label}
            onClick={onClick}
            style={{
                ...theme.typography.caption,
                ...styles
            }}>

            {text}
        </div>
    )
}

export default withTheme(Label);