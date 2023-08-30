import { hopeTheme } from "vuepress-theme-hope";
import { blogConfig } from "./blog.js";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  author: {
    name: "wzCoding",
    url: "https://github.com/wzCoding/blog",
  },
  iconAssets: "iconfont",
  logo: "/head.png",
  repo: "https://github.com/wzCoding/blog",
  docsDir: "docs",
  darkmode: 'toggle',
  displayFooter: false,
  breadcrumb: false,
  locales: {
    "/": {
      navbar,
      sidebar,
      footer: "",
      blog: blogConfig.blog,
      blogLocales: blogConfig.blogLocales,
      paginationLocales: blogConfig.paginationLocales,
      metaLocales: blogConfig.metaLocales,
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
