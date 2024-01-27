<template>
    <div class="m-grid">
        <form class="prop-form">
            <div v-for="item in exampleProps" :key="item.key" class="props">
                <label for="prop-select">{{ item.key }}：</label>
                <select class="prop-select" v-model="item.selected">
                    <option v-for="val in item.value" :value="val">{{ val }}</option>
                </select>
            </div>
        </form>
        <div class="container" :class="`${type}-container`" :style="styles.container">
            <div v-for="item in styles.item" :key="item.class" :class="item.class" :style="item.style">{{ item.name }}</div>
        </div>
    </div>
</template>
<script>
import { ref, computed, reactive } from 'vue'

const exampleData = {
    "grid": {
        "grid-template-columns": {
            static: {
                "grid-template-rows": "120px 120px"
            },
            active: [
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
            ]
        },
        "grid-template-rows": {
            static: {
                "grid-template-columns": "120px 120px 120px"
            },
            active: [
                "120px 120px",
                "40% 60% ",
                "1fr 1fr",
                "120px 1fr",
                "auto 1fr",
                "[r1] 150px [r2] 1fr [r3]",
                "minmax(200px, 1fr) 1fr",
                "repeat(2, 50%)",
                "repeat(auto-fill,minmax(150px, 1fr))",
                "repeat(auto-fit, minmax(100px, 1fr))",
                "repeat(1, [r1] 200px [r2] 100px [r3])",
            ]
        },
        "grid-template-areas": {
            static: {
                "grid-template-columns": "1fr 4fr 1fr ",
                "grid-template-rows": "1fr 4fr 1fr"
            },
            active: [
                "'header header header' 'aside main main' 'aside footer footer'",
                "'a b b' 'a b b' 'a c c'",
                "'a b .' 'a b .' '. c c'",
            ]
        },
        "grid-auto-columns": {
            static: {
                "grid-template-rows": "60px"
            },
            active: [
                "auto",
                "150px",
                "minmax(80px, 1fr)",
                "min-content",
            ]
        },
        "grid-auto-rows": {
            static: {
                "grid-template-columns": "120px 120px 120px",
            },
            active: [
                "auto",
                "150px",
                "minmax(80px, 1fr)",
                "min-content",
            ]
        },
        "grid-auto-flow": {
            static: {
                "grid-template-columns": "repeat(4,1fr)",
                "grid-template-rows": "repeat(2,100px)"
            },
            active: [
                "row",
                "column",
                "row dense",
                "column dense",
            ]
        },
        "grid-row-start": {
            item: true,
            static: {
                "grid-template-columns": "repeat(3,100px)",
                "grid-template-rows": "[r1] 100px [r2] 100px [r3] 100px [r4] 100px"
            },
            active: [
                "auto",
                "1",
                "3",
                "span 2",
                "span r3",
                "-1"
            ]
        },
        "grid-row-end": {
            item: true,
            active: [
                "auto",
                "1",
                "3",
                "span 2",
                "span r3",
                "-1"
            ]

        },
        "grid-column-start": {
            item: true,
            static: {
                "grid-template-columns": "[c1] 100px [c2] 100px [c3] 100px [c4] 100px",
                "grid-template-rows": "repeat(3,100px)"
            },
            active: [
                "auto",
                "1",
                "3",
                "span 2",
                "span c3",
                "-1"
            ]
        },
        "grid-column-end": {
            item: true,
            active: [
                "auto",
                "1",
                "3",
                "span 2",
                "span c3",
                "-1"
            ]
        },
        "gap": {
            static: {
                "grid-template-columns": "repeat(3,100px)",
                "grid-template-rows": "repeat(3,100px)"
            },
            active: [
                "0", // 默认值，即没有间距
                "5px",
                "10px",
                "20px"
            ]
        },
        "justify-self": {
            static: {
                "grid-template-columns": "repeat(3,100px)",
                "grid-template-rows": "repeat(3,100px)"
            },
            item: true,
            active: [
                "auto",
                "start",
                "end",
                "center",
                "stretch"
            ]
        },
        "align-self": {
            item: true,
            active: [
                "auto",
                "start",
                "end",
                "center",
                "stretch"
            ]
        },
        "align-content": {
            active: [
                'normal',
                'flex-start',
                'flex-end',
                'center',
                'space-between',
                'space-around',
                'space-evenly',
                'baseline',
                'stretch'
            ]
        },
    },
    "flex": {
        "flex-direction": {
            active: [
                'row',
                'column',
                'row-reverse',
                'column-reverse'
            ]
        },
        "flex-wrap": {
            active: [
                'nowrap',
                'wrap',
                'wrap-reverse'
            ]
        },
        "flex-flow": {
            active: [
                'row nowrap',
                'row wrap',
                'row wrap-reverse',
                'column nowrap',
                'column wrap',
                'column wrap-reverse',
                'row-reverse nowrap',
                'row-reverse wrap',
                'row-reverse wrap-reverse',
                'column-reverse nowrap',
                'column-reverse wrap',
                'column-reverse wrap-reverse'
            ]
        },
        "justify-content": {
            active: [
                'flex-start',
                'flex-end',
                'center',
                'space-between',
                'space-around',
                'space-evenly'
            ]
        },
        "align-items": {
            static: {
                "flex-direction": "column"
            },
            active: [
                'normal',
                'flex-start',
                'flex-end',
                'center',
                'baseline',
                'stretch'
            ]
        },

        "flex-grow": {
            item: true,
            active: [
                "0",
                "0.5",
                "1",
                "-1"
            ]
        },
        "flex-shrink": {
            static:{"overflow":"hidden"},
            item: true,
            active: [
                "0",
                "0.5",
                "1",
                "1.5",
                "2",
                "-1"
            ]
        },
        "flex-basis": {
            item: true,
            active: [
                "auto",
                "0",
                "100%",
                "200px",
                "fill",
                "fit-content",
                "max-content"
            ]
        },
        "flex": {
            item: true,
            active: [
                "0 0 auto",
                "1 1 auto",
                "1 0 auto",
                "1 0 50px",
                "1 0 100%",
                "1 1 50px",
                "1 1 100%",
                "initial",
                "inherit"
            ]
        },
        "align-self": {
            static: {
                "flex-direction": "column"
            },
            item: true,
            active: [
                'auto',
                'flex-start',
                'flex-end',
                'center',
                'self-start',
                'self-end',
                'baseline',
                'stretch'
            ]
        },
        "order": {
            item:true,
            active: [0, 1, 2, 3, 4, 5]
        }
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
            type: [String, Array],
            default: ''
        },
        item: {
            type: [String, Number],
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
                        value: exampleData[props.type][prop]['active'],
                        selected: exampleData[props.type][prop]['active'][0],
                        static: exampleData[props.type][prop]['static'],
                        item: exampleData[props.type][prop]['item']
                    }
                )
            }

            return examples
        }
        const exampleProps = reactive(getExample(props.prop))
        const styles = computed(() => {
            const style = {
                "container": { "display": props.type },
                "item": []
            }
            for (const example of exampleProps) {
                if (example.static) {
                    for (const prop in example.static) {
                        style.container[prop] = example.static[prop]
                    }
                }
                if (!example.item) style.container[example.key] = example.selected

                style.item = getItemStyle(example)
            }
            return style
        })

        const _style = {}
        const getItemStyle = (item) => {
            let itemStyle = []
            let list = ref(Array(Number(props.item)).fill(0).map((_, i) => i + 1))
            const isArea = item.key === 'grid-template-areas'
            if (isArea) {
                list = computed(() => {
                    return item.selected.split(" ").map(i => i.replace("'", "")).filter((el, i, arr) => {
                        return arr.indexOf(el) === i && el !== "."
                    })
                })
            }
            for (let i = 0; i < list.value.length; i++) {
                _style[item.key] = item.selected
                _style["class"] = `item item-${list.value[i]} ${props.type}-item`
                _style["class"] += ` ${item.key}-item`
                itemStyle.push({
                    name: list.value[i],
                    class: _style.class,
                    style: item.item ? _style : isArea ? { gridArea: `${list.value[i]}` } : {}
                })
            }

            return itemStyle
        }
        return { exampleProps, styles }
    }
}
</script>
<style lang="scss" scoped>
.m-grid {
    .prop-form {
        .props {
            padding-bottom: 0.75rem;
        }
    }

    .prop-select {
        width: fit-content;
        height: 30px;
        border: 1px solid #ccc;
    }

    .container {
        border: 1px solid #999;
        gap: 2px;

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;

            &.flex-item {
                width: 100px;
                height: 100px;
            }

            &.flex-shrink-item {
                width: 120%;
            }

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

            &[class*='footer-'] {
                background-color: antiquewhite;
            }
        }

    }

}
</style>