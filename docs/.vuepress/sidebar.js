import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  '/blog-html/': [
    {
      text: 'HTML 相关',
      children: "structure",
    },
  ],
  '/blog-css/': [
    {
      text: 'CSS 相关',
      children: [
        'README.md',
        {
          text: '选择器',
          collapsible: true,
          prefix: '/blog-css/selector/',
          children: ['01', '02', '03', '04', '05'],
        },
        {
          text: '属性(样式)',
          collapsible: true,
          prefix: '/blog-css/property/',
          children: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'z']
        },
        '01',
        '02',
        {
          text: '常见布局',
          collapsible: true,
          prefix: '/blog-css/layout/',
          children: ['01', '02', '03'],
        },
        '03',
        '04'
      ]
    },
  ],
  '/blog-js/': [
    {
      text: 'JavaScript 相关',
      children: [
        "README.md", "01", "02", "03","14", "04", "05", "06", "07", "08","13","09","10","15","16","17","11","12",
      ]
    },
  ],
  '/blog-question/': [
    {
      text: '常见问题',
      children: "structure",
    },
  ],
  '/about/': [
    {
      text: '关于我',
      children: "structure",
    },
  ],
  '/article/':false,
  '/category/':false,
  '/categoryItem/':false,
  '/tag/':false,
  '/tagItem/':false,
  '/star/':false,
  '/timeline/':false
});
