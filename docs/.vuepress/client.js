import { defineClientConfig } from '@vuepress/client'
import Mtable from './components/mtable.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Mtable', Mtable)
  },
})