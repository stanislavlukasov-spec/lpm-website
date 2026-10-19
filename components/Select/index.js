import React, { useState } from 'react'
import { withTheme } from '@mui/styles'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Label from '../Label';

const SelectComponent = props => {
    const selectBasic = "select-basic"

	const {
        value = "",
        onChange = () => {},
        style = {},
        containerStyles = {},
        children,
        label,
        formProps = {},
        type = selectBasic
    } = props

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    
    const handleOpen = () => {
        setOpen(true)
    }
    
    return (
        <div className={type}>
            <FormControl 
                {...formProps}
                style={containerStyles}>

                {label &&
                    <Label 
                        text={label} 
                        onClick={handleOpen}
                        styles={{ 
                            marginBottom: type == selectBasic ? '0.35rem' : ''
                        }}
                    />
                }

                <Select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    style={style}
                    displayEmpty>

                    {children}
                </Select>
            </FormControl>
        </div>
    )
}

export default withTheme(SelectComponent);