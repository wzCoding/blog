import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  author: {
    name: "wzCoding",
    url: "https://github.com/wzCoding/blog",
  },
  blog: {
    description: "前端开发者，持续学习中...",
    timeline: "昨日重现",
    medias: {
      "Email": "mailto:1429354968@qq.com",
      "GitHub": "https://github.com/wzCoding",
      "QQ": "http://wpa.qq.com/msgrd?v=3&uin=1429354968&site=qq&menu=yes"
    }
  },
  blogLocales: {
    article: "文章",
    articleList: "文章列表",
    category: "分类",
    tag: "标签",
    timeline: "记录",
    all: "全部",
    star: "收藏"
  },
  paginationLocales: {
    prev: "上一页",
    next: "下一页",
    navigate: "跳转至",
    action: "前往",
    errorText: "没有这一页哦"
  },
  metaLocales: {
    author: "作者",
    date: "日期",
    category: "分类",
    tag: "标签",
    words: "字数",
    readingTime: "阅读时间",
    toc: "此页内容",
    prev: "上一篇",
    next: "下一篇",
    editLink: "在 GitHub 上编辑此页",
    contributors: "更新人",
    lastUpdated: "最后更新时间",
    
  },
  iconAssets: "iconfont",

  logo: "/lore.svg",

  repo: "https://github.com/wzCoding/blog",

  docsDir: "docs",

  darkmode: 'toggle',

  navbar,

  sidebar,

  footer: "",

  displayFooter: false,

  breadcrumb: false,

  plugins: {
    // You should generate and use your own comment service
    comment: {
      comment: false
      // provider: "Giscus",
      // repo: "vuepress-theme-hope/giscus-discussions",
      // repoId: "R_kgDOG_Pt2A",
      // category: "Announcements",
      // categoryId: "DIC_kwDOG_Pt2M4COD69",
    },
    activeHeaderLinks: false,
    // All features are enabled for demo, only preserve features you need here
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
      excerptLength: 0,
    },

  },
});
