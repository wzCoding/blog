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
        "README.md", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17",
        {
          text: '异步与请求',
          collapsible: true,
          prefix: '/blog-js/async/',
          children: ['01', '02', '03', '04'],
        },
        "18",
      ]
    },
  ],
  '/blog-vue/': [
    {
      text: 'Vue3 相关',
      children: [
        'README.md', '01', '02', '03', '04', '05', '06', '07', '08', '09'
      ]
    }
  ],
  '/blog-complex/': [
    {
      text: '综合知识',
      children: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13','14','15'],
    },
  ],
  '/article/': false,
  '/category/': false,
  '/categoryItem/': false,
  '/tag/': false,
  '/tagItem/': false,
  '/star/': false,
  '/timeline/': false
});
