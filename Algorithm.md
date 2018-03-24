### 1.斐波那契数列求和

```javascript
// 基本方式，可用于测试性能
const f = n => {
	if (n == 1 || n == 2) {
		return 1
	}
	return f(n - 1) + f(n - 2)
}
// 方式二，高性能
const f2 = ((c = {}) => n => {
	const co = x => c[x] || (c[x] = f2(x))
	return n < 3 ? 1 : co(n - 1) + co(n - 2)
})()
// 求和
const total = n => {
	let t = 0
	let num = n
	for (let i = 0; i < n; i++) {
		t += f2(num)
		num--
	}
	return t
}
```

### 2.写一个函数printIp，列出3个ip之间的所有ip

```javascript
const printIp = (ipA, ipB) => {
	var arrIpA = ipA.split(".");
	var arrIpB = ipB.split(".");
	var ips = [];
	for (let A = arrIpA[0]; A <= arrIpB[0]; A++) {
		for (
			let B = (A == arrIpA[0] ? arrIpA[1] : 0);
			B <= (A == arrIpB[0] ? arrIpB[1] : 255);
			B++
		) {
			for (
				let C = (B == arrIpA[1] ? arrIpA[2] : 0);
				C <= (B == arrIpB[1] ? arrIpB[2] : 255);
				C++
			) {
				for (
					let D = (C == arrIpA[2] ? arrIpA[3] : 0);
					D <= (C == arrIpB[2] ? arrIpB[3] : 255);
					D++
				) {
					ips.push(`${A}.${B}.${C}.${D}`);
				}
			}
		}
	}
	return ips
}
```

### 3.写一个函数arrAll，列出一个简单数组的所有元素的所有排序方式

```javascript
const arrAll = arr => {
	var allarr = []
	arr.forEach((a, item) => {
		let _arr = arr.concat()
		_arr.splice(item, 1)
		if (_arr.length == 1) {
			allarr.push([a, ..._arr])
		} else {
			arrAll(_arr).forEach(_a => {
				allarr.push([a, ..._a])
			})
		}
	})
	return allarr
}
```

### 4.重写函数console.log，要求在打印前增加一个递增的索引

```javascript
console.log = ((fn, count) => (...o) => {
	fn(`${++count}:`, ...o)
})(console.log, 0)
```

### 5.写一个函数sameObj，用来对比2个对象数列，得到2个数列中id属性相等的数列

```javascript
const sameObj = ((obj = {}) => (arr1, arr2) => {
	arr1.forEach(i => {
		obj[`${i.id}`] = i
	})
	return Array.from(arr2.map(i => obj[`${i.id}`]))
})()
```

### 6.写一个函数printMap(n)，实现n排n列的回旋图案

```javascript
printMap(5)
1 1 1 1 1
0 0 0 0 1
1 1 1 0 1
1 0 0 0 1
1 1 1 1 1
```

```javascript
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
```

### 7.写一个函数，要求将阿拉伯数字转换为中文数字，处理到千万级别

```javascript
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
```

### 8.将多层嵌套数组拍平到同级

```javascript
let arr = [[0, 1], [1, [2, [3, [4, [5, [6]]]]]]] // [ 0, 1, 1, 2, 3, 4, 5, 6 ]
```

```javascript
const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
```