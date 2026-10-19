import * as React from 'react';
import { CONTAINER_TYPE_FLEX, CONTAINER_TYPE_FLEX_CENTER_VERTICAL } from './types'
import Container from '@mui/material/Container';

const ContainerComponent = props => {
    const {
        type = "",
        children,
        className,
        onClick = () => {},
        small
    } = props

    let styles = {...props.styles || {}}

    if(type == CONTAINER_TYPE_FLEX) {
        styles = {
            display: 'flex',
            alignItems: 'center'
        }
    }

    if(type == CONTAINER_TYPE_FLEX_CENTER_VERTICAL) {
        styles = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }
    }

    return (
        <Container 
            maxWidth={small ? 'md' : false}
            style={styles} 
            onClick={onClick}
            className={className}>

            {children}
        </Container>
    )
}

export default ContainerComponent