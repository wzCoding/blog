import { defineClientConfig } from '@vuepress/client'
import { useComponent } from '@public/utils'
import { useSideStore } from '@public/store/sideStore'

import Mcard from './components/Mcard.vue'
import Minfo from './components/Minfo.vue'
import Mtool from './components/Mtool.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const customSideUrl = ['/blog-css/property']
const componentList = [
  { name: 'Mcard', component: Mcard },
  { name: 'Minfo', component: Minfo },
]

export default defineClientConfig({
  enhance({ app, router }) {
    // app.use(ElementPlus)

    //注册自定义组件
    componentList.forEach(c => {
      app.component(c.name, c.component)
    })

    // 使用Router来处理页面路由数据
    router.beforeEach((to, from, next) => {
      const sideStore = useSideStore()
      customSideUrl.forEach(url => {
        sideStore.hasSide = to.fullPath.includes(url)
        sideStore.sideId = to.meta.title
        if (sideStore.sideActive) sideStore.sideActive = false
      })
      next()
    })

    //通过js来调用自定义组件
    useComponent(Mtool)
  },

})