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
console.log(arrAll([1, 2, 3]))