<template>
    <div class="hero-mask">

    </div>
</template>
<script setup>
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
    background-color: var(--bg-color);
}
</style>