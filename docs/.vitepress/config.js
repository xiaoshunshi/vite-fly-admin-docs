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
        // 头部指南配置
        nav: nav(),
        // 侧边栏配置
        sidebar: {
            '/guide/': sidebarGuide(),
            // '/config/': sidebarConfig()
        },
        // 头部导航的图标链接
        socialLinks: [{
            icon: 'github',
            link: 'https://github.com/xiaoshunshi/vite-fly-admin-docs'
        }],

        // 底部版权
        footer: {
            message: '在 MIT 许可下发布。',
            copyright: '版权所有 © 2022-至今 Xiao Shunshi'
        },
        // 广告
        carbonAds: {
            code: 'CEBDT27Y',
            placement: 'vuejsorg'
        },
        // 搜索，需要申请algolia，暂时没有实现
        algolia: {
            appId: '8J64VVRP8K',
            apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
            indexName: 'vitepress'
        },
    }

}

function nav() {
    return [{
            text: '指南',
            link: '/guide/what-is-vite-fly-admin',
            activeMatch: '/guide/'
        },
        {
            text: '教程',
            items: [{
                // You may also omit the title.
                items: [{
                        text: '前端',
                        link: '/html/html',
                        activeMatch: '/html/',
                    },
                    {
                        text: '后端',
                        link: '/node/node'
                    },
                    {
                        text: '数据库',
                        link: '/sql/mysql'
                    }
                ]
            }]
        }
    ]
}

function sidebarGuide() {
    return [{
        text: '指南',
        // 开启折叠
        collapsible: true,
        items: [{
                text: '简介',
                link: '/guide/what-is-vite-fly-admin'
            }, {
                text: '安装',
                link: '/guide/installation'
            },
            {
                text: '快速开始',
                link: '/guide/quieStart'
            }
        ]
    }]
}