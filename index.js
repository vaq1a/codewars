// first variant
function selReverseFirst(array, length) {
    const finalArray = []
    let tmpArray = []
    let currentCount = 0

    array.forEach((item) => {
        currentCount++

        tmpArray.push(item)

        if (currentCount === length) {
            finalArray.push(...tmpArray.reverse())

            tmpArray = []
            currentCount = 0
        }
    })

    if (tmpArray.length) {
        finalArray.push(...tmpArray.reverse())

        tmpArray = []
        currentCount = 0
    }

    return finalArray
}

// second variant
function selReverseSecond(array, length) {
    if (length === 0) return array;

    let result = [];

    for(let i = 0; i < array.length; i += length) {
        result.push(...array.slice(i, i+length).reverse());
    }

    return result;
}

console.log(selReverseFirst([1,2,3,4,5,6], 2))
//=> [2,1, 4,3, 6,5]
console.log(selReverseSecond([2,4,6,8,10,12,14,16], 3))
//=> [6,4,2, 12,10,8, 16,14]