import React from 'react'
import { withTheme } from '@mui/styles'
import Button from '@mui/material/Button';

export const VARIANT_PRIMARY = 'primary'
export const VARIANT_SECONDARY = 'secondary'
export const VARIANT_OUTLINED = 'outlined'
export const VARIANT_CONTAINED = 'contained'

const ButtonComponent = props => {
	const {
        text = "",
        type,
        styles = {},
        variant = "contained"
    } = props

    let xsStyles = {...styles}
    if(type == VARIANT_PRIMARY) {
        xsStyles = {
            ...xsStyles,
            "&.MuiButton-root": { 
                color: "white" 
            }
        }
    }
    
    return (
        <Button
            {...props}
            variant={variant}
            disableElevation
            sx={xsStyles}
            color={type}>

            {text}
        </Button>
    )
}

export default withTheme(ButtonComponent);