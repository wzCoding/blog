import { defineClientConfig } from '@vuepress/client'
import { Timer } from './public/util/utils'
import { onMounted } from 'vue'
import Mcard from './components/Mcard.vue'
import Minfo from './components/Minfo.vue'

const componentList = [
  { name: 'Mcard', component: Mcard },
  { name: 'Minfo', component: Minfo },
]

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    //注册自定义组件
    componentList.forEach(c => {
      app.component(c.name, c.component)
    })

    onMounted(() => {
        console.log("onMounted")
    })
  }
})