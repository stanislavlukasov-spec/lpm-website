import { TYPE_SALE, TYPE_RENT } from '../store/global/types'
import getCurrencyIcon from '../Helpers/getCurrencyIcon'

export default function PropertyPrice(props) {
    const {
        currency = "",
        price = "",
        saleRent = "",
        locale = {},
        componentCopy = {}
    } = props 

    let result = ""

    if(currency) {
        result = getCurrencyIcon({
            locale,
            currency,
            price,
            componentCopy
        })
    
        if(saleRent == TYPE_RENT.toLowerCase() && result !== componentCopy.priceNotAvailable) {
            result = `${result} ${componentCopy.perMonth}` 
        }
    }

    return price ? result : ""
}