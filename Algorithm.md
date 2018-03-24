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