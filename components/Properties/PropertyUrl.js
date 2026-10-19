export default function PropertyUrl(props) {
    const {
        baseUrl = "",
        url = ""
    } = props

    let result = baseUrl+url

    if(url.includes('//')) {
        result = url
    }

    return result
}