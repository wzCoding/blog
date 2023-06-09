import { defineUserConfig } from "vuepress"
import { getDirname, path } from '@vuepress/utils'
import docsearchPlugin from './public/plugin/docsearch'
import externalLinkIconPlugin from './public/plugin/linkIcon'
import theme from "./theme.js"

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: "/blog/",
  title: "web-docs",
  head: [['link', { rel: 'icon', href: '/blog/lore.svg' }]],
  description: "wzCoding-web-docs",
  theme,
  plugins: [
    docsearchPlugin,
    externalLinkIconPlugin
  ],
  clientConfigFile: path.resolve(__dirname, 'client.js')
  // Enable it with pwa
  // shouldPrefetch: false,
});
