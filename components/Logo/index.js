import React from 'react'
import LogoWhiteIconLarge from '../../public/images/logos/lpm-long-white.png'
import LogoPinkIconLarge from '../../public/images/logos/lpm-long-pink.png'
import { withTheme } from '@mui/styles'
import { ROUTE_HOME } from '../Settings/routes'
import { useRouter } from 'next/router'
import cStyles from '../../styles/Logo.module.css'
import Image from 'next/image'
import { DOMAIN } from '../Settings/about'

const Logo = props => {
	const {
        white = true,
        className
    } = props

    const router = useRouter()

    return (
        <Image 
            src={white ? LogoWhiteIconLarge : LogoPinkIconLarge}
            className={className ? className : cStyles['logo']}
            onClick={() => router.push(ROUTE_HOME)}
            width={231}
            height={19}
            alt={DOMAIN}
        />
    )
}

export default withTheme(Logo);