import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: '学习探索',
    icon: "study",
    children: [
      {
        text: "学习 HTML",
        icon: "html",
        link: "/blog-html/",
      },
      {
        text: "学习 CSS",
        icon: "css",
        link: "/blog-css/"
      },
      {
        text: "学习 JavaScript",
        icon: "javascript",
        link: "/blog-js/"
      }
    ],
  },
  {
    text: "问题收集",
    icon: "symbol",
    link: "/blog-question/"
  },
  {
    text: "关于我",
    icon: "profile",
    link: "/about/"
  }
]);
