// const toChiesesNum = num => {
// 	const chiesesNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
// 	const dw = ['', '十', '百', '千', '万', '十', '百', '千']
// 	const arr = Array.from(num.toString())
// 	let newNum = ''
// 	let count = 0
// 	for (let i = arr.length - 1; i >= 0; i--) {
// 		if (!(arr[i] === '0' && arr[i - 1] === '0')) {
// 			newNum = `${chiesesNum[arr[i]]}${arr[i] === '0' ? '' : dw[count]}${newNum}`
// 		}
// 		count++
// 	}
// 	console.log(newNum)
// }

// toChiesesNum(10101212)

const printMap = n => {
	let matrix = Array.from({ length: n }, function () { return [] }), arr = [], num = 1, count = 1, rowbegin = 0, colbegin = 0, rowend = n - 1, colend = n - 1, s = n
	while (s > 1) {
		let b = parseInt(s / 2)
		arr.push(4 * b * (n - b))
		s = s - 2
	}
	arr = arr.sort((a, b) => a - b)
	const getConut = m => {
		let isZ = ''
		arr.forEach((nb, index) => {
			if (index % 2 == 0) {
				if (index == 0) isZ += `(m>${nb - 1}`
				else isZ += `||(m>${nb - 1}`
				if (index == arr.length - 1) isZ += ')'
			} else {
				isZ += `&&m<${nb})`
			}
		})
		return eval(isZ)
	}
	while (rowbegin <= rowend && colbegin <= colend) {
		for (let i = colbegin; i <= colend; i++) matrix[rowbegin][i] = getConut(num++) ? 0 : 1
		rowbegin++
		for (let i = rowbegin; i <= rowend; i++) matrix[i][colend] = getConut(num++) ? 0 : 1
		colend--
		for (let i = colend; i >= colbegin; i--) matrix[rowend][i] = getConut(num++) ? 0 : 1
		rowend--
		for (let i = rowend; i >= rowbegin; i--) matrix[i][colbegin] = getConut(num++) ? 0 : 1
		colbegin++
	}
	matrix.forEach(row => {
		console.log(row.join(' '))
	})
}
printMap(5)