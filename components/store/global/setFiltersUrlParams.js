import _ from 'lodash'

export default function setFiltersUrlParams(filters) {
    let result = ""

    if(!_.isEmpty(filters)) {
        Object.keys(filters).forEach(item => {
            if(filters[item]) {
                result = result + `${item}=${filters[item]}&`
            }
        })
    }

    result = result.substring(0, result.length - 1)

    return result
}