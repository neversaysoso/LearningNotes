let a = [{
	id: 1
}, {
	id: 2
}, {
	id: 3,
	name: 6
}]


let b = [{
	id: 2
}, {
	id: 3,
	sex: '2'
}, {
	id: 4
}]
const sameObj = ((obj = {}, arr = []) => (arr1, arr2) => {
	arr1.forEach(i => {
		obj[`${i.id}`] = i
	})
	arr2.forEach(i => {
		if (typeof obj[`${i.id}`] !== 'undefined') {
			arr.push({
				...obj[`${i.id}`],
				...i
			})
		}
	})
	return arr
})()

console.log(sameObj(a, b))