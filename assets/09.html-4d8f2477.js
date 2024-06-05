import{_ as p,r as t,o,c,b as l,w as i,d as a,e as n,f as s}from"./app-5923a638.js";const u={},d=a(`<h1 id="diff-算法" tabindex="-1"><a class="header-anchor" href="#diff-算法" aria-hidden="true">#</a> Diff 算法</h1><p>diff 算法是 Vue 渲染器的核心算法，它会在页面或者组件将要更新时，比较新旧两组 vnode（虚拟dom）节点，并以最小的性能开销完成更新操作（能够复用的节点尽量复用，没办法复用的节点再进行 dom 操作）</p><p>diff 算法的目标是尽可能的减少 dom 操作从而降低性能开销，它主要通过以下几步实现：</p><ul><li>找出可以复用的元素（复用 dom 元素，需要使用 vnode 的类型与绑定的 key 来判断元素是否可以复用，此操作不会创建 dom）</li><li>找出需要移动的元素（更改移动 dom 的位置，此操作不会创建 dom）</li><li>添加新元素（此操作会创建新的 dom）</li><li>移除不存在的元素（此操作会删除 dom）</li></ul><p>假设现在有一组 vnode 需要更新：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//旧的 vnode</span>
<span class="token keyword">const</span> oldVnode <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
   <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">children</span><span class="token operator">:</span><span class="token string">&#39;1&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">children</span><span class="token operator">:</span><span class="token string">&#39;2&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">children</span><span class="token operator">:</span><span class="token string">&#39;3&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">children</span><span class="token operator">:</span><span class="token string">&#39;4&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">//新的 vnode</span>
<span class="token keyword">const</span> newVnode <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
   <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">children</span><span class="token operator">:</span><span class="token string">&#39;1&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">children</span><span class="token operator">:</span><span class="token string">&#39;4&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;h1&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">children</span><span class="token operator">:</span><span class="token string">&#39;3&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">children</span><span class="token operator">:</span><span class="token string">&#39;2&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不使用 diff 算法直接对新旧 vnode 进行更新操作，那么就要先卸载旧的 3 个子节点，在挂载新的 3 个子节点，一共要执行 6 次操作，这样移除在创建 dom 元素的操作会造成极大的性能开销。下面将探究使用 diff 算法是如何减小操作 dom 的性能开销的。</p>`,7),r=n("p",null,[s("这里在更新节点时没有提到使用 "),n("code",null,"innerHTML"),s(" 接口是因为这样做会存在一些问题：")],-1),k=n("ul",null,[n("li",null,[n("code",null,"innerHTML"),s(" 会将容器内所有节点全部清空，但容器的内容可能是由许多其他组件渲染的，这样做不能正确的执行这些组件的 "),n("code",null,"beforeUnmount"),s("、"),n("code",null,"unmounted"),s(" 等生命周期函数。")]),n("li",null,"容器当中的元素可能存在自定义指令，直接清空就不能触发对应的指令钩子函数。"),n("li",null,[n("code",null,"innerHTML"),s(" 清空元素时不会移除元素上绑定的事件处理函数。")])],-1),v=a(`<h2 id="patch-方法" tabindex="-1"><a class="header-anchor" href="#patch-方法" aria-hidden="true">#</a> patch 方法</h2><p>在探究 diff 算法之前，还应当了解 Vue 渲染器中的另一个重要的方法: patch，不同于 diff 算法，patch方法的作用是将 diff 算法中新旧节点有差异的部分（即需要进行 dom 操作更新的部分）更新到页面上。它的简易版实现如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//n1 代表旧的 vnode</span>
<span class="token comment">//n2 代表新的 vnode</span>
<span class="token comment">//container 代表容器元素，vnode 的容器</span>
<span class="token comment">//anchor 代表锚点元素，插入 vnode 时的实用的锚点</span>
<span class="token keyword">function</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">//如果旧的 vnode 存在并且与新的 vnode 是不同类型</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>n1 <span class="token operator">&amp;&amp;</span> n1<span class="token punctuation">.</span>type <span class="token operator">!==</span> n2<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//卸载清空旧的 vnode</span>
      <span class="token function">unmount</span><span class="token punctuation">(</span>n1<span class="token punctuation">)</span>
      n1 <span class="token operator">=</span> <span class="token keyword">null</span>
   <span class="token punctuation">}</span>
   
   <span class="token comment">//获取新的 vnode 的类型</span>
   <span class="token keyword">const</span> <span class="token punctuation">{</span> type <span class="token punctuation">}</span> <span class="token operator">=</span> n2
   <span class="token comment">//如果新的 vnode 的 type 属性类型是字符，表示新的 vnode 是一个 dom 元素</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> type <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>n1<span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token comment">//如果不存在旧的 vnode，那么直接挂载新的 vnode</span>
         <span class="token function">mountElement</span><span class="token punctuation">(</span>n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
         <span class="token comment">//否则比较新旧 vnode 的差异在进行更新操作</span>
         <span class="token function">patchElement</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   <span class="token comment">//如果新的 vnode 是文本类型</span>
   <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>type <span class="token operator">===</span> Text<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>n1<span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token comment">//如果不存在旧的 vnode，那么直接创建新的文本节点，使新的 vnode 保持对其引用然后插入到页面</span>
         <span class="token keyword">const</span> el <span class="token operator">=</span> n2<span class="token punctuation">.</span>el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
         <span class="token function">insert</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
         <span class="token comment">//如果存在旧的 vnode，那么直接使用新的 vnode 的文本内容更新旧的 vnode 的文本内容</span>
         <span class="token keyword">const</span> el <span class="token operator">=</span> n2<span class="token punctuation">.</span>el <span class="token operator">=</span> n1<span class="token punctuation">.</span>el
         <span class="token keyword">if</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>children <span class="token operator">!==</span> n1<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">{</span>
            el<span class="token punctuation">.</span>nodeValue <span class="token operator">=</span> n2<span class="token punctuation">.</span>children
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   <span class="token comment">//....</span>
   <span class="token comment">//省略部分逻辑</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">mountElement</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">//获取到 vnode 对应的 真实 dom 元素</span>
   <span class="token keyword">let</span> el <span class="token operator">=</span> vnode<span class="token punctuation">.</span>el 

   <span class="token comment">//....</span>
   <span class="token comment">//省略部分处理逻辑</span>
   
   <span class="token comment">// 将 dom 元素插入到容器中（透传锚点元素给 insert 函数）</span>
   <span class="token function">insert</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">unmount</span><span class="token punctuation">(</span><span class="token parameter">vnode</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">//获取 vnode 对应 dom 元素的父元素</span>
   <span class="token keyword">const</span> parent <span class="token operator">=</span> vnode<span class="token punctuation">.</span>el<span class="token punctuation">.</span>parent
   <span class="token keyword">if</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//从父元素中卸载 vnode 对应的真实 dom 元素</span>
      parent<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>el<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">patchElement</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">//新的 vonde 也保持对真实 dom 的引用</span>
   <span class="token keyword">const</span> el <span class="token operator">=</span> n2<span class="token punctuation">.</span>el <span class="token operator">=</span> n1<span class="token punctuation">.</span>el
   <span class="token comment">//....</span>
   <span class="token comment">//其他处理逻辑此处省略</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">setElementText</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> text</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//将操作 dom 的方法封装可以提供更好的跨平台兼容性</span>
    el<span class="token punctuation">.</span>nodeValue <span class="token operator">=</span> text
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> parent<span class="token punctuation">,</span> anchor<span class="token operator">=</span><span class="token keyword">null</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">//利用浏览器提供的 insertBefore 方法移动元素</span>
   parent<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单-diff" tabindex="-1"><a class="header-anchor" href="#简单-diff" aria-hidden="true">#</a> 简单 diff</h2><p>简单 diff 算法的核心逻辑是：用新的一组子节点中的节点与旧的一组子节点中的节点进行比较，寻找出可以复用的节点，如果找到了，就记录该节点的位置索引 <code>lastIndex</code>（也叫最大索引），然后在后续比较的过程中，如果有节点的索引小于这个最大索引，那么说明节点索引小于最大索引的这个节点对应的真实 dom 需要更新。如果有节点的索引大于最大索引，那么就将最大索引更新为当前节点的索引。</p><p>它的简易实现如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// diff 算法核心逻辑比较新旧一组 vnode 子节点</span>
<span class="token keyword">function</span> <span class="token function">patchChildren</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

   <span class="token comment">//如果新的子节点是文本节点</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> n2<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

      <span class="token comment">//如果旧的子节点是一组子节点，那么就将旧的子节点全部卸载</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>n1<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         n1<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">c</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">unmount</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">//将新的子节点内容更新</span>
      <span class="token function">setElementText</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> n2<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
   <span class="token punctuation">}</span> 

   <span class="token comment">//如果新的子节点是一组子节点</span>
   <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

      <span class="token comment">//保存新旧子节点</span>
      <span class="token keyword">const</span> oldChildren <span class="token operator">=</span> n1<span class="token punctuation">.</span>children
      <span class="token keyword">const</span> newChildren <span class="token operator">=</span> n2<span class="token punctuation">.</span>children

      <span class="token comment">//设置最大索引值</span>
      <span class="token keyword">const</span> lastIndex <span class="token operator">=</span> <span class="token number">0</span>

      <span class="token comment">//遍历新的子节点</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> newChildren<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

         <span class="token comment">//当前每个新子节点</span>
         <span class="token keyword">const</span> newVnode <span class="token operator">=</span> newChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span>

         <span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span>

         <span class="token comment">//设置 find 标识，表示是否找到了可复用的节点</span>
         <span class="token keyword">let</span> find <span class="token operator">=</span> <span class="token boolean">false</span>

         <span class="token comment">//遍历旧的子节点</span>
         <span class="token keyword">for</span> <span class="token punctuation">(</span>j<span class="token punctuation">;</span> j <span class="token operator">&lt;</span> oldChildren<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               <span class="token comment">//当前每个新子节点下的每个旧子节点</span>
               <span class="token keyword">const</span> oldVnode <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span>j<span class="token punctuation">]</span>

               <span class="token comment">//如果新子节点的key与旧子节点的key相同，说明是同一个节点，可以复用</span>
               <span class="token keyword">if</span> <span class="token punctuation">(</span>newVnode<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> oldVnode<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

                  <span class="token comment">//找到可复用节点后将 find 标识设置为 true </span>
                  find <span class="token operator">=</span> <span class="token boolean">true</span>

                  <span class="token comment">//使用 patch 方法对新旧节点更新</span>
                  <span class="token function">patch</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> newVnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>

                  <span class="token comment">//当旧子节点的索引小于设置的最大索引时，说明新的子节点对应的真实 dom 需要移动</span>
                  <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;</span> lastIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>

                     <span class="token comment">//获取新的子节点的上一个节点</span>
                     <span class="token keyword">const</span> prevVnode <span class="token operator">=</span> newChildren<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
                     <span class="token keyword">if</span> <span class="token punctuation">(</span>prevVnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                           <span class="token comment">//将上一个节点作为锚点元素，将新的子节点插入到锚点元素之前</span>
                           <span class="token keyword">const</span> anchor <span class="token operator">=</span> prevVnode<span class="token punctuation">.</span>el<span class="token punctuation">.</span>nextSibling
                           <span class="token function">insert</span><span class="token punctuation">(</span>newVnode<span class="token punctuation">.</span>el<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
                     <span class="token punctuation">}</span>
                  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                     <span class="token comment">//如果旧子节点的索引大于设置的最大索引时，说明不需要移动新子节点</span>
                     <span class="token comment">//对应的真实 dom，那么就更新最大索引</span>
                     lastIndex <span class="token operator">=</span> j
                  <span class="token punctuation">}</span>

                  <span class="token comment">//找到可复用的节点后结束当前对于旧的子节点的循环</span>
                  <span class="token keyword">break</span>
               <span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
         
         <span class="token comment">//如果在上一步循环遍历旧的子节点的过程中没有找到可以复用的节点，说明新子节点是新增的节点</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>find<span class="token punctuation">)</span> <span class="token punctuation">{</span>

               <span class="token comment">//获取当前新子节点的上一个节点</span>
               <span class="token keyword">const</span> prevVnode <span class="token operator">=</span> newChildren<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>

               <span class="token comment">//设置锚点元素</span>
               <span class="token keyword">let</span> anchor <span class="token operator">=</span> <span class="token keyword">null</span>

               <span class="token keyword">if</span> <span class="token punctuation">(</span>prevVnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//如果当前新子节点的上一个节点存在，就使用它作为锚点元素</span>
                  anchor <span class="token operator">=</span> prevVnode<span class="token punctuation">.</span>el<span class="token punctuation">.</span>nextSibling
               <span class="token punctuation">}</span> 
               <span class="token keyword">else</span> <span class="token punctuation">{</span>
                  <span class="token comment">//否则说明当前新子节点是容器的第一个子节点，使用容器的 firstChild 作为锚点元素</span>
                  anchor <span class="token operator">=</span> container<span class="token punctuation">.</span>firstChild
               <span class="token punctuation">}</span>

               <span class="token comment">//使用 patch 方法挂载更新</span>
               <span class="token function">patch</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> newVnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      
      <span class="token comment">//在上面新旧子节点更新操作完成后，遍历旧的子节点，寻找到需要卸载的旧的子节点</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> oldChildren<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">const</span> oldVnode <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span>

         <span class="token comment">//从新子节点中寻找旧的子节点是否还存在</span>
         <span class="token keyword">const</span> has <span class="token operator">=</span> newChildren<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">vnode</span> <span class="token operator">=&gt;</span> vnode<span class="token punctuation">.</span>key <span class="token operator">===</span> oldVnode<span class="token punctuation">.</span>key<span class="token punctuation">)</span>

         <span class="token comment">//如果不存在旧的子节点，就卸载它</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>has<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">unmount</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">//如果上面两个条件都不满足，说明就没有子节点</span>
      <span class="token comment">//设置容器的内容为空</span>
      <span class="token function">setElementText</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
      <span class="token comment">//更新新旧子节点内容</span>
      n2<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">c</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> c<span class="token punctuation">,</span> container<span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="双端-diff" tabindex="-1"><a class="header-anchor" href="#双端-diff" aria-hidden="true">#</a> 双端 diff</h2><p>双端 diff 算法的核心逻辑是：在新旧两组子节点的开始与结束位置的四个端点之间分别进行比较，寻找可以复用的节点，并动态的更新四个端点的位置，直到新旧两组子节点的开始小于结束位置。</p><p>它的简易实现如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchChildren</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//如果新的子节点是文本节点</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> n2<span class="token punctuation">.</span>children <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//.....</span>
      <span class="token comment">//此处逻辑与简单 diff 算法相同，省略</span>
   <span class="token punctuation">}</span> 
   <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">const</span> oldChildren <span class="token operator">=</span> n1<span class="token punctuation">.</span>children
      <span class="token keyword">const</span> newChildren <span class="token operator">=</span> n2<span class="token punctuation">.</span>children

      <span class="token comment">//设置新旧两组子节点开始与结束位置的索引</span>
      <span class="token keyword">let</span> oldStartIndex <span class="token operator">=</span> <span class="token number">0</span>
      <span class="token keyword">let</span> oldEndIndex <span class="token operator">=</span> oldChildren<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
      <span class="token keyword">let</span> newStartIndex <span class="token operator">=</span> <span class="token number">0</span>
      <span class="token keyword">let</span> newEndIndex <span class="token operator">=</span> newChildren<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>

      <span class="token comment">//设置新旧两组子节点开始与结束位置的索引对应的 vnode 节点</span>
      <span class="token keyword">let</span> oldStartVnode <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span>oldStartIndex<span class="token punctuation">]</span>
      <span class="token keyword">let</span> oldEndVnode <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span>oldEndIndex<span class="token punctuation">]</span>
      <span class="token keyword">let</span> newStartVnode <span class="token operator">=</span> newChildren<span class="token punctuation">[</span>newStartIndex<span class="token punctuation">]</span>
      <span class="token keyword">let</span> newEndVnode <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span>newEndIndex<span class="token punctuation">]</span>

      <span class="token comment">//从新旧子节点索引开始的位置循环，直到开始索引小于等于结束索引时结束循环</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>oldStartIndex <span class="token operator">&lt;=</span> oldEndIndex <span class="token operator">&amp;&amp;</span> newStartIndex <span class="token operator">&lt;=</span> newEndIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token comment">//当旧的开始位置的 vnode 的 key 与 新的开始位置的 vnode 的 key 相同时，说明是同一节点，可以复用 </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">.</span>key <span class="token operator">===</span> newStartVnode<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>

               <span class="token comment">//使用 patch 方法进行打补丁更新</span>
               <span class="token function">patch</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>

               <span class="token comment">//旧的开始位置的索引增加 1，新的开始位置的索引也增加 1，并且更新新旧开始索引对应的 vnode（继续向后寻找）</span>
               oldStartVnode <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span><span class="token operator">++</span>oldStartIndex<span class="token punctuation">]</span>
               newStartVnode <span class="token operator">=</span> newChildren<span class="token punctuation">[</span><span class="token operator">++</span>newStartIndex<span class="token punctuation">]</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//当旧的结束位置的 vnode 的 key 与新的结束位置的 vnode 的 key 相同时，说明是同一节点，可以复用 </span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">.</span>key <span class="token operator">===</span> oldEndVnode<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>

               <span class="token comment">//使用 patch 方法进行打补丁更新</span>
               <span class="token function">patch</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>

               <span class="token comment">//旧的结束位置的索引减少 1，新的结束位置的索引也减少 1，并且更新新旧结束索引对应的 vnode（继续向前寻找）</span>
               oldEndVnode <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span><span class="token operator">--</span>oldEndIndex<span class="token punctuation">]</span>
               newEndVnode <span class="token operator">=</span> newChildren<span class="token punctuation">[</span><span class="token operator">--</span>newEndIndex<span class="token punctuation">]</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//当旧的开始位置的 vnode 的 key 与新的结束位置的 vnode 的 key 相同时，</span>
            <span class="token comment">//说明是同一节点，但是旧的开始位置的 vnode 需要移动</span>
            <span class="token comment">//以新的结束位置为准，旧的开始位置的 vnode 需要移动到新的结束位置</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">.</span>key <span class="token operator">===</span> newEndVnode<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>

               <span class="token comment">//使用 patch 方法进行打补丁更新</span>
               <span class="token function">patch</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">,</span> newEndVnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>

               <span class="token comment">//使用 insert 方法进行节点移动</span>
               <span class="token function">insert</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">.</span>el<span class="token punctuation">,</span> container<span class="token punctuation">,</span> oldEndVnode<span class="token punctuation">.</span>el<span class="token punctuation">.</span>nextSibling<span class="token punctuation">)</span>

               <span class="token comment">//旧的结束位置的索引增加 1，新的结束位置的索引减少 1，并且更新新旧结束索引对应的 vnode（继续向中间寻找）</span>
               oldStartVnode <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span><span class="token operator">++</span>oldStartIndex<span class="token punctuation">]</span>
               newEndVnode <span class="token operator">=</span> newChildren<span class="token punctuation">[</span><span class="token operator">--</span>newEndIndex<span class="token punctuation">]</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//当旧的结束位置的 vnode 的 key 与新的开始位置的 vnode 的 key 相同时，</span>
            <span class="token comment">//说明是同一节点，但是旧的结束位置的 vnode 需要移动</span>
            <span class="token comment">//以新的开始位置为准，旧的结束位置的 vnode 需要移动到新的开始位置</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">.</span>key <span class="token operator">===</span> newStartVnode<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>

               <span class="token comment">//使用 patch 方法进行打补丁更新</span>
               <span class="token function">patch</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>

               <span class="token comment">//使用 insert 方法进行节点移动</span>
               <span class="token function">insert</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">.</span>el<span class="token punctuation">,</span> container<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>el<span class="token punctuation">.</span>nextSibling<span class="token punctuation">)</span>

               <span class="token comment">//旧的结束位置的索引减少 1，新的结束位置的索引增加 1，并且更新新旧结束索引对应的 vnode（继续向中间寻找）</span>
               oldEndVnode <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span><span class="token operator">--</span>oldEndIndex<span class="token punctuation">]</span>
               newStartVnode <span class="token operator">=</span> newChildren<span class="token punctuation">[</span><span class="token operator">++</span>newStartIndex<span class="token punctuation">]</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//当新旧两组子节点的开始与结束位置都比较过后仍然没有找到可复用的旧的 vnode 时</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
               
               <span class="token comment">//使用新的开始位置的 vnode 的 key 直接到旧的一组子节点中进行比较，找出对应的索引</span>
               <span class="token keyword">const</span> indexOld <span class="token operator">=</span> oldChildren<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token parameter">node</span> <span class="token operator">=&gt;</span> node<span class="token punctuation">.</span>key <span class="token operator">===</span> newStartVnode<span class="token punctuation">.</span>key<span class="token punctuation">)</span>

               <span class="token comment">//如果在旧的一组子节点中没有找到了新的开始位置的 vnode 对应的节点时，说明旧的 vnode 可以复用</span>
               <span class="token keyword">if</span> <span class="token punctuation">(</span>indexOld <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

                  <span class="token comment">//找到可以复用的旧的 vnode</span>
                  <span class="token keyword">const</span> vnodeToMove <span class="token operator">=</span> oldChildren<span class="token punctuation">[</span>indexOld<span class="token punctuation">]</span>

                  <span class="token comment">//使用 patch 方法进行打补丁更新</span>
                  <span class="token function">patch</span><span class="token punctuation">(</span>vnodeToMove<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>

                  <span class="token comment">//使用 insert 方法进行节点移动</span>
                  <span class="token function">insert</span><span class="token punctuation">(</span>vnodeToMove<span class="token punctuation">.</span>el<span class="token punctuation">,</span> container<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>el<span class="token punctuation">.</span>nextSibling<span class="token punctuation">)</span>

                  <span class="token comment">//将已经复用过的节点销毁</span>
                  oldChildren<span class="token punctuation">[</span>indexOld<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">undefined</span>
               <span class="token punctuation">}</span>

               <span class="token comment">//如果在旧的一组子节点中没有找到新的 vnode 对应的节点时，说明新的 vnode 是新增节点</span>
               <span class="token keyword">else</span> <span class="token punctuation">{</span>

                  <span class="token comment">//使用 patch 方法进行挂载</span>
                  <span class="token function">patch</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> newStartVnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>el<span class="token punctuation">)</span>
               <span class="token punctuation">}</span>

               <span class="token comment">//新的开始位置的索引增加 1，并且更新新的开始索引对应的 vnode（继续向后寻找）</span>
               newStartVnode <span class="token operator">=</span> newChildren<span class="token punctuation">[</span><span class="token operator">++</span>newStartIndex<span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      
      <span class="token comment">//在上面的循环更新结束后再检查一遍索引的情况，</span>
      <span class="token comment">//如果旧的结束索引小于旧的开始索引并且新的开始索引小于新的结束索引，说明新的一组子节点还有遗漏的情况</span>
      <span class="token comment">//这些遗漏的新的一组子节点都是新增节点</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>oldEndIndex <span class="token operator">&lt;</span> oldStartIndex <span class="token operator">&amp;&amp;</span> newStartIndex <span class="token operator">&lt;</span> newEndIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token comment">//从新的开始位置到新的结束位置再对新的一组子节点进行遍历（在它们之间的节点都是遗漏的新增节点）</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> newStartIndex<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> newEndIndex<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

               <span class="token comment">//找到新增节点的锚点元素</span>
               <span class="token keyword">const</span> anchor <span class="token operator">=</span> newChildren<span class="token punctuation">[</span>newEndIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">?</span> newChildren<span class="token punctuation">[</span>newEndIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>el <span class="token operator">:</span> <span class="token keyword">null</span>

               <span class="token comment">//使用 patch 方法进行挂载</span>
               <span class="token function">patch</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> newChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token comment">//如果新的结束索引小于新的开始索引并且旧的开始索引小于旧的结束索引，说明旧的一组子节点还有遗漏的情况</span>
      <span class="token comment">//这些遗漏的旧的一组子节点都是已经不存在的节点</span>
      <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>newEndIndex <span class="token operator">&lt;</span> newStartIndex <span class="token operator">&amp;&amp;</span> oldStartIndex <span class="token operator">&lt;</span> oldEndIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token comment">//从旧的开始位置到旧的结束位置再对旧的一组子节点进行遍历（在它们之间的节点都是遗漏的不存在的节点）</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> oldStartIndex<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> oldEndIndex<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

               <span class="token comment">//使用 unmount 方法移除这些不存在的旧的节点</span>
               <span class="token function">unmount</span><span class="token punctuation">(</span>oldChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">else</span><span class="token punctuation">{</span>
      <span class="token comment">//.....</span>
      <span class="token comment">//此处逻辑与简单 diff 算法相同，省略</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="快速-diff" tabindex="-1"><a class="header-anchor" href="#快速-diff" aria-hidden="true">#</a> 快速 diff</h2>`,12);function m(b,y){const e=t("Minfo");return o(),c("div",null,[d,l(e,null,{default:i(()=>[r,k]),_:1}),v])}const h=p(u,[["render",m],["__file","09.html.vue"]]);export{h as default};
