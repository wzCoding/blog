import { defineUserConfig, defaultTheme } from 'vuepress'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'

const baseUrl = '/blog/'

export default defineUserConfig({
    base:baseUrl,
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
                link: baseUrl
            }
        ],
        sidebarDepth:2,
        sidebar: {
            '/blog-html/': [
                {
                    text: 'HTML相关',
                    collapsible: true,
                    children: [
                        '/blog-html/guide.md',
                        '/blog-html/01.md',
                        '/blog-html/02.md',
                        '/blog-html/03.md',
                        '/blog-html/04.md',
                    ],
                },
            ],
            '/blog-css/': [
                {
                    text: 'CSS相关',
                    collapsible: true,
                    children: [
                        '/blog-css/guide.md',
                        '/blog-css/01.md',
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


