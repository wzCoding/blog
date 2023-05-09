<script>
import { computed } from 'vue'
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
        const cardHead = computed(() => {
            const { linkParam, lang, code } = props.item
            const obj = {
                title: code,
                link: props.linkUrl ? getLinkUrl(linkParam, lang, code) : ''
            }
            return obj
        })
        const cardText = computed(() => {
            const { desc } = props.item
            return handleStr(desc)
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
            cardHead,
            cardText
        }
    }
}
</script>

<template>
    <div class="card">
        <div class="card-head">
            <slot name="head" :head="cardHead">
                <h4 :id="cardHead.title" tabindex="-1">
                    <a class="header-anchor" :href="`#${cardHead.title}`" aria-hidden="true">#</a>
                    <code>{{ cardHead.title }}</code>
                </h4>
            </slot>
        </div>
        <div class="card-content">
            <slot name="text" :text="cardText">
                <p v-html="cardText"></p>
            </slot>
        </div>
        <div class="card-link">
            <a v-if="cardHead.link" class="mdn-link" :href="cardHead.link" target="_blank" rel="noopener noreferrer"></a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card-transition {
    transition: all 0.5s ease-in-out;
}

.card {
    display: block;
    border-top: 1px solid transparent;
    border-radius: 3px;
    margin: 15px 0;
    padding: 0 20px 20px 20px;
    box-sizing: content-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: relative;
    @extend .card-transition;

    .card-content {
        p {
            margin: 0 !important;
        }
    }

    .card-link {
        @extend .card-transition;
        display: block;
        width: 100%;
        height: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #f3f4f5;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        text-align: center;
        a{  
            @extend .card-transition;      
        }
    }

    &:hover {
        --link-height: 2rem;
        padding-bottom: calc(var(--link-height) + 10px);
        z-index: 10;
        .card-link {
            
            height: var(--link-height);
            line-height: var(--link-height);
            a::after {
                content:'Learn more →';
                color: #409eff;
            }
        }
    }
}

.dark {
    .card {
        background: rgba(64, 158, 255, .05);

        .card-link {
            background-color: rgba(105, 192, 255, .2);
        }
    }
}</style>
