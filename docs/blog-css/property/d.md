# D

<script setup> 
    import { Propertys } from '@data/css/property.js'       
    const baseCssUrl = 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/'       
    const { D } = Propertys  
                  
    //下面表格将使用自定义组件               
</script>   

#### 以 D 为首的属性
<template v-for="item in D">
<Mcard :item=item :linkUrl=baseCssUrl></Mcard>
</template>