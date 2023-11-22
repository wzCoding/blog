<template>
    <div class="hero-box">
        <div class="hero-mask">
            <img class="hero-head" :src="heroImage" alt="head">
            <h2>{{ heroText }}</h2>
            <h3>{{ tagline }}</h3>
        </div>
    </div>
</template>
<script setup>
import { usePageFrontmatter } from '@vuepress/client';

const info = usePageFrontmatter();
const { heroImage, heroText, tagline, taglineDark } = info.value

console.log(heroImage)
console.log(heroText)
console.log(tagline)
console.log(taglineDark)
</script>
<style lang="scss">
.hero-box {
    position: relative;
    width: 100%;
    height: calc(100vh - var(--navbar-height)) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 1;

    .hero-mask {
        width: 80%;
        height: 80%;
        background-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .hero-head {
        width: 9rem;
        border-radius: 50%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
}
</style>