export default function PropertyDistanceToTheSea(distanceToTheSea) {
    let result = null 
    let number = parseInt(distanceToTheSea)

    if(Number.isInteger(number)) {
        let distance = result = Number.parseFloat((number / 1000)).toFixed(1)
        if(distance == '0.0') distance = "0.1"
        
        result = distance + 'km' 
    }
    
    return result
}