import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: '探索发现',
    icon: "study",
    children: [
      {
        text: "了解 HTML",
        icon: "html",
        link: "/blog-html/",
      },
      {
        text: "了解 CSS",
        icon: "css",
        link: "/blog-css/"
      },
      {
        text: "了解 JavaScript",
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
