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
       <div v-for="item in data" :key="item.code">
        <h6 class="code" >
           {{ item.code }}
        </h6> 
        <div class="desc"></div>
       </div>
       
       
    
    <!-- <table class="m-table">
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
                            <svg t="1682437644694" class="icon external-link-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3454" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128"><path d="M912 1008.512H15.488V112h448.256v96H111.488v704.512H816V560.256h96z" p-id="3455" fill="#999999"></path><path d="M918.208 37.888l67.904 67.904L545.984 545.92l-67.904-67.84z" p-id="3456" fill="#999999"></path><path d="M1007.168 310.656h-96V112h-208V16h304z" p-id="3457" fill="#999999"></path></svg>
                        </a>
                        <code v-else class="table-code">{{ item[prop] }}</code>
                    </template>
                    <template v-else>
                        <span class="table-desc" v-html="handleStr(item[prop])"></span>
                    </template>
                </td>
            </tr>
        </tbody>
    </table> -->
</template>
<style lang="scss" scoped>
.code{
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    color: #4e6e8e;
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0;
    font-size: 0.85em;
    background-color: #f3f4f5;
    border-radius: 3px;
    overflow-wrap: break-word;
    transition: background-color 0.3s ease;
    display: inline-block;
}
.desc{
   display: block;
}
table.m-table{
    content-visibility: auto;
    contain-intrinsic-size: auto 30rem;
}
.table-code {
    display: contents;

    &+.external-link-icon {
        width: 0.75rem;
        height: auto;
        margin-left: .25rem;
    }
}
</style>
