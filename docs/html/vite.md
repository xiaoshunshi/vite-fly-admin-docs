# vite.config.ts的配置
## 配置别名
- 安装@types/node
- `yarn add @types/node -D`

  ```ts
  import path from 'path'
  const resolve = (dir: string) => path.join(__dirname, dir)
  .......
   resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  .......
  ```
   ::: tip
   解决找不到模块“path”或其相应的类型声明。
  :::
- ts.config.json

    ```json
    "paths": {
        "@/*":["./src/*"]
        },
    ```


  ::: tip
   这一步是用来解决 “报错：找不到模块“xxx”或其相应的类型声明” 的

   配置 “baseUrl 和 paths” 项
   
   paths 里的内容根据别名来进行相关配置
  :::
  
## 配置serve


  ```ts
  server: {
      // 服务器主机名
      // host: '',
      // 端口号
      port: 3088,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      // 服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
      open: true,
      // 自定义代理规则
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  ```
