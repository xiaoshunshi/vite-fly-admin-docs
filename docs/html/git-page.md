# 快速发布github的个人网站

##  建gh-pages分支，生产私人密钥

- 新建一个gh-pages分支，删除这个分支的所有内容
- 进入github，点击右上方的头像， setttings -->Developer settings-->Personal access tokens -->Generate new token
- New personal access token
- Note   写一个备注
- Expiration 选择 No expiration
- Select scopes  全选
- 最后生成一个key

:::tip
 记住这个key，key只会在当前页面显示，离开就没了

 不要存在项目中，否则会导致actions失败
:::

## 创建自动执行脚本

- 在项目根目录新建 **.github**文件夹
- 在**.github** 下创建**workflows** 文件夹，然后创建执行脚本 deploy.yml脚本

```yaml
name: vite-fly-admin
on: # 监听 master 分支上的 push 事件
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest # 构建环境使用 ubuntu
    steps:
    # 下载仓库代码
    - uses: actions/checkout@v2

    # 缓存依赖
    # - name: Cache dependencies
    #   uses: actions/cache@v1
    #   with:
    #     path: ~/.npm
    #     key: ${{ runner.os }}--node-${{ hashFiles('**/package-lock.json') }}
    #     restore-keys:  |
    #       ${{ runner.os }}--node-
    # 安装依赖
    - run: npm install
    # 打包构建
    - run: npm run docs:build

    # 发布到gitHub Pages


    - name: Deploy
      uses: peaceiris/actions-gh-pages@v2
      env:
        PERSONAL_TOKEN: ${{ secrets.ACCESS_TOKNE }}
        PUBLISH_BRANCH: gh-pages
        PUBLISH_DIR: ./docs/.vitepress/dist
```

:::tip
 项目使用npm管理的话，可以把缓存依赖打开。  安装依赖 npm install  换为 npm ci

这样安装依赖会缓存npm，构建速度更快
:::

## 开启gitpages，配置actions 的key

- 进入项目中，在settings中 secrets -->Actions--> 添加第一步生成的key，名字必须和脚本的一致**ACCESS_TOKNE**
- 在Pages中，分支选择gh-pages，root
- 更改文件内容，执行一个git push ，然后就可以访问自己的githubpages




