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
    text: "Vue3 相关",
    icon: "/assets/icon/vue.png",
    link: "/blog-vue/"
  },
  {
    text: "综合知识",
    icon: "/assets/icon/complex.png",
    children: [
      {
        text: "开发知识",
        icon: "/assets/icon/code.png",
        link: "/blog-complex/development/01"
      },
      {
        text: "打包工具",
        icon: "/assets/icon/webpack.png",
        link: "/blog-complex/package/"
      },
    ]
  },
  {
    text: "Demo",
    icon: "/assets/icon/demo.png",
    link: "https://wzcoding.github.io/demo/"
  },
]);
