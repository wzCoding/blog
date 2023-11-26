<template>
    <div class="hero-box" :class="heroClass">
        <div class="hero-head">
            <img :src="imgUrl" alt="head">
        </div>
        <div class="hero-text">{{ heroText }}</div>
        <div class="hero-tag">{{ tagText }}</div>
        <div class="start-btn" @click="start">
            <svg t="1700988240162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="5612" width="48" height="48">
                <path
                    d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z"
                    p-id="5613"></path>
            </svg>
        </div>
    </div>
</template>
<script setup>
import { usePageFrontmatter } from '@vuepress/client';
import { useThemeStore } from '../client';
import { computed } from 'vue';
import { getImageUrl } from '../public/util/utils';
const info = usePageFrontmatter();
const { heroImage, heroText, tagline, taglineDark } = info.value
const themeStore = useThemeStore();
const imgUrl = getImageUrl(heroImage);
const heroClass = computed(() => {
    return `${themeStore.theme}-mask`
});
const tagText = computed(() => {
    return themeStore.theme == "light" ? tagline : taglineDark
});
const start = () => {
    const navBar = document.querySelector("#navbar");
    const autoHide = navBar.className.includes("auto-hide");
    document.documentElement.scrollTop = document.documentElement.clientHeight - (autoHide ? 0 : navBar.clientHeight);
}
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
    flex-direction: column;
    position: relative;
    overflow: hidden;
    z-index: 1;

    &.light-mask {
        --text-color: var(--theme-color);
        --shadow-color: rgba(255, 255, 255, 0.7);
    }

    &.dark-mask {
        --text-color: rgba(255, 255, 255, 0.8);
        --shadow-color: rgba(24, 144, 255, 0.7);
    }

    .hero-head {
        position: relative;
        width: 10rem;
        height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        box-shadow: 0 0 20px var(--shadow-color) inset;

        img {
            width: 9rem;
            border-radius: 50%;
            position: relative;
            z-index: 3;
        }

        @keyframes lightRotate {
            0% {
                transform: rotate(360deg);
            }

            100% {
                transform: rotate(0deg);
            }
        }

        &::before,
        &::after {
            content: "";
            display: block;
            width: 50%;
            height: 50%;
            position: absolute;
            animation: lightRotate 6s linear infinite;
            z-index: 1;
        }

        &::before {
            top: 0;
            left: 0;
            clip-path: circle(100% at 100% 100%);
            transform-origin: bottom right;
            box-shadow: 50px 0 20px var(--shadow-color);
        }

        &::after {
            right: 0;
            bottom: 0;
            clip-path: circle(100% at 0 0);
            transform-origin: top left;
            box-shadow: -50px 50px 20px var(--shadow-color);
        }
    }

    .hero-text,
    .hero-tag {
        color: var(--text-color);
        text-shadow: 0 2px var(--shadow-color), 2px 0 var(--shadow-color), 0 -2px var(--shadow-color), -2px 0 var(--shadow-color),
            2px 2px var(--shadow-color), 2px -2px var(--shadow-color), -2px -2px var(--shadow-color), -2px 2px var(--shadow-color);
        transition: all 0.5s;
    }

    .hero-text {
        font-size: 2rem;
        font-weight: 700;
        padding: 1rem 0;
    }

    .hero-tag {
        font-size: 1.25rem;
        font-weight: 600;
    }

    .start-btn {
        margin-top: 3rem;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        svg{
            fill:var(--text-color);
            transition: all 0.3s ease;
        }
        &:hover {
            svg{
                transform: scale(1.5);
            }
        }
    }
}
</style>