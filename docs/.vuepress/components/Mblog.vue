<template>
    <div class="hero-box" :class="heroClass">
        <div class="hero-head">
            <img :src="heroImage" alt="head">
        </div>
        <div class="hero-text">{{ heroText }}</div>
        <div class="hero-tag">{{ tagText }}</div>
        <div class="start-btn" @click="start">
            <span>start !</span>
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
const tagText = computed(() => {
    return themeStore.theme == "light" ? tagline : taglineDark
});
const start = () => {
     const navHeight = document.querySelector("#navbar").clientHeight;
     document.documentElement.scrollTop = document.documentElement.clientHeight - navHeight;
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
        --text-color: #1890ff;
        --shadow-color: rgba(255, 255, 255, 0.7);
    }

    &.dark-mask {
        --text-color: #000;
        --shadow-color: rgba(0, 255, 0, 0.5);
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
        padding: 8px 40px;
        border: 3px solid var(--shadow-color);
        border-radius: 20px;
        color: var(--shadow-color);
        font-weight: 600;
        box-shadow: 0 0 10px var(--shadow-color);

        span {
            position: inherit;
            z-index: 2;
        }

        &::after {
            content: "";
            background-color: var(--shadow-color);
            position: absolute;
            inset: 0;
            transform: translate(0, -100%);
            transition: all 0.3s ease;
        }

        &:hover {
            color: var(--text-color);

            &::after {
                transform: translate(0, 0);
            }
        }
    }
}</style>