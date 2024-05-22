import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "HTML",
    icon: "/assets/icon/html.png",
    link: "/blog-html/",
  },
  {
    text: "CSS",
    icon: "/assets/icon/css.png",
    link: "/blog-css/"
  },
  {
    text: "JavaScript",
    icon: "/assets/icon/javascript.png",
    link: "/blog-js/"
  },
  {
    text: "Vue",
    icon: "/assets/icon/vue.png",
    children: [
      {
        text: "了解 Vue3",
        icon: "/assets/icon/vue3.png",
        link: "/blog-vue/vue3/readme.md"
      },
      {
        text: "了解 Vue2",
        icon: "/assets/icon/vue2.png",
        link: "/blog-vue/vue2/readme.md"
      },
    ]
  },
  {
    text: "Webpack",
    icon: "/assets/icon/webpack.png",
    link: "/blog-webpack/"
  },
  {
    text: "综合知识",
    icon: "/assets/icon/complex.png",
    link: "/blog-complex/01"
  },
  {
    text: "Demo",
    icon: "/assets/icon/demo.png",
    link: "https://wzcoding.github.io/demo/"
  },
]);
