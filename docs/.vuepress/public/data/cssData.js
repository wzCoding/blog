const Selectors = {
    类型选择器: [
        { code: '标签（元素）名称', desc: '标签（元素）名称就是选择器', linkParam: 'Type_selectors' }
    ],
    全局选择器: [
        { code: '*', desc: '选择全部（所有）元素', linkParam: 'Universal_selectors' }
    ],
    类选择器: [
        { code: '.xxx', desc: '选择应用了这个类的所有元素', linkParam: 'Class_selectors' }
    ],
    ID选择器: [
        { code: '#xxx', desc: '选择应用了这个ID的元素，一个ID应在文档中只出现一次，与类选择器用法相似', linkParam: 'ID_Selectors' }
    ],
    存否和值选择器: [
        { code: '[attr]', desc: '选择带有一个名为attr的属性的元素——方括号里的值', linkParam: 'Attribute_selectors' },
        { code: '[attr=value]', desc: '选择带有一个名为attr的属性的元素，其值刚好为value——引号中的字符串', linkParam: 'Attribute_selectors' },
        { code: '[attr~=value]', desc: '选择带有一个名为attr的属性的元素，其值刚好为value，或者匹配带有一个attr属性的元素，其值有一个或者更多，至少有一个和value匹配 注意，在一列中的好几个值，是用空格隔开的', linkParam: 'Attribute_selectors' },
        { code: '[attr|=value]', desc: '选择带有一个名为attr的属性的元素，其值可刚好为value，或者开始为value，后面紧随着一个连字符', linkParam: 'Attribute_selectors' },
    ],
    子字符串匹配选择器: [
        { code: '[attr^=value]', desc: '选择带有一个名为attr的属性的元素，其值开头为value子字符串', linkParam: 'Attribute_selectors' },
        { code: '[attr$=value]', desc: '选择带有一个名为attr的属性的元素，其值结尾为value子字符串', linkParam: 'Attribute_selectors' },
        { code: '[attr*=value]', desc: '选择带有一个名为attr的属性的元素，其值的字符串中的任何地方，至少出现了一次value子字符串', linkParam: 'Attribute_selectors' },
    ],
    伪类: [
        { code: ':active', desc: ' 在用户激活（例如点击）元素的时候匹配 ', linkParam: 'Pseudo-classes' },
        { code: ':any-link', desc: ' 匹配一个链接的 `:link` 和 `:visited` 状态 ', linkParam: 'Pseudo-classes' },
        { code: ':blank', desc: ' 匹配空输入值的 `<input>` 元素 ', linkParam: 'Pseudo-classes' },
        { code: ':checked', desc: ' 匹配处于选中状态的单选或者复选框 ', linkParam: 'Pseudo-classes' },
        { code: ':current', desc: ' 匹配正在展示的元素，或者其上级元素 ', linkParam: 'Pseudo-classes' },
        { code: ':default', desc: ' 匹配一组相似的元素中默认的一个或者更多的 UI 元素 ', linkParam: 'Pseudo-classes' },
        { code: ':dir', desc: ' 基于其方向性（HTMLdir属性或者 CSSdirection属性的值）匹配一个元素 ', linkParam: 'Pseudo-classes' },
        { code: ':disabled', desc: ' 匹配处于关闭状态的用户界面元素 ', linkParam: 'Pseudo-classes' },
        { code: ':empty', desc: ' 匹配除了可能存在的空格外，没有子元素的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':enabled', desc: ' 匹配处于开启状态的用户界面元素 ', linkParam: 'Pseudo-classes' },
        { code: ':first', desc: ' 匹配分页媒体的第一页 ', linkParam: 'Pseudo-classes' },
        { code: ':first-child', desc: ' 匹配兄弟元素中的第一个元素 ', linkParam: 'Pseudo-classes' },
        { code: ':first-of-type', desc: ' 匹配兄弟元素中第一个某种类型的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':focus', desc: ' 当一个元素有焦点的时候匹配 ', linkParam: 'Pseudo-classes' },
        { code: ':focus-visible', desc: ' 当元素有焦点，且焦点对用户可见的时候匹配 ', linkParam: 'Pseudo-classes' },
        { code: ':focus-within', desc: ' 匹配有焦点的元素，以及子代元素有焦点的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':future', desc: ' 匹配当前元素之后的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':hover', desc: ' 当用户悬浮到一个元素之上的时候匹配 ', linkParam: 'Pseudo-classes' },
        { code: ':indeterminate', desc: ' 匹配未定态值的 UI 元素，通常为复选框 ', linkParam: 'Pseudo-classes' },
        { code: ':in-range', desc: ' 用一个区间匹配元素，当值处于区间之内时匹配 ', linkParam: 'Pseudo-classes' },
        { code: ':invalid', desc: ' 匹配诸如 `<input>` 的位于不可用状态的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':lang', desc: ' 基于语言（HTMLlang属性的值）匹配元素 ', linkParam: 'Pseudo-classes' },
        { code: ':last-child', desc: ' 匹配兄弟元素中最末的那个元素 ', linkParam: 'Pseudo-classes' },
        { code: ':last-of-type', desc: ' 匹配兄弟元素中最后一个某种类型的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':left', desc: ' 在分页媒体中，匹配左手边的页 ', linkParam: 'Pseudo-classes' },
        { code: ':link', desc: ' 匹配未曾访问的链接 ', linkParam: 'Pseudo-classes' },
        { code: ':local-link', desc: ' 匹配指向和当前文档同一网站页面的链接 ', linkParam: 'Pseudo-classes' },
        { code: ':is()', desc: ' 匹配传入的选择器列表中的任何选择器 ', linkParam: 'Pseudo-classes' },
        { code: ':not', desc: ' 匹配作为值传入自身的选择器未匹配的物件 ', linkParam: 'Pseudo-classes' },
        { code: ':nth-child', desc: ' 匹配一列兄弟元素中的元素——兄弟元素按照an+b形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等即所有的奇数个） ', linkParam: 'Pseudo-classes' },
        { code: ':nth-of-type', desc: ' 匹配某种类型的一列兄弟元素（比如 `<p>` 元素）——兄弟元素按照an+b形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等即所有的奇数个） ', linkParam: 'Pseudo-classes' },
        { code: ':nth-last-child', desc: ' 匹配一列兄弟元素，从后往前倒数兄弟元素按照an+b形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类从后往前数的所有奇数个） ', linkParam: 'Pseudo-classes' },
        { code: ':nth-last-of-type', desc: ' 匹配某种类型的一列兄弟元素（比如 `<p>` 元素），从后往前倒数兄弟元素按照an+b形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类从后往前数的所有奇数个） ', linkParam: 'Pseudo-classes' },
        { code: ':only-child', desc: ' 匹配没有兄弟元素的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':only-of-type', desc: ' 匹配兄弟元素中某类型仅有的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':optional', desc: ' 匹配不是必填的 `<form>` 元素 ', linkParam: 'Pseudo-classes' },
        { code: ':out-of-range', desc: ' 按区间匹配元素，当值不在区间内的的时候匹配 ', linkParam: 'Pseudo-classes' },
        { code: ':past', desc: ' 匹配当前元素之前的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':placeholder-shown', desc: ' 匹配显示占位文字的 `<input>` 元素 ', linkParam: 'Pseudo-classes' },
        { code: ':playing', desc: ' 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“播放”的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':paused', desc: ' 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“暂停”的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':read-only', desc: ' 匹配用户不可更改的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':read-write', desc: ' 匹配用户可更改的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':required', desc: ' 匹配必填的 `<form>` 元素 ', linkParam: 'Pseudo-classes' },
        { code: ':right', desc: ' 在分页媒体 中，匹配右手边的页 ', linkParam: 'Pseudo-classes' },
        { code: ':root', desc: ' 匹配文档的根元素 ', linkParam: 'Pseudo-classes' },
        { code: ':scope', desc: ' 匹配任何为参考点元素的的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':valid', desc: ' 匹配诸如 `<input>` 元素的处于可用状态的元素 ', linkParam: 'Pseudo-classes' },
        { code: ':target', desc: ' 匹配当前 URL 目标的元素（例如如果它有一个匹配当前URL 分段的元素） ', linkParam: 'Pseudo-classes' },
        { code: ':visited', desc: ' 匹配已访问链接 ', linkParam: 'Pseudo-classes' },
    ],
    伪元素: [
        {code:'::after', desc: ' 匹配出现在原有元素的实际内容之后的一个可样式化元素 ',linkParam: 'Pseudo-elements'},
        {code:'::before', desc: ' 匹配出现在原有元素的实际内容之前的一个可样式化元素 ',linkParam: 'Pseudo-elements'},
        {code:'::first-letter', desc: ' 匹配元素的第一个字母 ',linkParam: 'Pseudo-elements'},
        {code:'::first-line', desc: ' 匹配包含此伪元素的元素的第一行 ',linkParam: 'Pseudo-elements'},
        {code:'::grammar-error', desc: ' 匹配文档中包含了浏览器标记的语法错误的那部分 ',linkParam: 'Pseudo-elements'},
        {code:'::selection', desc: ' 匹配文档中被选择的那部分 ',linkParam: 'Pseudo-elements'},
        {code:'::spelling-error', desc: ' 匹配文档中包含了浏览器标记的拼写错误的那部分 ',linkParam: 'Pseudo-elements'},
    ],
    后代选择器: [
        { code: '单个空格', desc: '用单个空格将两个选择器隔开，表示选中空格前面元素的后代元素 ', linkParam: 'Descendant_combinator' }
    ],
    子代关系选择器: [
        { code: '>（大于号）', desc: '用 `>` 连接两个或多个选择器，选择 `>` 前面元素的直接子元素', linkParam: 'Child_combinator' }
    ],
    相邻兄弟选择器: [
        { code: '+（加号）', desc: '用 `+` 连接两个选择器，选择 `+` 前面元素的相邻兄弟元素（用 `+` 连接的两个元素的父元素相同）', linkParam: 'Adjacent_sibling_combinator' }
    ],
    通用兄弟选择器: [
        { code: '~（波浪号）', desc: '用 `~` 连接两个选择器，选择前面元素的所有兄弟元素（用 `~` 连接的两个元素的父元素相同）', linkParam: 'General_sibling_combinator' }
    ],
    选择器列表: [
        { code: ',（逗号）', desc: '用 `,` 将两个或者多个选择器隔开，表示选择多个匹配的元素', linkParam: 'Selector_list' }
    ]
}
const Propertys = {
    A: [
        { code: 'abs()', desc: 'CSS 函数，返回参数的绝对值', lang: 'en-US', linkParam: 'abs' },
        { code: 'accent-color', desc: '为某些元素生成控件设置强调色', lang: 'en-US' },
        { code: 'acos()', desc: 'CSS 三角函数返回介于 -1 和 1 之间的数的反余弦值此函数含有单个计算式，此式返回表示介于 0deg 和 180deg 之的  `<angle>` 的弧度数' },
        { code: ':active', desc: '伪类，匹配被用户激活的元素' },
        { code: 'additive-symbols', desc: '描述符定义符号，用于值可累积的可数的 system (en-US)的项', linkParam: '@counter-style/additive-symbols' },
        { code: '::after(:after)', desc: '伪元素，作为已选中元素的最后一个子元素，通常会配合 `content` 属性来为该元素添加装饰内容', linkParam: '::after' },
        { code: 'align-content', desc: '设置了沿弹性盒子布局的纵轴和网格布局的主轴在内容项之间和周围分配空间' },
        { code: 'align-items', desc: '将所有直接子节点上的 `align-self` 值设置为一个组' },
        { code: 'align-self', desc: '对齐当前 grid（块轴） 或 flex 行中（垂直轴）的元素，并覆盖已有的 `align-items` 的值' },
        { code: 'align-tracks', desc: '设置块轴上具有砌体的网格容器砌体轴的对齐方式', lang: 'en-US' },
        { code: 'all', desc: ' 简写属性，将除了 `unicode-bidi` 与 `direction` 之外的所有属性重设至其初始值，或继承值' },
        { code: '<angle>', desc: 'CSS 数据类型，用于表示角的大小，单位为度 `deg`、百分度 `grad`、弧度 `rad` 或圈数 `turn` ', linkParam: 'angle' },
        { code: '<angle-percentage>', desc: 'CSS 数据类型，代表了一种既可以是 `angle` ，也可以是 `percentage` 的数据类型', linkParam: 'angle-percentage' },
        { code: 'animation', desc: 'CSS 动画属性，所有 CSS 动画属性的简写属性形式' },
        { code: 'animation-composition', desc: 'CSS 动画属性，指定当多个动画同时影响同一个属性时要使用的复合操作', lang: 'en-US' },
        { code: 'animation-delay', desc: 'CSS 动画属性，指定从应用动画到元素开始执行动画之前等待的时间量' },
        { code: 'animation-direction', desc: 'CSS 动画属性，设置动画是应正向播放、反向播放还是在正向和反向之间交替播放' },
        { code: 'animation-duration', desc: 'CSS 动画属性，设置动画完成一个动画周期所需的时间' },
        { code: 'animation-fill-mode', desc: 'CSS 动画属性，设置 CSS 动画在执行之前和之后如何将样式应用于其目标' },
        { code: 'accent-color', desc: '为某些元素生成控件设置强调色' },
        { code: 'accent-color', desc: '为某些元素生成控件设置强调色' },
        { code: 'accent-color', desc: '为某些元素生成控件设置强调色' },
        { code: 'accent-color', desc: '为某些元素生成控件设置强调色' },
        { code: 'accent-color', desc: '为某些元素生成控件设置强调色' },
        { code: 'accent-color', desc: '为某些元素生成控件设置强调色' },
        { code: 'accent-color', desc: '为某些元素生成控件设置强调色' },
        { code: 'accent-color', desc: '为某些元素生成控件设置强调色' },
    ],
    B: [
        { code: '::backdrop', desc: '伪元素，在任何处于全屏模式的元素下的即刻渲染的盒子' },
    ]
}
export {
    Selectors,
    Propertys
}