export default function getCurrencyIcon(props) {
	const {
		locale = {},
		currency,
        price,
        componentCopy = {}
    } = props

    let result = ""
    let priceString = ""

    if(price) {
        priceString = price.toString()
    }

    if(priceString && typeof priceString == 'string') {
        let formattedPrice = priceString.replace(",", "").replace(" ", "")

        result = new Intl.NumberFormat(locale.code || 'en', { 
            style: 'currency', 
            currency,
            maximumSignificantDigits: 3
        }).format(formattedPrice)
    
        if(result.includes('NaN')) {
            result = componentCopy.priceNotAvailable
        }
    }

    return result
}