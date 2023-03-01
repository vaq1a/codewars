// Given an array, return the reversed version of the array (a different kind of reverse though), you reverse portions of the array, you'll be given a length argument which represents the length of each portion you are to reverse.
//
// E.g
// selReverse([1,2,3,4,5,6], 2)
// => [2,1, 4,3, 6,5]
// if after reversing some portions of the array and the length of the remaining portion in the array is not up to the length argument, just reverse them.

// selReverse([2,4,6,8,10,12,14,16], 3)
// => [6,4,2, 12,10,8, 16,14]
// selReverse(array, length)

// array - array to reverse
// length - length of each portion to reverse
// Note : if the length argument exceeds the array length, reverse all of them, if the length argument is zero do not reverse at all.



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

selReverseFirst([1,2,3,4,5,6], 2)
//=> [2,1, 4,3, 6,5]
selReverseSecond([2,4,6,8,10,12,14,16], 3)
//=> [6,4,2, 12,10,8, 16,14]

// Complete the method so that it formats the words into a single comma separated value. The last word should be separated by the word 'and' instead of a comma. The method takes in an array of strings and returns a single formatted string.
//
// Note:
// Empty string values should be ignored.
// Empty arrays or null/nil/None values being passed into the method should result in an empty string being returned.
// Example: (Input --> output)
//
// ['ninja', 'samurai', 'ronin'] --> "ninja, samurai and ronin"
// ['ninja', '', 'ronin'] --> "ninja and ronin"
// [] --> ""

function formatWords(words) {
    const tmpArr = words?.filter(Boolean)

    return !tmpArr?.length ? (
        ""
    ) : tmpArr.length === 1 ? (
        tmpArr[0]
    ) : (
        `${tmpArr.slice(0, -1).join(', ')} and ${tmpArr.at(-1)}`
    )
}

formatWords(['', '', '', 'four']);
// 'four'
formatWords(['one', 'two', 'three', 'four']);
// 'one, two, three and four'
formatWords([""]);
// ''

// For a given string s find the character c (or C) with longest consecutive repetition and return:
//
// [c, l]
// where l (or L) is the length of the repetition. If there are two or more characters with the same l return the first in order of appearance.
//
// For empty string return:
//
// ["", 0]
// In JavaScript: If you use Array.sort in your solution, you might experience issues with the random tests as Array.sort is not stable in the Node.js version used by CodeWars. This is not a kata issue.

// when we take into account the whole line
function longestRepetition(s) {
    if (!s?.length) {
        return ["",0]
    }

    const { resultElem, lengthElemInString } = [...new Set(s.split(''))].map((elem) => ({
        resultElem: elem,
        lengthElemInString: s.match(new RegExp(`${elem}`, 'gi')).length
    })).sort((a, b) => b.lengthElemInString - a.lengthElemInString)[0]

    return [resultElem, lengthElemInString]
}

longestRepetition("aaaabb");      // ["a",4]
longestRepetition("bbbaaabaaaa");      // ["a",7]
longestRepetition("abbbbb");      // ["b",5] )

// A Narcissistic Number (or Armstrong Number) is a positive number which is the sum of its own digits, each raised to the power of the number of digits in a given base. In this Kata, we will restrict ourselves to decimal (base 10).

// For example, take 153 (3 digits), which is narcissistic:

// 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
// and 1652 (4 digits), which isn't:
//
// 1^4 + 6^4 + 5^4 + 2^4 = 1 + 1296 + 625 + 16 = 1938
// The Challenge:
//
// Your code must return true or false (not 'true' and 'false') depending upon whether the given number is a Narcissistic number in base 10.
//
// This may be True and False in your language, e.g. PHP.
//
// Error checking for text strings or other invalid inputs is not required, only valid positive non-zero integers will be passed into the function.

// first variant
function narcissistic(value) {
    if (!value) {
        return false
    }

    const numberValueToString = `${value}`
    const numberLength = numberValueToString.length

    const narcissisticNumberSummary = numberValueToString.split('').reduce((accumulator, currentValue) => {
        return accumulator + Math.pow(currentValue, numberLength)
    }, 0)

    return value === narcissisticNumberSummary
}

// second variant
function narcissisticSecondVariant(value) {
    const currentValueToString = `${value}`

    return currentValueToString.split('').reduce(function(accumulator, currentValue) {
        return accumulator + Math.pow(currentValue, currentValueToString.length)
    }, 0) === value
}

narcissistic(7); // true
narcissistic(153); // true
narcissistic(122); // false
narcissistic(1652); // false
narcissisticSecondVariant(1652); // false