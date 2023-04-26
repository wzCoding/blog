<script>
import { computed } from 'vue'
export default {
    name: "InfoBox",
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
        const setIcon = type => {
            return `/images/icons/${type}.svg`
        }
        return {
            boxClass,
            boxTitle,
            setIcon
        }
    }
}
</script>
<template>
    <div class="info-box custom-container" :class="boxClass">
        <p class="info-title">
            <img :src="setIcon(boxClass)" class="info-icon">
            <span>{{ boxTitle(boxClass) }}</span>
        </p>
        <p class="info-content">
            <slot>
                内容区域
            </slot>
        </p>
    </div>
</template>
<style lang="scss" scoped>
.info-box {
    padding: 0.1rem 1.5rem;
    margin: 1rem 0;
    border: 1px solid #ddd;
    border-radius: .75rem;

    .info-title {
        display: flex;

        img {
            width: 1.5rem;
        }

        span {
            padding-left: .5rem;
        }
    }
}

.info-box.tip {
    border-color: #409eff;
    background-color: rgba(64, 158, 255, 0.1);
    box-shadow: 0px 0px 8px 0px rgba(64, 158, 255, 0.3);

    .info-content {
        border-top: 1px dashed #409eff;
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
}
</style>