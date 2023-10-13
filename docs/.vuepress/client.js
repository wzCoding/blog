import { defineClientConfig } from '@vuepress/client'
import { Timer } from './public/util/timer'
import { createCanvas } from './public/util/canvas'
import { onMounted } from 'vue'
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

      const width = window.innerWidth, height = window.innerHeight;
      const myCanvas = new createCanvas("vp-blog-mask", {
        backgroundColor: "#000000",
        width,
        height,
      });
      const ctx = myCanvas.getContext("2d");

      const fontSize = 16;
      const fontWeight = 700;
      const fontFamily = "微软雅黑";

      const letters = Array(Math.ceil(width / fontSize)).fill(0);
      const text = "wzCoding".split("");

      const codeRain = function () {
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = "#0f0";

        letters.forEach(function (item, index) {
          ctx.fillText(text[Math.floor(Math.random() * text.length)], index * fontSize, item + fontSize);
          letters[index] = item >= height || item > 8888 * Math.random() ? 0 : item + fontSize;
        })
      }

      const timer = new Timer();
      timer.interval(codeRain, 60)
    })
  }
})