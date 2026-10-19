import { TYPE_SALE, TYPE_RENT } from '../store/global/types'

export default function PropertyTitle(props) {
    const {
        saleRent,
        bedrooms,
        type,
        componentCopy = {}
    } = props

    let rentText = componentCopy.rent || ''
    let buyText = componentCopy.buy || ''
    let bedroomText = componentCopy.bedroom || ''

    const isRent = TYPE_RENT.toLowerCase() == saleRent
    const titleType = componentCopy[type] || componentCopy.property

    if((type && type.toLowerCase() == 'studio') || (bedrooms && bedrooms > 20)) {
        return `${isRent ? rentText : buyText} ${titleType}`
    }

    return `${isRent ? rentText : buyText} ${bedrooms ? bedrooms + ' ' +  bedroomText: ''} ${titleType}`
}