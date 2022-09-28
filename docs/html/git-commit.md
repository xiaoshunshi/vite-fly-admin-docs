#  配置GitCommit

## 配置 git  commit hook 

  ```
  npx mrm@2 lint-staged
  yarn add @commitlint/config-conventional @commitlint/cli
  ```

:::tip
 在代码提交之前，进行代码规则检查能够确保进入git库的代码都是符合代码规则的。但是整个项目上运行lint速度会很慢，lint-staged能够让lint只检测暂存区的文件，所以速度很快。 
:::
- 配置 prepare、lint-staged

  ```json
  // package.json
  {
    "version": "0.0.0",
    "scripts": {
      "dev": "vite",
      "build": "vue-tsc --noEmit && vite build",
      "serve": "vite preview",
      "lint": "eslint ./src/**/*.ts ./src/**/*.vue --cache --fix",
      "prepare": "husky install"
    },
    "lint-staged": {
      "*.{js,jsx,vue,ts,tsx}": [
        "npm run lint",
      ]
    }
  }
  
  ```

- 安装vite-plugin-eslint 

  ```
  yarn add vite-plugin-eslint -D
  ```

- 配置vite-plugin-eslint 
  ```ts
  // vite.config.ts
   
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import eslintPlugin from 'vite-plugin-eslint'
   
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [
      vue(),
      eslintPlugin({
        cache: false
      })
    ]
  })
  ```


- git commit 规范

  1. feat：新功能（feature）
  2. fix：修补bug
  3. docs：文档（documentation）
  4. style： 格式（不影响代码运行的变动）
  5. refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  6. test：增加测试
  7. chore：构建过程或辅助工具的变动

-  添加commit-msg

    ```sh
    yarn husky add .husky/commit-msg 
    ```

- 再生成的文件中

  ```sh
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"
  
  # undefined
  npx --no -- commitlint --edit $1 
  ```

   将 commit-msg 文件的 undefined 内容修改为 npx --no -- commitlint --edit $1 

- 在根目录新建 commitlint.config.js   

- yarn add  @commitlint/cli @commitlint/config-conventional  -D

  ```js
  // commitlint.config.js
   
  module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [2, 'always', [
        'build',
        'ci',
        'chore',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]]
      // 'subject-full-stop': [0, 'never'],
      // 'subject-case': [0, 'never']
    }
  }
  //   build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
  //   ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
  //   docs：文档更新
  //   feat：新增功能
  //   fix：bug 修复
  //   perf：性能优化
  //   refactor：重构代码(既没有新增功能，也没有修复 bug)
  //   style：不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
  //   test：新增测试用例或是更新现有测试
  //   revert：回滚某个更早之前的提交
  //   chore：不属于以上类型的其他类型
  ```

:::warning
 mac下
 拉取代码后执行
 chmod 700 .husky/* 
 否则commit不生效
:::

- 移除package.json中的type：‘module’