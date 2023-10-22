import { defineClientConfig } from '@vuepress/client'
import { onMounted} from 'vue'
import { useRoute } from 'vue-router'

import { Canvas } from './public/util/canvas'
import { Rain } from './public/util/rain'
import { Sea } from './public/util/sea'
import { waves, clouds, sun } from './public/util/components/data'

import Mcard from './components/Mcard.vue'
import Minfo from './components/Minfo.vue'

const componentList = [
  { name: 'Mcard', component: Mcard },
  { name: 'Minfo', component: Minfo },
]

export default defineClientConfig({
  enhance({ app, router }) {
    //注册自定义组件
    componentList.forEach(c => {
      app.component(c.name, c.component)
    })
  },
  setup() {
    const route = useRoute();
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
      sea.addSun(sun);
      sea.addWave(waves);
      sea.addCloud(clouds);

      const rain = new Rain(rainCanvas, "wzCoding");

      const themes = {
        "light": { canvas: seaCanvas, instance: sea },
        "dark": { canvas: rainCanvas, instance: rain }
      }

      const changeCanvas = function (theme) {
        
        if (route.fullPath == "/") {
          for (let t in themes) {
            const { canvas, instance } = themes[t];
            // canvas.append(canvas.canvas)
            instance.stop();
            canvas.canvas.style.display = t == theme ? "block" : "none";
          }
          themes[theme].instance.start(60);
        }
      }

      const callback = function (list) {
        const target = list[0];
        const theme = target.target.getAttribute("data-theme");
        changeCanvas(theme);
      }

      // 观察器
      const observer = new MutationObserver(callback);
      const html = document.getElementsByTagName("html")[0];
      observer.observe(html, { attributes: true });

      // changeCanvas("light");
      
    });
  }
})