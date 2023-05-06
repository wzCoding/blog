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
    <div v-for="item in data" :key="item.code" class="card" >
        <h4 :id="item.code" tabindex="-1">
            <a class="header-anchor" :href="`#${item.code}`" aria-hidden="true">#</a> 
            <code>{{ item.code }}</code>
        </h4>
        <p v-html="handleStr(item.desc)"></p>
    </div>
</template>
<style lang="scss" scoped>
.card{
    display:block;
    border:1px solid #d9d9d9;
    border-radius: 3px;
    margin:10px 0;
    padding:0 20px;
    p{
        margin-top:0 !important;
    }
}
</style>
