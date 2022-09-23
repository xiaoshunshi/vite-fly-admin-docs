import DefaultTheme from 'vitepress/theme'

// import ZIcon from '@fly-ui/components/icon'
// import '@fly-ui/theme-chalk/src/index.scss'


import DaShang from '../../component/dashang.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(DaShang) // 在vitepress中 注册全局组件
  }
}
