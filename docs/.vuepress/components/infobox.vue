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
            return `/images/icons/${type}.png`
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
            <svg v-if="boxClass == 'tip'" class="info-icon icon-tip" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"></path></svg>
            <svg v-if="boxClass == 'warning'" class="info-icon icon-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" xml:space="preserve" data-v-ea893728=""><path d="M928.99 755.83 574.6 203.25c-12.89-20.16-36.76-32.58-62.6-32.58s-49.71 12.43-62.6 32.58L95.01 755.83c-12.91 20.12-12.9 44.91.01 65.03 12.92 20.12 36.78 32.51 62.59 32.49h708.78c25.82.01 49.68-12.37 62.59-32.49 12.91-20.12 12.92-44.91.01-65.03zM554.67 768h-85.33v-85.33h85.33V768zm0-426.67v298.66h-85.33V341.32l85.33.01z" fill="currentColor"></path></svg>
            <svg v-if="boxClass == 'danger'" class="info-icon icon-danger" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"></path></svg>
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

        svg.info-icon{
            width: 1.5rem;
        }

        span {
            padding-left: .5rem;
        }
    }
}

.info-box.tip {
    --t-color:#409eff;
    border-color: var(--t-color);
    background-color: rgba(64, 158, 255, 0.1);
    box-shadow: 0px 0px 8px 0px rgba(64, 158, 255, 0.3);
    .icon-tip{
       color: var(--t-color);
    }
    .info-content {
        border-top: 1px dashed #409eff;
    }
}

.info-box.warning {
    --w-color:#f1b300;
    border-color: var(--w-color);
    background-color: rgba(241, 179, 0, 0.1);
    box-shadow: 0px 0px 8px 0px rgba(241, 179, 0, 0.3);
    color: #746000; 
    .icon-warning{
        color:var(--w-color)
    }
    .info-content {
        border-top: 1px dashed #f1b300;
    }
}

.info-box.danger {
    --d-color:#f11e37;
    border-color:var(--d-color);
    background-color: rgba(241, 30, 55, 0.1);
    box-shadow: 0px 0px 8px 0px rgba(241, 30, 55, 0.3);
    .info-danger{
        color: var(--d-color);
    }
    .info-content {
        border-top: 1px dashed #f11e37;
    }
}
</style>