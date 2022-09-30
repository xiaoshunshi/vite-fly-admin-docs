# 图标的使用
## elementui图标
- main.ts
```ts
// 注册icon组件
import * as ElIconsModules from '@element-plus/icons-vue'
// 全局注册element-plus icon图标组件
Object.keys(ElIconsModules).forEach((key) => {
  //循环遍历组件名称
  if ('Menu' !== key) {
    //如果不是图标组件不是Menu，就跳过，否则加上ICon的后缀
    app.component(key, ElIconsModules[key])
  } else {
    app.component(key + 'Icon', ElIconsModules[key])
  }
})
```

## svg图标
- `yarn add vite-plugin-svg-icons -D`
- vite.config.ts
```ts
// 引入vite-plugin-svg-icons
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 添加插件
plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      })
]
```
- 在src下 新增svg文件,[文件地址](https://github.com/xiaoshunshi/vite-fly-admin-again/tree/main/src/icons)
- 在src下，新增components 文件夹，[文件地址](https://github.com/xiaoshunshi/vite-fly-admin-again/tree/main/src/components)
- 在main.ts引入
```ts
// svg-icons注册导入
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
app.component('svg-icon', SvgIcon)
```

