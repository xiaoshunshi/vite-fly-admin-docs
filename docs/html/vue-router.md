# vue-router
## vue-router官网
- [https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)
## 安装
```shell
yarn add vue-router@4
```
## 使用
## app.vue
- 添加router-view路由出口
```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped>
</style>
```
## 路由文件
- src下面添加router文件夹
- index.ts
```ts
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/login/index.vue' ),
    meta: {
      hidden: true,
      title: '登录'
    }
  }
]

const router = createRouter( {
  history: createWebHashHistory( ),
  routes: constantRoutes,
  scrollBehavior: () => ( { left: 0, top: 0 } )
} )

export default router
```
## main.ts
```ts
import { createApp } from 'vue'
import router from './router' // 路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp( App )

app.use( ElementPlus )
app.use( router )
app.mount( '#app' )

```
