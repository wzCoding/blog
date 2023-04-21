import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
    base:'/blog/',
    title: '知识是颗树',
    description: 'wzCoding的前端博客-知识是颗树',
    head: [['link', { rel: 'icon', href: '/blog/images/knowledge.png' }]],
    theme: defaultTheme({
        logo: '/images/knowledge.png',
        navbar: [
            {
                text: '探索',
                children: [
                    {
                        text: "HTML相关",
                        link: "/blog-html/guide.html",
                    },
                    {
                        text: "CSS相关",
                        link: "/blog-css/guide.html"
                    },
                    {
                        text: "JavaScript相关",
                        link: "/blog-js/guide.html"
                    },
                    {
                        text: "Demo展示",
                        link: "/blog-demo/guide.html"
                    }
                ],
            },
            {
                text: "关于",
                link: "/"
            }
        ],
        sidebarDepth:2,
        sidebar: {
            '/blog-html/': [
                {
                    text: 'HTML相关',
                    collapsible: true,
                    children: [
                        '/blog-html/guide.html',
                        '/blog-html/01.html',
                        '/blog-html/02.html',
                        '/blog-html/03.html',
                        '/blog-html/04.html',
                    ],
                },
            ],
            '/blog-css/': [
                {
                    text: 'CSS相关',
                    collapsible: true,
                    children: [
                        '/blog-css/guide.html',
                        '/blog-css/01.html',
                        '/blog-css/02.html',
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
        }
    }),
})


