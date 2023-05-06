import { defineClientConfig } from '@vuepress/client'
import Mtable from './components/mtable.vue'
import InfoBox from './components/infobox.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const componentList = [
  { name: 'Mtable', component: Mtable },
  { name: 'InfoBox', component: InfoBox },
]

export default defineClientConfig({
  enhance({ app }) {
    app.use(ElementPlus)
    componentList.forEach(c => {
      app.component(c.name, c.component)
    })
  },
})