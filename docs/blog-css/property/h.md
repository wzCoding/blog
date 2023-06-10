# H

<script setup> 
    import { Propertys } from '@data/css/property.js'       
    const baseCssUrl = 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/'       
    const { H } = Propertys  
                  
    //下面表格将使用自定义组件               
</script>   

#### 以 H 为首的属性
<template v-for="item in H">
<Mcard :item=item :linkUrl=baseCssUrl></Mcard>
</template>