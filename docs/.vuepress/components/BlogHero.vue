<template>
    <div class="hero-mask" ref="hero">
        <canvas id="light" v-show="show"></canvas>
        <canvas id="dark" v-show="!show"></canvas>
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
const show = ref(true);
const hero = ref();
const themes = {};

function stopCanvas() {
    console.log("stop")
    for (const key in themes) {
        themes[key].stop();
    }
}
function startCanvas(theme) {
    console.log("start")
    themes[theme].start(60);
}
function initCanvas(theme) {
    if (!themes[theme]) {
        const canvas = new myCanvas({
            parent: hero.value,
            id: theme,
            styles: {
                background: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
                position: "absolute",
                inset: 0
            }
        })
        if (theme == defaultTheme) {
            const sea = new Sea(canvas);
            sea.addWave(waves);
            sea.addSun(sun);
            sea.addCloud(clouds);
            themes[theme] = sea;
        } else {
            themes[theme] = new Rain(canvas, "wzCoding");
        }
    }
    stopCanvas();
    startCanvas(theme);
}

const info = usePageFrontmatter()
onMounted(() => {
    const observer = new MutationObserver((list) => {
        const currentTheme = list[0].target.getAttribute("data-theme");
        show.value = currentTheme == defaultTheme;
        console.log(111)
        //initCanvas(currentTheme);
    });
    observer.observe(document.documentElement, { attributes: true });
})
onUnmounted(()=>{
    stopCanvas()
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