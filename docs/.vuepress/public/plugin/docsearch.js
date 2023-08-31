import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default docsearchPlugin({
    apiKey: "34dce41a4a05173b371754e97ae27d58",
    appId: "8MTXEY4RRL",
    indexName: "wz_blog",
    placeholder: "请输入关键词",
    translations: {
        button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
        },
        modal: {
            searchBox: {
                resetButtonTitle: '放弃搜索',
                resetButtonAriaLabel: '放弃搜索',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
            },
            startScreen: {
                recentSearchesTitle: '最近搜索',
                noRecentSearchesText: '没有最近搜索记录',
                saveRecentSearchButtonTitle: '保存搜索记录',
                removeRecentSearchButtonTitle: '删除搜索记录',
                favoriteSearchesTitle: '保存搜索记录',
                removeFavoriteSearchButtonTitle: '删除搜索记录',
            },
            errorScreen: {
                titleText: '无法查询搜索结果',
                helpText: '请检查你的网络连接...',
            },
            footer: {
                selectText: '选择',
                selectKeyAriaLabel: 'Enter key',
                navigateText: '移动',
                navigateUpKeyAriaLabel: 'Arrow up',
                navigateDownKeyAriaLabel: 'Arrow down',
                closeText: '关闭',
                closeKeyAriaLabel: 'Escape key',
                searchByText: '搜索功能来自',
            },
            noResultsScreen: {
                noResultsText: '很抱歉，搜索不到',
                suggestedQueryText: '请尝试搜索',
                reportMissingResultsText: '相信这条搜索结果吗？',
                reportMissingResultsLinkText: '联系我们',
            },
        },
    }
})