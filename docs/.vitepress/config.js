export default {
    // 导航栏title
    title: 'Vite-fly-admin',
    description: 'Just playing around.',
    // 打包的基础路径
    base: '/',
    // 设置是否显示切换主题，默认为true
    appearance: false,
    // 设置网页ico图标
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.ico'
        }]
    ],
    // 显示文档的最后修改时间
    lastUpdated: true,
    themeConfig: {
        // 设置logo
        logo: '/logo.jpeg',
        // siteTitle: "My Custom Title", // 可设置为false
        // 文档下方修改时间
        lastUpdatedText: '最后修改时间',
        // 文档列表显示
        outlineTitle: '目录',
        // 头部导航的图标链接
        socialLinks: [{
            icon: 'github',
            link: 'https://github.com/xiaoshunshi/vitepress-docs'
        }],
    }

  }