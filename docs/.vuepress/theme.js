import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://wzcoding.github.io/blog/",
  author: {
    name: "wzCoding",
    url: "https://github.com/wzCoding/blog",
  },
  iconAssets: "iconfont",
  logo: "/head.png",
  repo: "https://github.com/wzCoding/blog",
  docsDir: "docs",
  darkmode:"toggle",
  breadcrumb: false,
  displayFooter:true,
  locales: {
    "/": {
      navbar,
      sidebar,
      footer: "",
      copyright:"MIT LICENSE | copyright © 2023-present wzCoding",
      blog: {
        description: "前端开发者，持续学习中...",
        timeline: "昨日重现",
        medias: {
          "Email": "mailto:1429354968@qq.com",
          "GitHub": "https://github.com/wzCoding",
          "QQ": "http://wpa.qq.com/msgrd?v=3&uin=1429354968&site=qq&menu=yes"
        },
        roundAvatar: true
      },
    }
  },
  plugins: {
    activeHeaderLinks: false,
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
    blog: {
      excerptLength: 75,
    },
  },
});
