import { defineClientConfig } from '@vuepress/client'
import { onMounted } from 'vue'

import { createCanvas } from './public/util/canvas'
import { Rain } from './public/util/rain'

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
  },
  setup() {
    onMounted(() => {
      const switchBtn = document.getElementById("appearance-switch");
      const html = document.getElementsByTagName("html")
      switchBtn.addEventListener("click", (event) => {
        const theme = html[0].getAttribute("data-theme");
        console.log(theme)
      })
      const myCanvas = createCanvas("vp-blog-mask", {
        backgroundColor: "#000000",
        width:window.innerWidth,
        height:window.innerHeight,
      });

      const rain = new Rain(myCanvas);
      rain.start("wzCoding",60);
      
    })
  }
})