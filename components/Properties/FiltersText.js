import { TYPE_SALE, TYPE_RENT } from '../store/global/types'
import _ from 'lodash'
import singleMultipleText from '../Helpers/singleMultipleText'

export default function FiltersText(props) {
    const {
        filters = {},
        componentCopy = {},
        recentPropertiesType = "",
        country = "",
        properties = [],
        fetchingData
    } = props

    const {
        district = "",
        bedrooms = "",
        type = "",
        bathrooms = "",
        saleRent = "",
        newBuild = ""
    } = filters

    const length = properties.length

    let result = "Searching everything"

    if(saleRent) {
        result = `Searching properties for ${saleRent.toLowerCase()}`
    }

    if(newBuild) {
        result = `Searching for new built properties`
    }

    if(district) {
        result = `Searching for all properties in ${district}`
    }

    if(district && type) {
        result = `Searching for ${type}s in ${district}`
    }

    if(district && bedrooms) {
        result = `Searching for ${bedrooms} ${componentCopy.bedroom} ${type} in ${district}`
    }

    if(district && bedrooms && bathrooms) {
        result = `Searching for ${bedrooms} ${componentCopy.bedroom}, ${bathrooms} ${componentCopy.bathroom} ${type} in ${district}`
    }

    if(recentPropertiesType == TYPE_SALE) {
        result = componentCopy.recentPropertiesForSale.replace('{country}', country)
    }

    if(recentPropertiesType == TYPE_RENT) {
        result = componentCopy.recentPropertiesToRent.replace('{country}', country)
    }

    if(!fetchingData && _.isEmpty(properties)) {
        result = "No results. To view properties, try changing filters."
    }

    return result
}