import React from 'react'
import cStyles from '../../styles/Button.module.css'
import { withTheme } from '@mui/styles'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import { join } from '../Helpers/joinClasses'

export const COUNT_ADD = 'add'
export const COUNT_SUBSTRACT = 'substract'

const CountButtons = props => {
	const {
        theme = {},
        text,
        value = 0,
        styles = {},
        handleChange = () => {},
        maxCount = 9
    } = props

    const onClick = type => {
        let result = parseInt(value) 

        if(type == COUNT_ADD) {
            result = result + 1
        } else {
            result = result - 1
        }

        if(result > maxCount) {
            result = maxCount
        }

        return handleChange(result < 0 ? 0 : result)
    }
    
    return (
        <div 
            className={join(cStyles['count-buttons'], cStyles['container-flex-center'])}
            style={{ 
                ...styles,
                ...theme.typography.body1 
            }}>

            {text}

            <div className={join(cStyles['count-content'], cStyles['container-flex-center'])}>
                <IconButton onClick={() => onClick(COUNT_ADD)}>
                    <div className={join(cStyles['round-icon'], cStyles['container-flex-center'])}>
                        <AddIcon />
                    </div>
                </IconButton>

                <span>{value}</span>

                <IconButton onClick={() => onClick(COUNT_SUBSTRACT)}>
                    <div className={join(cStyles['round-icon'], cStyles['container-flex-center'])}>
                        <RemoveIcon />
                    </div>
                </IconButton>
            </div>
        </div>
    )
}

export default withTheme(CountButtons);