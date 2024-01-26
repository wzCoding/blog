<template>
    <div class="m-grid">
        <form class="prop-form">
            <div v-for="item in containerProps" :key="item.key">
                <label for="prop-select">{{ item.key }}：</label>
                <select class="prop-select" v-model="item.selected">
                    <option v-for="val in item.value" :value="val">{{ val }}</option>
                </select>
            </div>
        </form>
        <div class="container" :style=styles>
            <div v-for="(i, index) in    items   " :key="`${i}-${index}`" class="item" :class="`${i}-${index + 1}`"
                :style="prop === areaProps ? { 'grid-area': `${i}` } : {}">{{ i }}</div>
        </div>
    </div>
</template>
<script>
import { ref, computed, reactive } from 'vue'
const areaProps = "grid-template-areas"
const exampleProps = {
    "grid": {
        "grid-template-columns": [
            "120px 120px 120px",
            "30% 60% 10%",
            "1fr 1fr 1fr",
            "120px 1fr 1fr",
            "auto 1fr 1fr",
            "[c1] 150px [c2] 1fr [c3] 1fr",
            "minmax(400px, 1fr) 1fr 1fr",
            "repeat(3, 1fr 30% 120px)",
            "repeat(auto-fill,minmax(150px, 1fr))",
            "repeat(auto-fit, minmax(100px, 1fr))",
            "repeat(3, [c1] 200px [c2] 100px 50px [c4])",
        ],
        "grid-template-rows": [
            "120px 120px",
            "40% 60% ",
            "1fr 1fr 1fr",
            "120px 1fr",
            "auto 1fr",
            "[r1] 150px [r2] 1fr [r3]",
            "minmax(200px, 1fr) 1fr",
            "repeat(2, 50%)",
            "repeat(auto-fill,minmax(150px, 1fr))",
            "repeat(auto-fit, minmax(100px, 1fr))",
            "repeat(1, [r1] 200px [r2] 100px [r3])",
        ],
        "grid-template-areas": [
            "'header header header' 'aside main main' 'aside footer footer'",
            "'a a b' 'c c b' 'c c b'",
            "'a b .' 'a b .' '. c c'",
        ]
    },
    "flex": {

    }
}
export default {
    name: 'Mgrid',
    props: {
        type: {
            type: String,
            default: 'grid'
        },
        prop: {
            type: [String, Number],
            default: ''
        },
        item: {
            type: Number,
            default: 6
        }
    },
    setup(props) {
        const getExample = (prop) => {
            const examples = []
            if (!prop) return examples
            if (typeof prop === 'object') { //判断数组
                for (const key of prop) {
                    examples.push(
                        ...getExample(key)
                    )
                }
            } else {
                examples.push(
                    {
                        key: prop,
                        value: exampleProps[props.type][prop],
                        selected: exampleProps[props.type][prop][0]
                    }
                )
            }

            return examples
        }
        const containerProps = reactive(getExample(props.prop))
        const styles = computed(() => {
            const style = { "display": props.type }
            for (const prop of containerProps) {
                style[prop.key] = prop.selected
            }
            if (props.prop === areaProps) style['grid-template-columns'] = "none"
            return style
        })
        const getAreas = (prop) => {
            if (prop === areaProps) {
                const area = computed(() => {
                    return styles.value[prop].split(" ").map(item => item.replace("'", "")).filter((el, i, arr) => {
                        return arr.indexOf(el) === i && el !== "."
                    })
                })
                console.log(area.value)
                return area
            }
            return props.item
        }
        const items = ref(getAreas(props.prop))
        return { areaProps, containerProps, styles, items }
    }
}
</script>
<style lang="scss" scoped>
.m-grid {
    .prop-form {
        padding-bottom: 0.75rem;
    }

    .prop-select {
        width: fit-content;
        height: 30px;
        border: 1px solid #ccc;
    }

    .container {
        display: grid;
        grid-template-columns: 120px 120px 120px;
        grid-template-rows: 120px 120px;
        border: 1px solid #999;

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;

            &:nth-child(1) {
                background-color: lightblue;
            }

            &:nth-child(2) {
                background-color: yellowgreen;
            }

            &:nth-child(3) {
                background-color: palevioletred;
            }

            &:nth-child(4) {
                background-color: antiquewhite;
            }

            &:nth-child(5) {
                background-color: goldenrod;
            }

            &:nth-child(6) {
                background-color: cadetblue;
            }

            &[class*='a-'],
            &[class*='header-'] {
                background-color: yellowgreen;
            }

            &[class*='b-'],
            &[class*='aside-'] {
                background-color: lightblue;
            }

            &[class*='c-'],
            &[class*='main-'] {
                background-color: palevioletred;
            }

            &[class*='d-'],
            &[class*='footer-'] {
                background-color: antiquewhite;
            }
        }

    }

}
</style>