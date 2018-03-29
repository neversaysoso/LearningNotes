const timeout = fn => {
	setTimeout(() => {
		fn()
	}, 1000)
}
const fn = x => new Promise((r, e) => {
	timeout(_ => {
		console.log(x)
		r(x)
	})
})

const bfnn = ((i = 0) => (...fns) => new Promise((r, e) => {
	const cbfnn = f => Promise.all(typeof f !== 'function' ? f.map(_f => _f()) : [f()]).then(_ => {
		if (++i < fns.length) {
			return cbfnn(fns[i])
		} else {
			r()
		}
	})
	cbfnn(fns[0])
}))()


bfnn(_ => fn(1).then(_ => {
	console.log('1isok')
}), _ => fn(2), [_ => fn(3), _ => fn(6)], _ => fn(4), _ => fn(5)).then(_ => {
	console.log('ok')
})