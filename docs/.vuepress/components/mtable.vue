<script>
import { computed } from 'vue'
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
    setup(props) {
        const showDataProps = computed(() => {
            const list = []
            props.head.forEach(item => {
                list.push(item.prop)
            });
            return list
        })
        const aligns = computed(() => {
            return props.head.map(item => {
                return item.align ? item.align : `left`
            })
        })
        const getLinkUrl = (param, lang, prop) => {
            let linkParam
            let url = props.linkUrl
            const defaultLang = 'zh-CN'
            const regExp = [/\<|\>/g, /\:*[-*\w]+/g]
            const res = prop.replace(regExp[0], '').match(regExp[1])
            linkParam = param ? param : (res ? res[0] : '')
            url = `${props.linkUrl}${linkParam}`
            if (lang && lang !== defaultLang) {
                return url.replace(defaultLang, lang)
            }
            
            return url
        };
        const handleStr = (str) => {
            let code
            const regExp = /`\<*\:*[a-z-0-9-\+-\~-\>]+\>*`/ig
            if(str) code = str.match(regExp)
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
            getLinkUrl,
            handleStr
        }
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
                        <a v-if="!item.link" :href="getLinkUrl(item.linkParam, item.lang, item[prop])" target="_blank"
                            rel="noopener noreferrer">
                            <code class="table-code">{{ item[prop] }}</code>
                            <img src="/images/icons/link.svg" class="external-link-icon">
                        </a>
                        <code v-else class="table-code">{{ item[prop] }}</code>
                    </template>
                    <template v-else>
                        <span class="table-desc" v-html="handleStr(item[prop])"></span>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style lang="scss" scoped>
.table-code {
    display: contents;

    &+.external-link-icon {
        width: 0.75rem;
        height: auto;
        margin-left: .25rem;
    }
}
</style>
