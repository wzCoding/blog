import { defineUserConfig, defaultTheme } from 'vuepress'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'

export default defineUserConfig({
    lang: 'zh-CN',
    title: '知识是颗树',
    description: 'wzCoding的前端博客-知识是颗树',
    head: [['link', { rel: 'icon', href: '/images/knowledge.png' }]],
    theme: defaultTheme({
        // Public 文件路径
        logo: '/images/knowledge.png',
        // colorMode:'dark',
        // colorModeSwitch:false //colorModeSwitch设置为false,colorMode才会生效
        navbar: [
            {
                text: '探索',
                children: [
                    {
                        text: "HTML相关",
                        link: "/blog-html/",
                    },
                    {
                        text: "CSS相关",
                        link: "/blog-css/"
                    },
                    {
                        text: "JavaScript相关",
                        link: "/blog-js/README.md"
                    },
                    {
                        text: "Demo展示",
                        link: "/blog-demo/"
                    }
                ],
            },
            {
                text: "关于",
                link: "/"
            }
        ],
        sidebar: {
            '/blog-html/': [
                {
                    text: 'HTML相关',
                    collapsible: true,
                    children: [
                        '/blog-html/2023-04-12.md'
                    ],
                },
            ],
            '/blog-css/': [
                {
                    text: 'CSS相关',
                    collapsible: true,
                    children: [
                        
                    ],
                },
            ],
            '/blog-js/': [
                {
                    text: 'JavaScript相关',
                    collapsible: true,
                    children: [
                        
                    ],
                },
            ],
            '/blog-demo/': [
                {
                    text: 'Demo展示',
                    collapsible: true,
                    children: [
                        
                    ],
                },
            ],
        },
        plugins: [
            nprogressPlugin(),
        ]
    }),
})


