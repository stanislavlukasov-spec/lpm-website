import React, { useState } from 'react'
import cStyles from '../../styles/Switch.module.css'
import { withTheme } from '@mui/styles'
import Switch from '@mui/material/Switch'
import { join } from '../Helpers/joinClasses'

const SwitchComponent = props => {
	const {
        theme = {},
        styles = {},
        checked,
        onChange = () => {},
        label
    } = props

    const [defaultChecked, setDefaultChecked] = useState(checked)

    let labelProps = {}
    if(checked) {
        labelProps = {
            defaultChecked
        }
    }

    return (
        <div 
            className={join(cStyles['switch'], cStyles['container-flex-center'])}
            style={styles}>

            {label &&
                <div 
                    className={cStyles['switch-title']}
                    style={{
                        ...theme.typography.body1,
                        marginRight: 'auto'
                    }}>

                    {label}
                </div>
            }

            <Switch 
                {...labelProps} 
                onChange={(e, value) => onChange(value)}
            />
        </div>
    )
}

export default withTheme(SwitchComponent);