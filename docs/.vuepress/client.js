import { defineClientConfig } from '@vuepress/client'
import { onMounted, ref } from 'vue'

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

  },
  setup() {
    onMounted(() => {
      const seaCanvas = new Canvas({
        parent: "vp-blog-mask",
        canvasId: "sea-canvas",
        width: window.innerWidth,
        height: window.innerHeight
      });
      const rainCanvas = new Canvas({
        parent: "vp-blog-mask",
        canvasId: "rain-canvas",
        width: window.innerWidth,
        height: window.innerHeight
      });

      const sea = new Sea(seaCanvas);
      const rain = new Rain(rainCanvas, "wzCoding");
      const showcanvas = ref(true);
      const shows = ["none", "block"];
      seaCanvas.canvas.style.display = shows[Number(showcanvas.value)]
      rainCanvas.canvas.style.display = shows[Number(!showcanvas.value)]

      const callback = function (list) {
        const target = list[0];
        const theme = target.target.getAttribute("data-theme");
        showcanvas.value = !showcanvas.value;
        if (theme == "dark") {
          rain.start(60);
        } else {
          rain.stop();

          // sea.addWave({
          //   canvas: canvas,
          //   wavePeriod: 3,
          //   waveHeight: 30,
          //   wavexAxisCoord: 0,
          //   waveyAxisCoord: 500,
          //   wavexAxisMove: 0,
          //   horizontalSpeed: 0.03,
          //   waveColor: "#093da8"
          // })
        }
      }

      // 观察器
      const observer = new MutationObserver(callback);
      const html = document.getElementsByTagName("html")[0];
      observer.observe(html, { attributes: true });
    })
  }
})