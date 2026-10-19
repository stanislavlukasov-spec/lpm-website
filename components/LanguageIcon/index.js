import * as React from 'react'
import cStyles from '../../styles/LanguageIcon.module.css'
import Image from 'next/image'

const LanguageIcon = props => {
    const {
        icon = ""
    } = props 

    return (
        <Image 
            src={icon} 
            className={cStyles['language-icon']}
            height={16}
            width={16}
        />
    )
}

export default LanguageIcon