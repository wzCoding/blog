<template>
    <div class="hero-mask" ref="hero">
        <canvas id="light"></canvas>
        <canvas id="dark"></canvas>
    </div>
</template>
<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { myCanvas } from './canvas/canvas'
import { Sea } from './canvas/sea'
import { waves, clouds, sun } from './canvas/data'
const theme = ref("light");
const observer = new MutationObserver((list) => {
    theme.value = list[0].target.getAttribute("data-theme");
});
observer.observe(document.documentElement, { attributes: true });
const hero = ref();
onMounted(() => {
    const canvas = new myCanvas({
        parent: hero.value,
        id: `light`,
        styles: {
            background: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
            position: "absolute",
            inset: 0
        }
    });
    const lightCanvas = new Sea(canvas);
    lightCanvas.addWave(waves);
    lightCanvas.addSun(sun);
    lightCanvas.addCloud(clouds);
    //lightCanvas.start(60)
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