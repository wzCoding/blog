<script>
import { computed, ref, toRefs } from 'vue'
export default {
    name: 'Mside',
    props: {
        sideTitle: String,
        sideList: {
            type: Array,
            default() {
                return []
            }
        },
        sideActive: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const closeSide = () => {
            emit('changeSideState')
        }
        return {
            closeSide,
        }
    }
}
</script>
<template>
    <div class="m-side" :class="{ active: sideActive }">
        <div class="side-header">
            <div class="side-title">
                <span>目录</span>
                <span>{{ `(${sideTitle})` }}</span>
            </div>
            <div class="side-exit" @click="closeSide">
                <img src="../public/images/exit.png" alt="exit">
            </div>
        </div>
        <ul class="side-content">
            <li v-for="item in sideList" :key="item.code" class="list-item">
                <a :href="`#${item.code}`">{{ item.code }}</a>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.m-side {
    position: fixed;
    bottom: 0;
    left: 0;
    height: calc(100vh - 3.6rem);
    width: var(--sidebar-width);
    background-color: #fff;
    z-index: 20;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 0 1.5rem;
    transform: translateX(-100%);
    transition: all .3s linear;

    .side-header {
        padding: 1.2rem 0 .75rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .side-title {
            span:nth-child(2) {
                padding-left: .5rem;
                font-size: 1.2rem;
                font-weight: 600;
            }
        }

        .side-exit {
            cursor: pointer;

            img {
                width: 1.5rem;
                height: 1.5rem;
            }
        }
    }

    .side-content {
        list-style-type: none;
        margin: 0;
        padding: 0;
        padding-bottom: .75rem;
        height: calc(100% - 3.3rem);
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        li.list-item {
            display: block;
            margin-bottom: .75rem;
        }
    }

    a {
        font-size: 1rem;
        font-family: var(--font-family-code);
        text-decoration: none;
        width: 100%;
        display: inline-block;
        border-bottom: 1px dashed #ddd;
        color: var(--c-text-lighter);
        padding-bottom: .2rem;
    }
}

.m-side.active {
    transform: translateX(0);
}

.dark .m-side {
    background-color: #222c38;
    box-shadow: 0px 0px 8px 0px rgba(64, 158, 255, 0.3);
}
</style>