const hookRemovers = new Map()
let lastHookId = 0 

function setHook(targetName, hook) {

    let names = targetName.split('.')
    let target = window
    for (let i = 0; i < names.length - 1; i++)
        target = target[names[i]]

    let original = target[names[names.length - 1]]
    target[names[names.length - 1]] = function(...args) { hook.call(this, original, ...args) }

    hookRemovers.set(lastHookId, () => {
        target[names[names.length - 1]] = original
    })
    
    return lastHookId++
}
function clearHook(id) {
    hookRemovers.get(id)()
    hookRemovers.delete(id)
}