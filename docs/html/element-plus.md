# element-plus
## element官网
- [https://element-plus.gitee.io/zh-CN/](https://element-plus.gitee.io/zh-CN/)
- 安装
```shell
yarn add element-plus
```
## 用法
### 完整引入
```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```
### 按需导入
- 首先你需要安装unplugin-vue-components 和 unplugin-auto-import这两款插件
```shell
npm install -D unplugin-vue-components unplugin-auto-import
```
- 然后把下列代码插入到你的 Vite的配置文件中
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```