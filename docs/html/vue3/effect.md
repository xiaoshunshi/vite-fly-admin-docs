# Vue中的effect方法

- src下新增effect.ts

```
export let activeEffect = undefined

class ReactiveEffect{
    public active = true
    public parent = null
    public deps = []
    constructor(public fn){}
    run(){
        if(!this.active){
            this.fn()
        }
        try {
            this.parent = activeEffect
            activeEffect = this
            return this.fn()
        } finally {
            activeEffect = this.parent
        }
    }
}

export function effect(fn){
  let _effect =  new ReactiveEffect(fn)
  _effect.run()
}


const targetMap = new WeakMap()
export function track(target, type, key){
    if(!activeEffect) return

    let depsMap = targetMap.get(target)

    if(!depsMap){
        targetMap.set(target,(depsMap = new Map()))
    }

    let dep = depsMap.get(key)

    if(!dep){
        depsMap.set(key,(dep = new Set()))
    }

    let shouldTrack = !dep.has(activeEffect)

    if(shouldTrack){
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }
 
}

export function trigger(target,type,key,value,oldValue){

    const depsMap = targetMap.get(target)

    if(!depsMap) return

    const effects = depsMap.get(key)

    effects && effects.forEach(effect => {
        if(effect !== activeEffect){
            effect.run()
        }
    });
}
```

- baseHandler.ts

```
import { track, trigger } from "./effect"
import { isObject } from "@vue/shared"
import { reactive } from "./reactive"

export const enum ReactiveFlags {
    IS_REACTIVE = '_v_isReactive'
}
export const mutableHandlers =   {
    get(target,key,receiver){
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true
        }
        track(target,'get',key)
        let res = Reflect.get(target, key, receiver)
        if (isObject(res)) {
            return reactive(res)
        }
        return res
    },
    set(target,key,value,receiver){
        let oldValue = target[key]
        let result = Reflect.set(target, key, value, receiver)
        if(oldValue !== value){
            trigger(target,'set',key,value,oldValue)
        }
        return result
    }
}
```