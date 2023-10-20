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
        height: window.innerHeight,
        styles: { background: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)" }
      });
      const rainCanvas = new Canvas({
        parent: "vp-blog-mask",
        canvasId: "rain-canvas",
        width: window.innerWidth,
        height: window.innerHeight
      });

      const sea = new Sea(seaCanvas);
      const rain = new Rain(rainCanvas, "wzCoding");
      sea.addSun({
        canvas: seaCanvas,
        xCoord: 100 / window.devicePixelRatio,
        yCoord: 100 / window.devicePixelRatio,
        radius: 30 / window.devicePixelRatio
      });
      sea.addWave({
        canvas: seaCanvas,
        wavePeriod: 2,
        waveHeight: 30 / window.devicePixelRatio,
        wavexCoord: 0,
        waveyCoord: 400,
        wavexMove: 0,
        horizontalSpeed: 0.08,
        waveColor: "#69c0ff"
      },
        {
          canvas: seaCanvas,
          wavePeriod: 2,
          waveHeight: 40 / window.devicePixelRatio,
          wavexCoord: 0,
          waveyCoord: 420,
          wavexMove: 0,
          horizontalSpeed: 0.1,
          verticalSpeed: 0.05,
          waveColor: "#409eff"
        },
        {
          canvas: seaCanvas,
          wavePeriod: 2,
          waveHeight: 35 / window.devicePixelRatio,
          wavexCoord: 0,
          waveyCoord: 500,
          wavexMove: 0,
          horizontalSpeed: 0.15,
          waveColor: "#093da8"
        })

      sea.addCloud({
        canvas: seaCanvas,
        xCoord: 100 / window.devicePixelRatio,
        yCoord: 200 / window.devicePixelRatio,
        radius: 30 / window.devicePixelRatio,
        speed: 2.5
      },
        {
          canvas: seaCanvas,
          xCoord: 100 / window.devicePixelRatio,
          yCoord: 120 / window.devicePixelRatio,
          radius: 40 / window.devicePixelRatio,
          speed: 2
        },
        {
          canvas: seaCanvas,
          xCoord: 100 / window.devicePixelRatio,
          yCoord: 240 / window.devicePixelRatio,
          radius: 60 / window.devicePixelRatio,
          speed: 1.5
        })
      sea.start();

      const changeCanvas = function (theme) {
        const themeObj = {
          "light": seaCanvas,
          "dark": rainCanvas
        }
        for (let t in themeObj) {
          const { canvas } = themeObj[t];
          canvas.style.display = t == theme ? "block" : "none";
        }
      }
      changeCanvas("light");
      const callback = function (list) {
        const target = list[0];
        const theme = target.target.getAttribute("data-theme");
        changeCanvas(theme);

      }

      // 观察器
      const observer = new MutationObserver(callback);
      const html = document.getElementsByTagName("html")[0];
      observer.observe(html, { attributes: true });
    })
  }
})