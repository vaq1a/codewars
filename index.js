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

formatWords(['', '', '', 'four'])
// 'four'
formatWords(['one', 'two', 'three', 'four'])
// 'one, two, three and four'
formatWords([""])
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

longestRepetition("aaaabb")  // ["a",4]
longestRepetition("bbbaaabaaaa")  // ["a",7]
longestRepetition("abbbbb") // ["b",5] )

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

narcissistic(7) // true
narcissistic(153) // true
narcissistic(122) // false
narcissistic(1652) // false
narcissisticSecondVariant(1652) // false


// Write simple .camelCase method (camel_case function in PHP, CamelCase in C# or camelCase in Java) for strings. All words must have their first letter capitalized without spaces.

// For instance:
// "hello case".camelCase() => HelloCase
// "camel case word".camelCase() => CamelCaseWord

// first variant
String.prototype.camelCase = function(){
    if (!this.length) {
        return ""
    }

    return [...this].join('').split(' ').map((elem) => elem[0].toUpperCase() + elem.slice(1)).join('')
}

// second variant
String.prototype.regexCamelCase = function () {
    return this.trim().replace(/(?:^|\s+)(\w)/g, (_, c) => c.toUpperCase())
}

"camel case word".camelCase() // CamelCaseWord
"".camelCase() // ""
"camel case word".regexCamelCase() // CamelCaseWord
"".regexCamelCase() // ""

// You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns this "outlier" N.

// Examples
// [2, 4, 0, 100, 4, 11, 2602, 36]
// Should return: 11 (the only odd number)
// [160, 3, 1719, 19, 11, 13, -21]
// Should return: 160 (the only even number)

// first variant
function findOutlier(integers) {
    let even = {}
    let odd = {}

    integers.forEach((elem) => {
        if (elem % 2 === 0) {
            even[elem] = {
                count: even[elem]?.count ? even[elem].count+=1 : 1,
            }

            return
        }

        odd[elem] = {
            count: odd[elem]?.count ? odd[elem].count+=1 : 1,
        }
    })

    const oddObjKeys = Object.keys(odd)
    const evenObjKeys = Object.keys(even)

    if (oddObjKeys.length === evenObjKeys.length) {
        return Object.values(odd)[0].count > Object.values(even)[0].count ? +evenObjKeys[0] : +oddObjKeys[0]
    }

    if (oddObjKeys.length === 1) {
        return +oddObjKeys[0]
    }

    return +evenObjKeys[0]
}

// second variant
function findOutlierShortVersion(integers) {
    const even = integers.filter(a => a % 2 === 0)
    const odd = integers.filter(a => a % 2 !== 0)

    return even.length === 1 ? even[0] : odd[0]
}

findOutlier([0, 1, 2]) // 1
findOutlier([1, 2, 3]) // 2
findOutlier([1, 1, 0, 1, 1]) // 0
findOutlierShortVersion([0, 0, 3, 0, 0]) // 3
findOutlierShortVersion([2, 4, 0, 100, 4, 11, 2602, 36]) // 11
findOutlierShortVersion([160, 3, 1719, 19, 11, 13, -21]) // 160

// Your family runs a shop and have just brought a Scrolling Text Machine (http://3.imimg.com/data3/RP/IP/MY-2369478/l-e-d-multicolour-text-board-250x250.jpg) to help get some more business.
// The scroller works by replacing the current text string with a similar text string, but with the first letter shifted to the end; this simulates movement.
//
// You're father is far too busy with the business to worry about such details, so, naturally, he's making you come up with the text strings.
//
// Create a function named rotate() that accepts a string argument and returns an array of strings with each letter from the input string being rotated to the end.
//
// rotate("Hello") // => ["elloH", "lloHe", "loHel", "oHell", "Hello"]
// Note: The original string should be included in the output array The order matters. Each element of the output array should be the rotated version of the previous element. The output array SHOULD be the same length as the input string The function should return an emptry array with a 0 length string, '', as input

// first variant
function rotate(str) {
    const resultArr = []
    const currentArrResult = str.split('')

    currentArrResult.push(currentArrResult.shift())

    str.split('').forEach(() => {
        resultArr.push(JSON.parse(JSON.stringify(currentArrResult)).join(''))

        currentArrResult.push(currentArrResult.shift())
    })

    return  resultArr
}

rotate("Hello") // => ["elloH", "lloHe", "loHel", "oHell", "Hello"]


// second variant
function rotateTablet(s){
    return s.split("").map(() => s = s.slice(1) + s.slice(0,1));
}

rotateTablet("Hello") // => ["elloH", "lloHe", "loHel", "oHell", "Hello"]

// Write a function named first_non_repeating_letter that takes a string input, and returns the first character that is not repeated anywhere in the string.
// For example, if given the input 'stress', the function should return 't', since the letter t only occurs once in the string, and occurs first in the string.
// As an added challenge, upper- and lowercase letters are considered the same character, but the function should return the correct case for the initial letter. For example, the input 'sTreSS' should return 'T'.
// If a string contains all repeating characters, it should return an empty string ("") or None -- see sample tests.

function firstNonRepeatingLetter(str) {
    return str.split('').find((currentLetter) => {
        if(str.match(new RegExp(`${currentLetter}`, 'gi')).length === 1) {
            return currentLetter
        }
    }) || ''
}

firstNonRepeatingLetter('a') // 'a'
firstNonRepeatingLetter('abba') // ''
firstNonRepeatingLetter('stress')  // 't'
firstNonRepeatingLetter('moonmen') // 'e'


// A sentence is a string of single-space separated words where each word consists only of lowercase letters.
// A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.
// Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.
// - 1 <= s1.length, s2.length <= 200
// - s1 and s2 consist of lowercase English letters and spaces.
// - s1 and s2 do not have leading or trailing spaces.
// - All the words in s1 and s2 are separated by a single space.

const s1 = "this apple is sweet", s2 = "this apple is sour"

function uncommonFromSentences(s1, s2) {
    return [...s1.split(" "), ...s2.split(" ")].map(elem => {
        const regex = new RegExp(`\\b(${elem})\\b`, 'g');

        if(
            (s1.match(regex)?.length === 1 && !s2.match(regex)) ||
            (s2.match(regex)?.length === 1 && !s1.match(regex))
        ) {
            return elem
        }
    }).filter(Boolean)
}

uncommonFromSentences(s1, s2)