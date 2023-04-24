<script>
import { computed } from 'vue'
import LinkIcon from './linkIcon.vue'
export default {
    name: "Mtable",
    props: {
        head: {
            type: Array,
            default() {
                return []
            }
        },
        data: {
            type: Array,
            default() {
                return []
            }
        },
        linkUrl: {
            type: String,
            validator(value) {
                const regExp = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
                return value.match(regExp)
            }
        }
    },
    components:{LinkIcon},
    setup(props, context) {
        const showDataProps = computed(() => {
            const list = []
            props.head.forEach(item => {
                list.push(item.prop)
            });
            return list
        });
        const aligns = computed(() => {
            return props.head.map(item => {
                return item.align ? item.align : `left`
            })
        })
        const getLink = (param, lang, prop) => {
            let url
            if (param) {
                url = `${props.linkUrl}${param}`
            }else{
                const regExp = /.+[a-zA-Z]+/g
                const str = prop.match(regExp)[0]
                url = `${props.linkUrl}${str}`
            }

            const defaultLang = 'zh-CN'
            if (lang && lang !== defaultLang) {
                return `${url.replace(defaultLang, lang)}`
            }

            return `${url}`
        };
        const handleStr = (str) => {
            const regExp = /`\<*[a-z-0-9]+\>*`/ig
            const code = str.match(regExp)
            if (code) {
                code.forEach(item => {
                    const tag = item.replace(/</g, "&lt").replace(/>/g, "&gt")
                    const codeStr = `<code>${tag.replace(/\`+/g, "")}</code>`
                    str = str.replace(item, codeStr)
                })
                return str
            }
            return str
        }
        return {
            aligns,
            showDataProps,
            getLink,
            handleStr
        };
    }
}
</script>
<template>
    <table>
        <thead>
            <tr>
                <th v-for="(item, index) in head" :key="item.prop" :style="{ textAlign: aligns[index] }">{{ item.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" :key="item.code">
                <td v-for="(prop, index) in showDataProps" :key="prop" :style="{ textAlign: aligns[index] }">
                    <template v-if="prop == 'code'">
                        <a v-if="!item.link" :href="getLink(item.linkParam, item.lang, item[prop])" target="_blank"
                            rel="noopener noreferrer">
                            <code class="table-code">{{ item[prop] }}</code>
                            <LinkIcon></LinkIcon>
                        </a>
                        <code v-else class="table-code">{{ item[prop] }}</code>
                    </template>
                    <template v-else>
                        <span v-html="handleStr(item[prop])"></span>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style lang="scss" scoped>
.table-code{
    display:contents;
}
</style>
