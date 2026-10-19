import React, { useState } from 'react'
import cStyles from '../../styles/Properties.Image.module.css'
import { DOMAINS } from '../store/global/domains'
import { join } from '../Helpers/joinClasses'
import Logo from '../Logo'

export function getSrc(props) {
    const {
        baseUrl,
        image,
        itemName,
        dotImage
    } = props

    const domain = DOMAINS[itemName] || {}

    const {
        images = {}
    } = domain

    const {
        externalLink
    } = images

    let src = {
        large: baseUrl + image,
        dot: baseUrl + dotImage,
    }

    if(externalLink) src = {
        large: image,
        dot: dotImage
    }

    return src
}

function getOptions(props) {
    let styles = {
        backgroundSize: 'cover',
        backgroundPosition: '100% 100%'
    }

    return {
        styles,
        src: getSrc(props)
    }
}

export const PropertyImageBasic = props => {
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const options = getOptions(props) 

    const { 
        src,
        styles
    } = options

    const image = new Image()
    image.src = src.large
    
    image.onerror = () => setError(true)
    image.onload = () => setLoaded(true)

    let style = {
        ...styles,
        ...props.styles || {}
    }

    if(!error && !loaded) {
        style.background = '#F5F5F5'
    }

    if(loaded) {
        style.backgroundImage = `url(${src.large})`
        style.backgroundSize = 'cover'
        style.backgroundRepeat = 'no-repeat'
    }

    if(error) {
        return (
            <div 
                className={cStyles['property-image--notfound']}>
    
                <div className={cStyles['property-image--logo']}>
                    <Logo 
                        white={false}
                    />
                </div>
            </div>
        ) 
    }

    return (
        <div 
            className={cStyles['property-image--content']}
            key={`${loaded}-${src.large}`}
            style={style}>
            
        </div>
    )   
}

const PropertyImage = props => {
    const options = getOptions(props) 

    const { 
        src,
        styles
    } = options

    return (
        <div 
            className={join(cStyles['property-image--content'])}
            data-src={src.large}
            style={styles}>
            
        </div>
    )
}

export default PropertyImage