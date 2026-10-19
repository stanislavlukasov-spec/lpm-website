import _ from 'lodash'

export default function singleMultipleText(string, length) {
    let result = string

    if(_.isString(string) && Number.isInteger && length > 1) {
        result = `${string}s`
    }

    return result
}