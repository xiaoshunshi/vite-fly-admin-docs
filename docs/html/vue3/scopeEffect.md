# Vue中的调度器scopeEffect

- 新建html，写入如下代码

```
const {
    effect,
    reactive
} = VueReactivity
 const state = reactive({
    name: 'xiaoshunshi',
    age: 13,
    flag: true
 })
 let ruuner = effect(() => {
    document.getElementById('app').innerHTML = state.age
  })

  ruuner.effect.stop()
  setTimeout(() => {
      state.age = 1000
       setTimeout(() => {
           ruuner()
        }, 1000);
  }, 1000)
```

- stop（）方法阻止了更新，页面还是显示13
- 修改effect

```
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
    stop(){
        if(this.active){
            this.active = false
            cleanupEffect(this)
        }
    }
}


.....................
.....................
.....................


export function effect(fn) {
    let _effect = new ReactiveEffect(fn)
    _effect.run()
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}
```

- 修改html，传入options参数，按照参数的方式执行effect

```
    let waiting = false
    const {
        effect,
        reactive
    } = VueReactivity
    const state = reactive({
        name: 'zcf',
        age: 13,
        flag: true
    })
    let ruuner = effect(() => {
        document.getElementById('app').innerHTML = state.age
    }, {
        scheduler() {
            console.log('run')

            if (!waiting) {
                waiting = true
                setTimeout(() => {
                    ruuner()
                    waiting = false
                }, 1000);
            }

        }
    })

    // ruuner.effect.stop()
    state.age = 1000
    state.age = 10001
    state.age = 10002
    state.age = 10003
    state.age = 10004
    state.age = 10005
    state.age = 10006
```

- 修改effect的函数，接受一个参数

```
  class ReactiveEffect {
  
  		constructor(public fn,public scheduler) { }
.....................
.....................
.....................


export function effect(fn, options: any = {}) {
    let _effect = new ReactiveEffect(fn,options.scheduler)
    _effect.run()
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}
.....................
.....................
.....................
 function trigger(target, type, key, value, oldValue) {
 .....................
 	if (effects) {
        effects = new Set(effects)
        effects.forEach(effect => {
            if (effect !== activeEffect) {
                if (effect.scheduler) {
                    effect.scheduler()
                } else {
                    effect.run()
                }
            }
        });
    }
    .....................
 }
```