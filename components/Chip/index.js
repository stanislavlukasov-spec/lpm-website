import { withTheme } from '@mui/styles'
import Chip from '@mui/material/Chip'
import CancelIcon from '@mui/icons-material/Cancel';

const ChipComponent = props => {
    const {
        handleDelete = () => {},
        handleClick = () => {},
        filter,
        label,
        theme = {},
        styles = {},
        color = "primary",
        variant = ""
    } = props 

    const active = props.active

    let itemProps = {
        label,
        color,
        style: {
            margin: '0.5rem 0.5rem 0 0',
            ...theme.typography.body2,
            cursor: 'pointer',
            ...styles
        },
        onClick: e => handleClick(filter ? filter : e)
    }

    if(active) {
        itemProps.onDelete = () => handleDelete(filter)
        itemProps.deleteIcon = <CancelIcon style={{ fill: 'white'}}/>
    }

    if(variant) itemProps.variant = variant

    return (
        <Chip 
            {...itemProps}
        />
    )
}

export default withTheme(ChipComponent);