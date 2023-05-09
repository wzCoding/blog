# C

<script setup> 
    import { Propertys } from '@data/css/property.js'       
    const baseCssUrl = 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/'       
    const { C } = Propertys  
                  
    //下面表格将使用自定义组件               
</script>   

<template v-for="item in C">
<Mcard :item=item :linkUrl=baseCssUrl></Mcard>
</template>