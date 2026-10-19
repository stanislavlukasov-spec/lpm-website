import React from 'react'
import { withTheme } from '@mui/styles'
import '../../styles/styles.css'
import Button from './index';
import ButtonGroup from '@mui/material/ButtonGroup';

const ButtonGroupComponent = props => {
	const {
        label = "",
        items = [],
        checked,
        styles = {}
    } = props

    return (
        <ButtonGroup 
            variant="contained" 
            style={styles}
            aria-label={label}>

            {items.map((item, index) => {
                let active = false
                if(checked && checked.toLowerCase() == item.toLowerCase()) {
                    active = true
                }

                return (
                    <Button 
                        text={item}
                        key={index}
                        variant={active ? 'contained' : 'outlined'}
                    />
                )
            })}
        </ButtonGroup>
    )
}

export default withTheme(ButtonGroupComponent);