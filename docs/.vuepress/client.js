import { defineClientConfig } from '@vuepress/client'
import { onMounted, watchEffect, ref, nextTick } from 'vue'
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
  enhance({ app }) {
    //注册自定义组件
    componentList.forEach(c => {
      app.component(c.name, c.component)
    })
  },
  // setup() {
  //   const themes = {
  //     "light": {
  //       canvas: null,
  //       instance: null
  //     },
  //     "dark": {
  //       canvas: null,
  //       instance: null
  //     }
  //   }
  //   const route = useRoute();
  //   const theme = ref("light");

  //   onMounted(() => {
  //     for (let key in themes) {
  //       themes[key].canvas = new Canvas({
  //         container: document.body,
  //         id: `${key}-canvas`,
  //         width: document.documentElement.clientWidth,
  //         height: document.documentElement.clientHeight,
  //         styles: {
  //           background: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
  //           position: "absolute",
  //           inset: 0
  //         }
  //       })
  //       if (key == "light") {
  //         themes[key].instance = new Sea(themes[key].canvas);
  //         themes[key].instance.addSun(sun);
  //         themes[key].instance.addWave(waves);
  //         themes[key].instance.addCloud(clouds);
  //       } else {
  //         themes[key].instance = new Rain(themes[key].canvas, "wzCoding");
  //       }
  //     }

  //     const changeCanvas = function () {
  //       if (route.fullPath !== "/") {
  //         themes[theme.value].instance.stop();
  //       } else {
  //         for (let t in themes) {
  //           themes[t].instance.stop();
  //         }
  //         themes[theme.value].instance.start(60);
  //       }
  //     }

  //     观察器
  //     const observer = new MutationObserver((list) => {
  //       theme.value = list[0].target.getAttribute("data-theme");
  //     });
  //     observer.observe(document.documentElement, { attributes: true });

  //     watchEffect(() => {
  //       changeCanvas();
  //     });
  //   });
  // }
})