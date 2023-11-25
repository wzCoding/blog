<script>
import { computed } from 'vue'
export default {
    name: "Minfo",
    props: {
        type: String,
        title: String
    },
    setup(props) {
        const boxClass = computed(() => {
            const typeList = ['tip', 'warning', 'danger']
            return typeList.includes(props.type) ? props.type : 'tip'
        })
        const boxTitle = title => {
            const titleMap = {
                tip: '提示',
                warning: '注意',
                danger: '警告'
            }
            return props.title ? props.title : titleMap[title]
        }
        return {
            boxClass,
            boxTitle
        }
    }
}
</script>
<template>
    <div class="info-box custom-container" :class="boxClass">
        <div class="info-title">
            <span v-if="boxClass == 'tip'">ℹ️</span>
            <span v-if="boxClass == 'warning'">⚠️</span>
            <span v-if="boxClass == 'danger'">🚫</span>
            <span>{{ boxTitle(boxClass) }}</span>
        </div>
        <p class="info-content">
            <slot>
                内容区域
            </slot>
        </p>
    </div>
</template>
<style lang="scss" scoped>
.info-box {
    padding: 1.25rem;
    padding-bottom: 0.25rem;
    margin: 1rem 0;
    border: 1px solid #ddd;
    border-radius: .75rem;

    .info-title {
        margin: 0;
        padding-top: 0;
        padding-bottom: .75rem;

        span {
            padding-right: .25rem;
        }
    }

    .info-content {
        margin: 0;
    }
}

.info-box.tip {
    border-color: var(--theme-color);
    background-color: rgba(24, 144, 255, 0.1);
    box-shadow: 0px 0px 8px 0px rgba(24, 144, 255, 0.5);

    .info-content {
        border-top: 1px dashed var(--theme-color);
    }
}

.info-box.warning {
    border-color: #f1b300;
    background-color: rgba(241, 179, 0, 0.1);
    box-shadow: 0px 0px 8px 0px rgba(241, 179, 0, 0.3);
    color: #746000;

    .info-content {
        border-top: 1px dashed #f1b300;
    }
}

.info-box.danger {
    border-color: #f11e37;
    background-color: rgba(241, 30, 55, 0.1);
    box-shadow: 0px 0px 8px 0px rgba(241, 30, 55, 0.3);

    .info-content {
        border-top: 1px dashed #f11e37;
    }
}</style>