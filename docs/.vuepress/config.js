import { defineUserConfig } from "vuepress"
import { getDirname, path } from '@vuepress/utils'
import docsearchPlugin from './public/plugin/docsearch'
import externalLinkIconPlugin from './public/plugin/linkIcon'
import theme from "./theme.js"

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: "/blog/",
  head: [['link', { rel: 'icon', href: '/blog/head.png' }]],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "wzCoding",
      description: "wzCoding的个人博客",
    },
  },
  plugins: [
    docsearchPlugin,
    externalLinkIconPlugin
  ],
  theme,
  clientConfigFile: path.resolve(__dirname, 'client.js'),
  shouldPrefetch: true,
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/Mblog.vue",
    ),
  }
});
