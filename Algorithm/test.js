let l = [0, 1, [1, [2, [3, [4, [5, [6]]]]]]];
const flatten = (arr) => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
console.log(flatten(l))

