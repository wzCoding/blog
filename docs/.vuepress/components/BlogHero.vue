<template>
    <div class="hero-mask">
        <canvas id="light" ref="lightCanvas"></canvas>
        <canvas id="dark" ref="darkCanvas"></canvas>
    </div>
</template>
<script setup>
import { computed, ref, watch,onMounted } from 'vue'
const theme = ref("light");
const observer = new MutationObserver((list) => {
    theme.value = list[0].target.getAttribute("data-theme");
});
observer.observe(document.documentElement, { attributes: true });
const lightCanvas = ref();
const darkCanvas = ref();
onMounted(()=>{
    lightCanvas.value.width = window.innerWidth;
    lightCanvas.value.height = window.innerHeight;
    const ctx = lightCanvas.value.getContext('2d');
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