import { URL, RECENT_PROPERTIES_URL, HEADERS } from './options'
import axios from 'axios'

export default async function getLatestProperties(props) {
    const {
        saleRent
    } = props

    const propertyResponse = await axios({
        url: `${URL}/${RECENT_PROPERTIES_URL}`,
        method: 'get',
        headers: HEADERS,
        data: {
            saleRent
        }
    });

    return propertyResponse
}