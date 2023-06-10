import { defineClientConfig } from '@vuepress/client'

import Mcard from './components/Mcard.vue'
import Minfo from './components/Minfo.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const componentList = [
  { name: 'Mcard', component: Mcard },
  { name: 'Minfo', component: Minfo },
]

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // app.use(ElementPlus)

    //注册自定义组件
    componentList.forEach(c => {
      app.component(c.name, c.component)
    })
  }
})