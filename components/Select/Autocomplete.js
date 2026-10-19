import React from 'react'
import { withTheme } from '@mui/styles'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Label from '../Label';

const AutoCompleteComponent = props => {
	const {
        type = "select-basic",
        label,
        options = [],
        containerStyles = {},
        placeholder = "",
        onChange = () => {},
        value = ""
    } = props
    
    return (
        <div className={type}
            style={containerStyles}> 

            {label &&
                <Label text={label} />
            }

             <Autocomplete
                disablePortal
                options={options}
                sx={{ width: '100%' }}
                value={value}
                onChange={(e, value) => onChange(value)}
                renderInput={(params) => <TextField {...params} placeholder={placeholder}/>}
            />
        </div>
    )
}

export default withTheme(AutoCompleteComponent);