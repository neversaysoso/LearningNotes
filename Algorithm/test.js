let a = [1, 2, 3, 5, 6, 7, 3]
let b = [6, 6, 56, 2, 32, 3, 2, 23]
let l = [0, 1, [1, [2, [3, [4, [5, [6]]]]]]]
const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])

console.log(flatten(l))