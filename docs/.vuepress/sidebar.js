import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // "/": [
  //   //"",
  //   // {
  //   //   text: "案例",
  //   //   icon: "laptop-code",
  //   //   prefix: "demo/",
  //   //   link: "demo/",
  //   //   children: "structure",
  //   // },
  //   // {
  //   //   text: "文档",
  //   //   icon: "book",
  //   //   prefix: "guide/",
  //   //   children: "structure",
  //   // },
  //   // "slides",
  //   {
  //     text: 'HTML 相关',
  //     icon: "html",
  //     prefix: "blog-html/",
  //     children: "structure",
  //   },
  //   {
  //     text: 'CSS 相关',
  //     icon: "css",
  //     prefix: "blog-css/",
  //     children: "structure",
  //   },
  //   {
  //     text: 'Javascript 相关',
  //     icon: "javascript",
  //     prefix: "blog-js/",
  //     children: "structure",
  //   }
  // ],
  '/blog-html/': [
    {
      text: 'HTML 相关',
      children: "structure",
    },
  ],
  '/blog-css/': [
    {
      text: 'CSS 相关',
      children: "structure",
    },
  ],
  '/blog-js/': [
    {
      text: 'JavaScript 相关',
      collapsible: true,
      children: "structure",
    },
  ],
  '/blog-demo/': [
    {
      text: 'Demo 展示',
      collapsible: true,
      children: "structure",
    },
  ],
});
