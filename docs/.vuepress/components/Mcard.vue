<script>
export default {
    name: "Mcard",
    props: {
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
            if (str) code = str.match(regExp)
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
            getLinkUrl,
            handleStr
        }
    }
}
</script>

<template>
    <div v-for="item in data" :key="item.code" class="card">
        <h4 :id="item.code" tabindex="-1">
            <a class="header-anchor" :href="`#${item.code}`" aria-hidden="true">#</a>
            <a class="mdn-link" :href="getLinkUrl(item.linkParam, item.lang, item.code)" target="_blank"
                rel="noopener noreferrer">
                <code>{{ item.code }}</code>
            </a>
        </h4>
        <p v-html="handleStr(item.desc)"></p>

    </div>
</template>
<style lang="scss" scoped>
.card {
    display: block;
    border: 1px dotted transparent;
    border-radius: 3px;
    margin: 15px 0;
    padding: 0 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    p {
        margin-top: 0 !important;
    }

}
.dark .card{
    background: rgba(64, 158, 255, .05);
}

</style>
