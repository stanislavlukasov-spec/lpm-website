export default function PropertyLocation(props) {
    const {
        area = "",
        city = ""
    } = props

    let result = area

    if(!area && city) {
        result = city
    }

    if(area && city) {
        result = `${area}, ${city}`
    }

    return result
}