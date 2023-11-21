import { defineClientConfig } from '@vuepress/client'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { myCanvas } from './canvas/canvas'
import { Rain } from './canvas/rain'
import { Sea } from './canvas/sea'
import { clouds, waves, sun } from './canvas/data'
import Mcard from './components/Mcard.vue'
import Minfo from './components/Minfo.vue'

const components = [
  { name: 'Mcard', component: Mcard },
  { name: 'Minfo', component: Minfo },
]
export default defineClientConfig({
  enhance({ app }) {
    components.forEach(c => {
      app.component(c.name, c.component)
    })
  },
  setup() {
    const theme = ref("light");
    onMounted(() => {
      const options = {
        parent: document.body,
        id: `theme-canvas`,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        styles: {
          background: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
          position: "absolute",
          inset: 0
        }
      }
      const canvas = new myCanvas(options);
      const rain = new Rain(canvas, "wzCoding");
      const sea = new Sea(canvas);
      sea.addWave(waves);
      sea.addSun(sun);
      sea.addCloud(clouds);

      const themes = {
        "light": sea,
        "dark": rain
      }
      //观察器监听页面主题变化
      const observer = new MutationObserver((list) => {
        theme.value = list[0].target.getAttribute("data-theme");
      });

      const route = useRoute();
      const animate = () => {
        if (route.fullPath !== "/") {
          themes[theme.value].stop();
          observer.disconnect();
        } else {
          observer.observe(document.documentElement, { attributes: true });
          for (let key in themes) {
            themes[key].stop();
          }
          themes[theme.value].start(60);
        }
      }
      //使用watchEffect立即执行canvas动画
      watchEffect(() => {
        animate();
      })
    });
  }
})

