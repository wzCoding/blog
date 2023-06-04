<script>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { debounce } from '@public/utils'
import { useSideStore } from '@public/store/sideStore'
import Mside from './Mside.vue'
export default {
    name: 'Mtool',
    setup() {
        const toolActive = ref(false)
        const pageProgress = ref(0)
        const sideStore = useSideStore()
        const { hasSide,sideActive, sideId} = storeToRefs(sideStore)
       
        const backTop = () => {
            document.documentElement.scrollTop = 0
            toolActive.value = false
        }
        const showSide = () => {
            sideActive.value = !sideActive.value
            toolActive.value = false
        }
        const handleToolClick = (e) => {
            if (e.target.className && e.target.className.length) {
                toolActive.value = e.target.className.includes('pg-progress') ? !toolActive.value : false
            }
        }
        window.onscroll = debounce(function () {
            const st = document.documentElement.scrollTop
            const sh = document.documentElement.scrollHeight
            const ph = document.documentElement.clientHeight
            pageProgress.value = (((ph + st) / sh) * 100).toFixed(0)
        }, 500)
        document.addEventListener('click', handleToolClick)
        return {
            backTop,
            showSide,
            handleToolClick,
            toolActive,
            sideActive,
            pageProgress,
            hasSide,
            sideId
        }
    },
    components: {
        Mside
    }
}
</script>
<template>
    <div class="m-tool" :class="{ active: toolActive }">
        <div class="tool-info">
            <span class="pg-progress">{{ `${pageProgress}%` }}</span>
            <div class="bg-progress" :style="{ transform: `translateY(${100 - pageProgress}%)` }"></div>
        </div>
        <div class="tool-box back-top back-top-translate" @click="backTop">
            <img src="../public/images/top.png" alt="menu">
        </div>
        <div v-if="hasSide" class="tool-box side-menu" @click="showSide">
            <img src="../public/images/menu.png" alt="menu">
        </div>
    </div>
    <Mside :sideActive="sideActive" :sideTitle="sideId" @changeSideState="showSide"></Mside>
</template>
<style lang="scss" scoped>
.m-tool {
    --tool-height: 3rem;
    position: fixed;
    right: 10px;
    bottom: 10px;
    width: var(--tool-height);
    height: var(--tool-height);
    border-radius: 50%;
    border: 3px solid #1890ff;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    text-align: center;
    line-height: var(--tool-height);
    z-index:10;
    transition: all .3s linear;
    outline: none;

    img {
        width: 1.5rem;
        height: 1.5rem;
    }

    .tool-box {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        transition: all .3s linear;
        z-index: 45;
        transform: translate(0) scale(0);
        border: 3px solid #66b1ff;
        background-color: #fff;

        &:hover {
            background-color: #d9ecff;
        }
    }

    .tool-info {
        width: calc(var(--tool-height) - .2rem);
        height: calc(var(--tool-height) - .2rem);
        border-radius: 50%;
        border: 2px solid #fff;
        text-align: center;
        position: relative;
        color: #000;
        overflow: hidden;
        z-index: 2;

        span {
            z-index: 3;
            position: relative;
            font-family: var(--font-family-code);
            display: block;
            text-align: center;
            line-height: var(--tool-height);
        }
    }

    .bg-progress {
        width: calc(var(--tool-height) - .2rem);
        height: calc(var(--tool-height) - .2rem);
        background-color: rgb(64 158 255 / 60%);
        z-index: 2;
        transform: translateY(100%);
        transition: all 0.5s linear;
        position: absolute;
        top: 0;
        left: 0;
    }

    .back-top {
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            width: calc(var(--tool-height) / 2);
            height: calc(var(--tool-height) / 2);
        }
    }

    .side-menu {
        @extend .back-top;
    }

    &:hover {
        .tool-info {
            z-index: 0;
        }

        .back-top-hover {
            border: none;
            transform: scale(1);
        }
    }

    &.active {
        .back-top-translate {
            transform: translateX(calc(-100% - 10px)) scale(1);
        }

        .side-menu {
            transform: translateY(calc(-100% - 10px)) scale(1);
        }
    }
}
</style>