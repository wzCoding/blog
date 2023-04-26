import { defineClientConfig } from '@vuepress/client'
import Mtable from './components/mtable.vue'
import InfoBox from './components/infobox.vue'
const componentList = [
  { name: 'Mtable', component: Mtable },
  { name: 'InfoBox', component: InfoBox },
]
export default defineClientConfig({
  enhance({ app }) {
    componentList.forEach(c => {
      app.component(c.name, c.component)
    })
  },
})