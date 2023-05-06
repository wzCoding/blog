import { defineUserConfig, defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
    base: '/blog/',
    title: '知识是颗树',
    description: 'wzCoding的前端博客，前端基础知识收集整理-知识是颗树',
    head: [['link', { rel: 'icon', href: '/blog/images/lore.svg' }]],
    theme: defaultTheme({
        logo: '/images/lore.svg',
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
                        {
                            text:'CSS 属性',
                            link:'/blog-css/02.html',
                            collapsible:true,
                            children:[
                                '/blog-css/property/a.md',
                                
                            ]
                        },
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
            apiKey: "a5b7d51605c449deea8a2761d05a618f",
            appId: "8MTXEY4RRL",
            indexName: "wzcodingio",
            placeholder:"请输入关键词",
            translations: {
                button: {
                    buttonText: '搜索',
                    buttonAriaLabel: '搜索',
                },
                modal: {
                    searchBox: {
                        resetButtonTitle: '放弃搜索',
                        resetButtonAriaLabel: '放弃搜索',
                        cancelButtonText: '取消',
                        cancelButtonAriaLabel: '取消',
                    },
                    startScreen: {
                        recentSearchesTitle: '最近搜索',
                        noRecentSearchesText: '没有最近搜索记录',
                        saveRecentSearchButtonTitle: '保存搜索记录',
                        removeRecentSearchButtonTitle: '删除搜索记录',
                        favoriteSearchesTitle: '保存搜索记录',
                        removeFavoriteSearchButtonTitle: '删除搜索记录',
                    },
                    errorScreen: {
                        titleText: '无法查询搜索结果',
                        helpText: '请检查你的网络连接...',
                    },
                    footer: {
                        selectText: '选择',
                        selectKeyAriaLabel: 'Enter key',
                        navigateText: '移动',
                        navigateUpKeyAriaLabel: 'Arrow up',
                        navigateDownKeyAriaLabel: 'Arrow down',
                        closeText: '关闭',
                        closeKeyAriaLabel: 'Escape key',
                        searchByText: '搜索功能来自',
                    },
                    noResultsScreen: {
                        noResultsText: '很抱歉，搜索不到',
                        suggestedQueryText: '请尝试搜索',
                        reportMissingResultsText: '相信这条搜索结果吗？',
                        reportMissingResultsLinkText: '联系我们',
                    },
                },
            }
        })
    ],
    alias: {
        '@data': path.resolve(__dirname, './public/data'),
    },
    clientConfigFile: path.resolve(__dirname, 'client.js')
})


