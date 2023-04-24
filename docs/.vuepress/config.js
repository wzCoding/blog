import { defineUserConfig, defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { getDirname, path } from '@vuepress/utils'

import { CSSProperty } from './public/data/cssData'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
    base: '/blog/',
    title: '知识是颗树',
    description: 'wzCoding的前端博客，前端基础知识收集整理-知识是颗树',
    head: [['link', { rel: 'icon', href: '/blog/images/knowledge.png' }]],
    theme: defaultTheme({
        logo: '/images/knowledge.png',
        navbar: [
            {
                text: '学习探索',
                children: [
                    {
                        text: "学习 HTML",
                        link: "/blog-html/guide.html",
                    },
                    {
                        text: "学习 CSS",
                        link: "/blog-css/guide.html"
                    },
                    {
                        text: "学习 JavaScript",
                        link: "/blog-js/guide.html"
                    },
                    {
                        text: "Demo 展示",
                        link: "/blog-demo/guide.html"
                    }
                ],
            },
            {
                text: "问题收集",
                link: "/1"
            },
            {
                text: "关于我",
                link: "/"
            }
        ],
        sidebarDepth: 2,
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
        },

    }),
    plugins: [
        docsearchPlugin({
            apiKey:"f4378560edb22187170e12514250cef6",
            appId:"8MTXEY4RRL",
            indexName:"wzcodingio"
        })
    ],
    define: {
        CSSProperty
    },
    clientConfigFile: path.resolve(__dirname,'client.js') 
})


