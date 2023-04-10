import { defineUserConfig,defaultTheme } from 'vuepress'
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

        plugins: [
            nprogressPlugin(),
        ]
      }),
})


