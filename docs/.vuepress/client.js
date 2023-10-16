import { defineClientConfig } from '@vuepress/client'
import { onMounted } from 'vue'

import { Canvas } from './public/util/canvas'
import { Rain } from './public/util/rain'
import { Sea } from './public/util/sea'

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
    console.log(router);
  },
  setup() {
    onMounted(() => {
      const html = document.getElementsByTagName("html")[0];
      const canvas = new Canvas("vp-blog-mask", window.innerWidth, window.innerHeight);
      const rain = new Rain(canvas, "wzCoding");
      const sea = new Sea(canvas);
      const callback = function (list) {
        const target = list[0];
        const theme = target.target.getAttribute("data-theme");
        if (theme == "dark") {
          rain.start(60);
        } else {
          rain.stop();
          
        }
      }

      // 观察器
      const observer = new MutationObserver(callback);
      observer.observe(html, { attributes: true });
    })
  }
})