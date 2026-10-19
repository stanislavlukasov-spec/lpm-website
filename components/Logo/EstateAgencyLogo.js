import Image from 'next/image'
import cStyles from '../../styles/Logo.module.css'
import DomCyImage from '../../public/images/logos/dom.com.cy.png'
import PrimeImage from '../../public/images/logos/prime-white.svg'
import FoxRealityImage from '../../public/images/logos/fox-reality.png'
import { withTheme } from '@mui/styles'
import { DOM_CY, FOX_REALITY, PRIME } from '../store/global/domains'
import { HrefBlank } from '../Link/href'

const EstateAgencyLogo = props => {
	const {
        name = "",
        styles = {},
        className
    } = props

    let src = ""

    switch (name) {
        case DOM_CY:
            src = DomCyImage
        break

        case FOX_REALITY:
            src = FoxRealityImage
        break

        case PRIME:
            src = PrimeImage
        break
    }

    if(!src) return false
    
    return (
        <div className={className ? className : cStyles['name-image']}>
            <HrefBlank href={name}>
                <Image 
                    style={styles}
                    src={src} 
                    layout="intrinsic"
                    alt={name}
                />
            </HrefBlank>
        </div>
    )
}

export default withTheme(EstateAgencyLogo);