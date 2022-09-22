# reactivity和shared

## reactivity初始化项目

```
{
  "name": "@vue/reactivity",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "buildOptions":{
    "name":"VueReactivity",
    "formats":[
      "global",
      "cjs",
      "esm-budler"
    ]
  }
}

```

## shared

```
{
  "name": "@vue/shared",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "buildOptions":{
    "formats":[
      "cjs",
      "esm-budler"
    ]
  }
}
```

- 文件夹下新增src文件和index.ts入口文件

## 打包测试

- 在shared写入公共方法

```
export const isObject = (value: any) => {
    return value !== null && typeof value === 'object'
}
```

- 在reactivity引入该方法

```
import { isObject } from "@vue/shared";


console.log(isObject(true))
```

- 执行pnpm run dev
- reactivity下生成dist说明打包成功，项目配置没问题

## Vue的reactive方法

- index.ts

```
export { effect } from './effect'
export { reactive } from './reactive'
```



- src下新建reactive.ts

```
import {  isObject  } from '@vue/shared'

const reactiveMap = new WeakMap()
const enum ReactiveFlags {
    IS_REACTIVE = '_v_isReactive'
}
export function reactive(target){

    if(!isObject(target)){
        return
    }
    
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }

    let exisitingProxy = reactiveMap.get(target)
    if(exisitingProxy){
        return exisitingProxy
    }

    const proxy = new Proxy(target,{
        get(target,key,receiver){
            if (key === ReactiveFlags.IS_REACTIVE) {
                return true
            }
            return Reflect.get(target,key,receiver)
        },
        set(target,key,value,receiver){
            return Reflect.set(target,key,value,receiver)
        }
    })
    reactiveMap.set(target,proxy)

    return proxy

}
```

- 抽取代理方法，新建baseHandler.ts

```
import { isObject } from "@vue/shared"
import { reactive } from "./reactive"

export const enum ReactiveFlags {
    IS_REACTIVE = '_v_isReactive'
}

export const mutableHandlers = {
    get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true
        }
        let res = Reflect.get(target, key, receiver)
        if (isObject(res)) {
            return reactive(res)
        }
        return res
    },
    set(target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver)
    }
}
```



- reactive.ts

```
import {  isObject  } from '@vue/shared'
import { mutableHandlers,ReactiveFlags } from './baseHandler'
const reactiveMap = new WeakMap()

export function reactive(target){
    if(!isObject(target)){
        return
    }
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    // const state1 = reactive(data)
    // const state2 = reactive(state1)
    }
    let exisitingProxy = reactiveMap.get(target)
    if(exisitingProxy){
        return exisitingProxy
    }
    const proxy = new Proxy(target,mutableHandlers)
    reactiveMap.set(target,proxy)
    // const state1 = reactive(data)
    // const state2 = reactive(data)
    return proxy
}
```