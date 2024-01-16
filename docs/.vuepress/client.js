import { defineClientConfig } from '@vuepress/client'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { myCanvas } from './canvas/canvas'
import { Rain } from './canvas/rain'
import { Sea } from './canvas/sea'
import { clouds, waves } from './canvas/data'
import Mcard from './components/Mcard.vue'
import Minfo from './components/Minfo.vue'
const components = [
  { name: 'Mcard', component: Mcard },
  { name: 'Minfo', component: Minfo },
]
export default defineClientConfig({
  enhance({ app }) {
    components.forEach(c => {
      app.component(c.name, c.component);
    });
  },
  setup() {
    onMounted(() => {
      const option = {
        parent: document.body,
        id: `theme-canvas`,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        styles: {
          background: "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
          position: "absolute",
          inset: 0,
          transition: "all 0.3s"
        }
      }

      const canvas = new myCanvas(option);

      const rain = new Rain(canvas);
      rain.set({ color: "#409eff" });

      const sea = new Sea(canvas);
      sea.addMaterial(waves, "waves");
      
      //使用observer监听主题变化（监听click偶尔会失效!!!）
      const observer = new MutationObserver((list) => {
        theme.value = list[0].target.getAttribute("data-theme");
      })
      //从缓存中获取主题
      const getTheme = () => {
        const value = window.localStorage.getItem("vuepress-theme-hope-scheme");
        return value && value !== 'auto' ? value : "light";
      }

      const route = useRoute();
      const theme = ref(getTheme());
      const themes = {
        "light": sea,
        "dark": rain
      }

      const animate = () => {
        if (route.fullPath !== "/") {
          themes[theme.value].stop();
          observer.disconnect();
        } else {
          observer.observe(document.documentElement, { attributes: true });
          for (let key in themes) { themes[key].stop() }
          themes[theme.value].start(60);
        }
      }

      //使用watchEffect立即执行canvas动画并监听
      watchEffect(() => {
        animate();
      })

    });
  }
})

