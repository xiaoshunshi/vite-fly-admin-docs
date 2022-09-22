# Vue的计算属性

##  新建html文件

```
const {effect,reactive, computed} = VueReactivity
const state = reactive({
    fastname:'xiao',
    lastname:'shunshi'
})

const fullName = computed(()=>{
    console.log('render')
    return state.fastname+ state.lastname
})
effect(()=>{
	document.getElementById('app').innerHTML = fullName.value
})
// const fullName = computed({
//     get(){
//         return state.fastname+ state.lastname
//     },
//     set(){}
// })
setTimeout(()=>{
	state.fastname = '宋'
},1000)
```

## 新建computed.ts,在index.ts中导出方法

```
import { isFunction } from "@vue/shared";
import { ReactiveEffect,trackEffects,triggerEffects} from "./effect";

export function computed(getterOrOptions){
    let onlyGetter = isFunction(getterOrOptions)

    let getter
    let setter

    if (onlyGetter) {
        getter = getterOrOptions
        setter = () => { console.warn('no set') }
    } else {
        getter = getterOrOptions.get
        setter = getterOrOptions.set
    }

    return new ComputedRefImpl(getter, setter)
}

class ComputedRefImpl{
    public effect
    public _dirty = true
    public __v_isReadonly = true
    public __v_isRef = true
    public _value
    public dep = new Set
    constructor(public getter,public setter){
        this.effect =  new ReactiveEffect(getter,()=>{
            if(!this._dirty){
                this._dirty = true
            }
            triggerEffects(this.dep)
        })
    }
    get value(){
        trackEffects(this.dep)
        if (this._dirty) {
            this._dirty = false
            this._value = this.effect.run()
        }
        return this._value
    }
    set value(newValue){
        this.setter(newValue)
    }
}
```

## effect.ts导出两个方法

```
export let activeEffect = undefined

export  class ReactiveEffect {
    public active = true
    public parent = null
    public deps = []
    constructor(public fn,public scheduler) { }
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

function cleanupEffect(effect) {
    const { deps } = effect
    for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect)
    }
    effect.deps.length = 0
}

export function effect(fn, options: any = {}) {
    let _effect = new ReactiveEffect(fn,options.scheduler)
    _effect.run()
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
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

    // let shouldTrack = !dep.has(activeEffect)

    // if (shouldTrack) {
    //     dep.add(activeEffect)
    //     activeEffect.deps.push(dep)
    // }
    trackEffects(dep)
}
export function trackEffects(dep){
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
        // effects = new Set(effects)
        // effects.forEach(effect => {
        //     if (effect !== activeEffect) {
        //         if (effect.scheduler) {
        //             effect.scheduler()
        //         } else {
        //             effect.run()
        //         }
        //     }
        // });
        triggerEffects(effects)
    }
}


export function triggerEffects(effects){
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

```