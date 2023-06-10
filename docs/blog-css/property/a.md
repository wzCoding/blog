---
prev:
  text: css 选择器
  link: /blog-css/selector/ 
---

<script setup>
    import { Propertys } from '@data/css/property.js'    
    const baseCssUrl = 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/'       
    const { A } = Propertys      
    //下面表格将使用自定义组件     
</script>  
  

# A
#### 以 A 为首的属性

<Minfo>
  
这里收集整理了 CSS 中常用的一些属性（样式），这些属性（样式）按照 A-Z 字母顺序进行展示。
  
</Minfo>

<template v-for="item in A">
<Mcard :item=item :linkUrl=baseCssUrl></Mcard>
</template>

       
       