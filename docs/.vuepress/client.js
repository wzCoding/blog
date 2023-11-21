import { defineClientConfig } from '@vuepress/client'
import Mcard from './components/Mcard.vue'
import Minfo from './components/Minfo.vue'

const components = [
  { name: 'Mcard', component: Mcard },
  { name: 'Minfo', component: Minfo },
]
export default defineClientConfig({
  enhance({ app}) {
    components.forEach(c => {
      app.component(c.name, c.component)
    })
  }
})

