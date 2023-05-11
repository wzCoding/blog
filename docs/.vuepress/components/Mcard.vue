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
        const handleTouch = event => {
            console.log(event)
        }
        const handleMove = event => {
            console.log(event)
        }
        return {
            cardHead,
            cardText,
            handleTouch,
            handleMove
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
            <a v-if="cardHead.link" class="mdn-link" :href="cardHead.link" target="_blank" rel="noopener noreferrer">learn
                more →</a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card-transition {
    transition: all .6s ease-in-out;
}

.card {
    @extend .card-transition;
    --card-padding: 1.25rem;
    display: block;
    border-top: 1px solid transparent;
    border-radius: 3px;
    margin: calc(var(--card-padding) - 5px) 0;
    padding: var(--card-padding);
    padding-top: 0;
    box-sizing: content-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: relative;
    overflow: hidden;

    .card-content {
        position: relative;

        p {
            margin: 0 !important;
        }
    }

    .card-link {
        @extend .card-transition;
        transform: translateY(100%) scale(0);
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        line-height: 100%;
        //background: linear-gradient(to bottom, #409eff33 0%, transparent 50%, #409eff33 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--card-padding);

        a {
            color: #1890ff;
            padding: calc(var(--card-padding) * 0.4) calc(var(--card-padding) * 0.8);
            border-radius: calc(var(--card-padding) * 0.8);
            border: 2px dashed #1890ff;
            text-decoration: none;
            background: linear-gradient(to bottom, #69c0ff4d 0%, #409eff33 50%, #69c0ff33 100%);
            font-size: .9rem;

        }
    }

    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50%;
        background: linear-gradient(to bottom, #409eff33 0%, transparent 100%);
        transform: translateY(-100%);
        @extend .card-transition;
    }

    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent 0%, #409eff33 100%);
        transform: translateY(100%);
        @extend .card-transition;
    }

    &:hover {

        &::before,
        &::after {
            transform: translateY(0);
        }

        h4 code,
        .card-content {
            color: #d9d9d9;
            p,
            p code,
            code {
                color: #d9d9d9;
            }
        }

        .card-link {
            transform: translateY(0) scale(1);
            z-index: 5;
        }


    }
}

.dark {
    .card {
        background: rgba(64, 158, 255, .05);

        &:hover {

            h4 code,
            .card-content {
                color: #d9d9d933;

                p,
                p code,
                code {
                    color: #d9d9d933;
                }
            }

        }
    }
}</style>
