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
        <div class="container" :style="styles.container">
            <div v-for="(i, index) in items" :key="`${i}-${index}`" class="item" :class="`${i}-${index + 1}`"
                :style="prop === 'grid-template-areas' ? { 'grid-area': `${i}` } : styles.item">{{ i }}</div>
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
                "grid-template-columns": "repeat(4,100px)",
                "grid-template-rows": "repeat(3,100px)"
            },
            active: [
                "auto",
                "1",
                "2",
                "3",
                "-1"
            ]
        },
        "grid-row-end": {
            item: true,
            active: [
                "auto",
                "1",
                "2",
                "3",
                "-1"
            ]

        },
        "grid-column-start": {
            item: true,
            static: {
                "grid-template-columns": "repeat(4,100px)",
                "grid-template-rows": "repeat(3,100px)"
            },
            active: [
                "auto",
                "1",
                "2",
                "3",
                "-1"
            ]
        },
        "grid-column-end": {
            item: true,
            active: [
                "auto",
                "1",
                "2",
                "3",
                "-1"
            ]
        },
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
                "item": {}
            }
            for (const example of exampleProps) {
                if (example.static) {
                    for (const prop in example.static) {
                        style.container[prop] = example.static[prop]
                    }
                }
                example.item ? style.item[example.key] = example.selected : style.container[example.key] = example.selected
            }
            // console.log(style)
            return style
        })
        const getItemStyle = (item) =>{
            if(item.key === 'grid-template-areas'){
                const item = computed(() => {
                    return item.selected.split(" ").map(i => i.replace("'", "")).filter((el, i, arr) => {
                        return arr.indexOf(el) === i && el !== "."
                    })
                })
            }
            return item.selected
        }
        const getAreas = (prop) => {
            if (prop && prop === 'grid-template-areas') {
                
                console.log(area.value)
                return area
            }
            return Number(props.item)
        }

        const items = ref(getAreas(props.prop))
        return { exampleProps, styles, items }
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