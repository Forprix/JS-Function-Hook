let a = setHook('XMLHttpRequest.prototype.send', function (original, ...args) {
    console.log(this)
    console.log(args)
    return original.call(this, ...args)
})

let b = setHook('fetch', function (original, ...args) {
    console.log(args)
    return original.call(this, ...args)
})

setTimeout(() => {
    clearHook(a)
    clearHook(b)
}, 60 * 1000)