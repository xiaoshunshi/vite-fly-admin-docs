# Vue3中的分支切换原理

## 新建html，写入如下代码

```
 const {effect,reactive } = VueReactivity
        const state = reactive({
            name:'xiaonshunshi',
            age:33,
            flag:true
        })
        effect(()=>{
            console.log('render')
            document.getElementById('app').innerHTML = state.flag ? state.name:state.age
        })

        setTimeout(()=>{
            state.flag = false
            setTimeout(() => {
                console.log('修改name，原则上更新一次')
                state.name = 'song'
            }, 1000);
           
        },1000)
```

- 上述代码原则上要输出

```
render
render
修改name，原则上更新一次
```

- 就是更改name，不需要再次runder更新视图
- 实际输出为

```
render
render
修改name，原则上更新一次
render
```

- 要修改effect的代码，每次执行effect，就清空deps

```
export let activeEffect = undefined

class ReactiveEffect {
    public active = true
    public parent = null
    public deps = []
    constructor(public fn) { }
    run() {
        if (!this.active) {
            this.fn()
        }
        try {
            this.parent = activeEffect
            activeEffect = this

            cleanupEffect(this)
            return this.fn()
        } finally {
            activeEffect = this.parent
        }
    }
}
// 新增清除effect的deps
function cleanupEffect(effect) {
    const { deps } = effect
    for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect)
    }
    effect.deps.length = 0
}

export function effect(fn) {
    let _effect = new ReactiveEffect(fn)
    _effect.run()
}


const targetMap = new WeakMap()
export function track(target, type, key) {
    if (!activeEffect) return

    let depsMap = targetMap.get(target)

    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)

    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }

    let shouldTrack = !dep.has(activeEffect)

    if (shouldTrack) {
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }

}

export function trigger(target, type, key, value, oldValue) {

    const depsMap = targetMap.get(target)

    if (!depsMap) return

    let effects = depsMap.get(key)

    // effects && effects.forEach(effect => {
    //     if(effect !== activeEffect){
    //         effect.run()
    //     }
    // });

    if (effects) {
        // 要循环一下新的effect，避免死循环
        effects = new Set(effects)
        effects.forEach(effect => {
            if (effect !== activeEffect) {
                effect.run()
            }
        });
    }
}
```