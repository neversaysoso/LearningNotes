const toChiesesNum = n => {
	const chiesesNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
	const section = ['', '十', '百', '千']
	let bigNum = parseInt(n / 10000)
	let litNum = n % 10000
	const toChiesesSection = num => {
		const arr = Array.from(num.toString())
		let newNum = ''
		let count = 0
		for (let i = arr.length - 1; i >= 0; i--) {
			if (arr[i] !== '0') {
				newNum = `${chiesesNum[arr[i]]}${section[count]}${newNum}`
			} else {
				if (i === arr.length - 1) {
					newNum = ''
				} else {
					if (arr[i - 1] !== '0' && arr[arr.length - 1] !== '0') {
						newNum = `${chiesesNum[arr[i]]}${newNum}`
					}
				}
			}
			count++
		}
		return newNum
	}
	if (bigNum > 0) {
		return `${toChiesesSection(bigNum)}万${litNum > 0 && litNum < 1000 ? '零' : ''}${toChiesesSection(litNum)}`
	} else {
		return toChiesesSection(litNum)
	}
}

console.log(toChiesesNum(10101)) 