<template>
    <div class="hero-box">
        <div class="hero-mask" :class="heroClass">
            <img class="hero-head" :src="heroImage" alt="head">
            <div class="hero-text">{{ heroText }}</div>
            <div class="hero-tag">{{ tagline }}</div>
        </div>
    </div>
</template>
<script setup>
import { usePageFrontmatter } from '@vuepress/client';
import { useThemeStore } from '../client';
import { computed } from 'vue';
const info = usePageFrontmatter();
const { heroImage, heroText, tagline, taglineDark } = info.value
const themeStore = useThemeStore();
const heroClass = computed(() => {
    return `${themeStore.theme}-mask`
});
</script>
<style lang="scss" scoped>
.vp-navbar {
    display: none;
}

.hero-box {
    position: relative;
    width: 100%;
    height: calc(100vh - var(--navbar-height)) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 1;

    .light-mask {
        --text-color: #1890ff;
        --shadow-color: rgba(255, 255, 255, 0.7);
    }

    .hero-mask {
        width: 80%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        overflow: hidden;
    }

    .hero-head {
        width: 9rem;
        border-radius: 50%;
        box-shadow: 0 0 12px var(--shadow-color);
    }

    .hero-text,
    .hero-tag {
        color: var(--text-color);
    }

    .hero-text {
        font-size: 2rem;
        font-weight: 700;
        padding: 1rem 0;
        text-shadow: 0 2px var(--shadow-color), 2px 0 var(--shadow-color), 0 -2px var(--shadow-color), -2px 0 var(--shadow-color),
            2px 2px var(--shadow-color), 2px -2px var(--shadow-color), -2px -2px var(--shadow-color), -2px 2px var(--shadow-color);
    }

    .hero-tag {
        font-size: 1.25rem;
        font-weight: 600;
        -webkit-text-stroke: var(--shadow-color) 1px;
    }
}
</style>