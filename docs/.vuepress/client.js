import { defineClientConfig } from '@vuepress/client'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { createPinia, defineStore } from 'pinia'
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
export const useThemeStore = defineStore('theme', () => {
  const theme = ref("light");
  return { theme }
})
export default defineClientConfig({
  enhance({ app }) {
    const pinia = createPinia()
    app.use(pinia)
    components.forEach(c => {
      app.component(c.name, c.component);
    });
  },
  setup() {
    onMounted(() => {
      const navHeight = document.querySelector("#navbar").clientHeight;
      const option = {
        parent: document.body,
        id: `theme-canvas`,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - navHeight,
        navHeight,
        styles: {
          background: "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
          position: "absolute",
          top:`${navHeight}px`,
          left:0,
          transition: "all 0.3s"
        }
      }
      const canvas = new myCanvas(option);
      const rain = new Rain(canvas);
      const sea = new Sea(canvas);
      sea.addWave(waves);
      
      const themes = {
        "light": sea,
        "dark": rain
      }
      const route = useRoute();
      const themeStore = useThemeStore();
      themeStore.theme = window.localStorage.getItem("vuepress-theme-hope-scheme");
      const observer = new MutationObserver((list) => {
        themeStore.theme = list[0].target.getAttribute("data-theme");
      });
      const animate = () => {
        if (route.fullPath !== "/") {
          themes[themeStore.theme].stop();
          observer.disconnect();
        } else {
          observer.observe(document.documentElement, { attributes: true });
          for (let key in themes) { themes[key].stop() }
          themes[themeStore.theme].start(60);
        }
      }
      //使用watchEffect立即执行canvas动画并监听
      watchEffect(() => {
        animate();
      })
    });
  }
})

