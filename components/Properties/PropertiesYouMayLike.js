import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { withTheme } from '@mui/styles'
import PropertiesGrid from '../Properties/PropertiesGrid'
import { URL, PROPERTIES_YOU_MAY_LIKE_URL, HEADERS } from '../PropertiesApi/options'
import axios from 'axios'

const PropertiesYouMayLike = props => {
	const {
        price,
        city,
        saleRent,
        id,
        size = 8
    } = props

    const [properties, setProperties] = useState([])

    useEffect(() => {
        axios.get(`${URL}/${PROPERTIES_YOU_MAY_LIKE_URL}?price=${price}&city=${city}&saleRent=${saleRent}&id=${id}&size=${size}`, { headers: HEADERS })
            .then(res => {
                const response = res.data || {}
                setProperties(response.data || [])
            })
    }, [])
    
    return (
        <PropertiesGrid 
            items={_.take(properties, 8)}
            maxItemCount={8}
        />
    )
}

export default withTheme(PropertiesYouMayLike);