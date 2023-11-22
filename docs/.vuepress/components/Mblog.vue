<template>
    <div class="hero-mask">

    </div>
</template>
<script setup>
import { usePageFrontmatter } from '@vuepress/client';

const info = usePageFrontmatter();
console.log(info.value)
</script>
<style lang="scss">
.hero-mask {
    position: relative;
    width: 100%;
    height: calc(100vh - var(--navbar-height)) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--bg-color);
}
</style>