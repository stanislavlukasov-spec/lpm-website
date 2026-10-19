import { FILTER_PAGE_NUMBER } from '../store/global/getUrlOptions'

export function getUserFilters(filters) {
    let result = {...filters}

    if(result[FILTER_PAGE_NUMBER]) {
        delete result[FILTER_PAGE_NUMBER]
    }

    return result
}