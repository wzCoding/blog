<template>
    <div class="hero-mask" ref="hero">
        <canvas :id="canvasId"></canvas>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import { myCanvas } from './canvas/canvas'
import { Rain } from './canvas/rain'
import { Sea } from './canvas/sea'
import { waves, clouds, sun } from './canvas/data'
const defaultTheme = "light";
const theme = ref(defaultTheme);
const hero = ref();
const themes = {};
function stopCanvas() {
    for (const key in themes) {
        themes[key].stop();
    }
}
function startCanvas() {
    themes[theme.value].start(60);
}
const canvasId = "theme-canvas";
const info = usePageFrontmatter()
onMounted(() => {
    const canvas = new myCanvas({
        parent: hero.value,
        id: canvasId,
        styles: {
            background: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
            position: "absolute",
            inset: 0
        }
    })
    const rain = new Rain(canvas, "wzCoding");
    const sea = new Sea(canvas);
    sea.addWave(waves);
    sea.addSun(sun);
    sea.addCloud(clouds);

    const observer = new MutationObserver((list) => {
        theme.value = list[0].target.getAttribute("data-theme");
        if (!themes[theme.value]) {
            themes[theme.value] = theme.value == defaultTheme ? sea : rain;
        }
        stopCanvas();
        startCanvas();
    });
    observer.observe(document.documentElement, { attributes: true });
})
onUnmounted(() => {
    stopCanvas();
})
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
}
</style>