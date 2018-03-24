const f = n => {
    if (n == 1 || n == 2) {
        return 1
    }
    return f(n - 1) + f(n - 2)
}

const f2 = ((c = {}) => n => {
    const co = x => c[x] || (c[x] = f2(x))
    return n < 3 ? 1 : co(n - 1) + co(n - 2)
})()

const total = n => {
    let t = 0
    let num = n
    for (let i = 0; i < n; i++) {
        t += f2(num)
        num--
    }
    return t
}

// function printIp(ipA, ipB) {
//   var arrIpA = ipA.split(".");
//   var arrIpB = ipB.split(".");
//   var ips = [];
//   for (let A = arrIpA[0]; A <= arrIpB[0]; A++) {
//     for (
//       let B = (A == arrIpA[0] ? arrIpA[1] : 0);
//       B <= (A == arrIpB[0] ? arrIpB[1] : 255);
//       B++
//     ) {
//       for (
//         let C = (B == arrIpA[1] ? arrIpA[2] : 0);
//         C <= (B == arrIpB[1] ? arrIpB[2] : 255);
//         C++
//       ) {
//         for (
//           let D = (C == arrIpA[2] ? arrIpA[3] : 0);
//           D <= (C == arrIpB[2] ? arrIpB[3] : 255);
//           D++
//         ) {
//           ips.push(`${A}.${B}.${C}.${D}`);
//         }
//       }
//     }
//   }
//   return ips
// }
// console.log(printIp("1.1.1.1", "1.1.2.4"));

// const arrAll = arr => {
//   var allarr = []
//   arr.forEach((a, item) => {
//     let _arr = arr.concat()
//     _arr.splice(item, 1)
//     if (_arr.length == 1) {
//       allarr.push([a, ..._arr])
//     } else {
//       arrAll(_arr).forEach(_a => {
//         allarr.push([a, ..._a])
//       })
//     }
//   })
//   return allarr
// }
// console.log(arrAll(['a', 'b', 'c', 'd']))

// let arr = [{ a: 1 }, { b: 2, d: 666 }, { c: 3 }]
// let s
// arr.map(i => {
//   s = {
//     ...s,
//     ...i
//   }
// })
// console.log(s)

// console.count = 1
// console.olog = console.log
// console.log = ((count) => (...o) => {
//   console.olog(`${++count}:`, ...o)
// })(0)

// console.log('foo', '666')
// console.log('foo')
// console.log('foo')


// const toChiesesNum = num => {
//   const chiesesNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
//   const dw = ['', '十', '百', '千', '万', '十', '百', '千']
//   const arr = Array.from(num.toString())
//   let newNum = ''
//   let count = 0
//   for (let i = arr.length - 1; i >= 0; i--) {
//     if (!(arr[i] === '0' && arr[i - 1] === '0')) {
//       newNum = `${chiesesNum[arr[i]]}${arr[i] === '0' ? '' : dw[count]}${newNum}`
//     }
//     count++
//   }
//   console.log(newNum)
// }

let a = []
for (let i = 0; i < 100; i++) {
    a.push({
        id: i,
        name: `name ${i}`
    })
}
const b = [2, 3, 31]

let obj = {}
a.forEach(i => {
    obj[`${i.id}`] = i
})

let c = Array.from(b.map(i => obj[`${i}`]))
console.log(c)