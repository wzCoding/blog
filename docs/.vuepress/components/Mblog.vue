<template>
    <div class="hero-box">
        <img class="hero-image" :src="`.${heroImage}`" alt="head">
        <div class="hero-title">{{ heroText }}</div>
        <div class="hero-description">{{ tagline }}</div>
        <div class="start-btn" @click="start">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024">
                <path
                    d="M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z">
                </path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024">
                <path
                    d="M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z">
                </path>
            </svg>
        </div>
    </div>
</template>
<script setup>
import { usePageFrontmatter } from '@vuepress/client';
const info = usePageFrontmatter();
const { heroImage, heroText, tagline } = info.value
const start = () => {
    const navBar = document.querySelector("#navbar");
    const autoHide = navBar.className.includes("auto-hide");
    document.documentElement.scrollTop = document.documentElement.clientHeight - (autoHide ? 0 : navBar.clientHeight);
}
</script>
<style lang="scss" scoped>
.hero-box {
    position: relative;
    width: 100%;
    height: calc(100vh - var(--navbar-height));
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    z-index: 1;

    &::after {
        content: " ";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        display: block;
        background: var(--light-grey);
        opacity: 0.05;
    }

    .hero-image {
        width: 9rem;
        border-radius: 50%;
        box-shadow: 0 0 20px 2px var(--theme-color);
    }

    .hero-title {
        padding: 1.5rem 0;
        font-size: 1.75rem;
        font-weight: 600;
        color: #fff;
        text-shadow:
            0 2px var(--theme-color),
            2px 0 var(--theme-color),
            0 -2px var(--theme-color),
            -2px 0 var(--theme-color),
            2px 2px var(--theme-color),
            2px -2px var(--theme-color),
            -2px -2px var(--theme-color),
            -2px 2px var(--theme-color);
    }

    .hero-description {
        font-weight: 700;
        font-size: 1.25rem;
        color: transparent;
        background-clip: text;
        background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
    }

    .start-btn {
        position: absolute;
        bottom: 10px;
        cursor: pointer;
        z-index: 2;
        svg {
            display: block;
            width: 2rem;
            height: 2rem;
            fill: rgba(24, 144, 255, 0.5);
            animation: start 1.5s linear infinite alternate;
            margin-top: -20px;

            &:last-child {
                fill: var(--theme-color);
            }
        }

        @keyframes start {
            from {
                transform: translate(0, -5px);
            }

            to {
                transform: translate(0, 5px);
            }
        }
    }
}</style>