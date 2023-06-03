---
next:
  text: B
  link: /blog-css/property/b.html
pageClass: css-property  
---

<script setup>
    import { Propertys } from '@data/css/property.js'     
    const baseCssUrl = 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/'       
    const { A } = Propertys      
    //下面表格将使用自定义组件     
</script>  
  
# A  

<template v-for="item in A">
<Mcard :item=item :linkUrl=baseCssUrl></Mcard>
</template>
       
       