<template>
    <div class="hero-mask" ref="hero">
        <canvas id="light" v-show="show"></canvas>
        <canvas id="dark" v-show="!show"></canvas>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'
import { myCanvas } from './canvas/canvas'
import { Rain } from './canvas/rain'
import { Sea } from './canvas/sea'
import { waves, clouds, sun } from './canvas/data'
const defaultTheme = "light";
const theme = ref(defaultTheme);
const show = computed(() => {
    return theme.value.value == defaultTheme
});

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

const info = usePageFrontmatter()
onMounted(() => {
    const canvas = computed(() => {
        return new myCanvas({
            parent: hero.value,
            id: theme.value,
            styles: {
                background: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
                position: "absolute",
                inset: 0
            }
        })
    });
    console.log(canvas.value)
    const rain = new Rain(canvas.value, "wzCoding");
    const sea = new Sea(canvas.value);
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