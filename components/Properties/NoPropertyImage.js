import React from 'react'
import cStyles from '../../styles/Properties.module.css'
import LoadingSlimGif from '../../public/images/icons/loading.gif'
import Logo from '../Logo'
import { join } from '../Helpers/joinClasses'

const NoPropertyImage = props => {
    return (
        <div className={join(cStyles['no-property-selected'], cStyles['container-flex-center'])}>
            {props.fetching &&
                <img 
                    src={LoadingSlimGif.src} 
                    style={{ opacity: 0.3}}
                />
            }

            {!props.fetching &&
                <Logo white={false}/>
            }
        </div>
    )
}

export default NoPropertyImage