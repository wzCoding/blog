<script>
import { computed, toRefs } from 'vue'
export default {
    name: "Mcard",
    props: {
        item: {
            type: Object,
            default() {
                return {}
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
        const { item } = toRefs(props)
        const cardHead = computed(() => {
            const { linkParam, lang, code } = item.value
            const obj = {
                title: code,
                link: props.linkUrl ? getLinkUrl(linkParam, lang, code) : ''
            }
            return obj
        })
        const cardText = computed(() => {
            const { desc } = item.value
            return handleStr(desc)
        })
        const cardClick = (event) => {
            if (!props.linkUrl && event.srcElement.nodeName == 'CODE') {
                event.preventDefault()
                const parentNode = event.target.parentNode
                const href = parentNode.href
                const param = parentNode.getAttribute('linkparam')
                const mdnLink = href + param

                window.open(mdnLink)
            }
        }
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
            const regExp = /`\<*\:*[a-z-0-9-\+-\~-\>]+\>*`/ig
            let code = str.match(regExp)
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
            cardClick,
            cardHead,
            cardText
        }
    }
}
</script>

<template>
    <div class="m-card" @click="cardClick">
        <slot>
            <div class="card-head">
                <slot name="head" :head="cardHead">
                    <h4 :id="cardHead.title" tabindex="-1">
                        <a class="header-anchor" :href="`#${cardHead.title}`" aria-hidden="true">#</a>
                        <a v-if="cardHead.link" class="mdn-link" :href="cardHead.link" target="_blank"
                            rel="noopener noreferrer">
                            <code>{{ cardHead.title }}</code>
                            <img src="../public/assets/icon/link.png" alt="link">
                        </a>
                    </h4>
                </slot>
            </div>
            <div class="card-content">
                <slot name="text" :text="cardText">
                    <p v-html="cardText"></p>
                </slot>
            </div>
        </slot>
    </div>
</template>
<style lang="scss" scoped>
.m-card {
    --card-padding: 1.25rem;
    display: block;
    border-top: 1px solid transparent;
    border-radius: 3px;
    margin: calc(var(--card-padding) - 5px) 0;
    padding: var(--card-padding);
    padding-top: 0;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: relative;

    code {
        position: relative;
        z-index: 3;
    }

    .mdn-link {
        position: relative;
        top: 1px;
        z-index: 3;

        img {
            padding-left: .2rem;
            width: .75rem;
        }
    }

    .card-content {
        position: relative;
        z-index: 3;

        p {
            margin: 0 !important;
        }
    }

    &::after {
        content: '';
        opacity: 0;
        display: block;
        position: absolute;
        inset: 0;
        background: linear-gradient(to left, transparent 0%, rgba(24,144,255,0.3) 100%);
        transition: opacity .6s ease-in-out;
    }

    &:hover {
        &::after {
            opacity: 1;
        }
    }

    &.active {
        &::after {
            opacity: 1;
        }
    }
}

.dark {
    .m-card {
        background: rgba(64, 158, 255, .05);

    }
}
</style>
