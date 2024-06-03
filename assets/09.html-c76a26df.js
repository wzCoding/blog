import{_ as e,r as t,o,c,b as l,w as i,d as a,e as n,f as s}from"./app-60bddbc2.js";const u={},r=a(`<h1 id="diff-算法" tabindex="-1"><a class="header-anchor" href="#diff-算法" aria-hidden="true">#</a> Diff 算法</h1><p>diff 算法是 Vue 渲染器的核心算法，它的目的是当页面或者组件将要更新时，比较新旧两组 vnode（虚拟dom）节点，并以最小的性能开销完成更新操作（能够复用的节点尽量复用，没办法复用的节点再进行 dom 操作）</p><p>假设现在有一组 vnode 需要更新：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//旧的 vnode</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不使用 diff 算法直接对新旧 vnode 进行更新操作，那么就要先卸载旧的 3 个子节点，在挂载新的 3 个子节点，一共要执行 6 次操作，这样移除在创建 dom 元素的操作会造成极大的性能开销。下面将探究使用 diff 算法是如何减小操作 dom 的性能开销的。</p>`,5),d=n("p",null,[s("这里在更新节点时没有提到使用 "),n("code",null,"innerHTML"),s(" 接口是因为这样做会存在一些问题：")],-1),k=n("ul",null,[n("li",null,[n("code",null,"innerHTML"),s(" 会将容器内所有节点全部清空，但容器的内容可能是由许多其他组件渲染的，这样做不能正确的执行这些组件的 "),n("code",null,"beforeUnmount"),s("、"),n("code",null,"unmounted"),s(" 等生命周期函数。")]),n("li",null,"容器当中的元素可能存在自定义指令，直接清空就不能触发对应的指令钩子函数。"),n("li",null,[n("code",null,"innerHTML"),s(" 清空元素时不会移除元素上绑定的事件处理函数。")])],-1),v=a(`<h2 id="patch-方法" tabindex="-1"><a class="header-anchor" href="#patch-方法" aria-hidden="true">#</a> patch 方法</h2><p>在探究 diff 算法之前，还应当了解 Vue 渲染器中的另一个重要的方法: patch，不同于 diff 算法，patch方法的作用是将 diff 算法中新旧子节点有差异的部分（即需要进行 dom 操作更新的部分）更新到页面上。它的简易版实现如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//n1 代表旧的 vnode</span>
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
   <span class="token comment">//如果新的 vnode 类型是字符，表示新的 vnode 是一个 dom 元素</span>
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
   <span class="token comment">//新的 vonde 也引用了真实 dom</span>
   <span class="token keyword">const</span> el <span class="token operator">=</span> n2<span class="token punctuation">.</span>el <span class="token operator">=</span> n1<span class="token punctuation">.</span>el
   <span class="token comment">//....</span>
   <span class="token comment">//其他处理逻辑此处省略</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单-diff" tabindex="-1"><a class="header-anchor" href="#简单-diff" aria-hidden="true">#</a> 简单 diff</h2><h2 id="双端-diff" tabindex="-1"><a class="header-anchor" href="#双端-diff" aria-hidden="true">#</a> 双端 diff</h2><h2 id="快速-diff" tabindex="-1"><a class="header-anchor" href="#快速-diff" aria-hidden="true">#</a> 快速 diff</h2>`,6);function m(b,y){const p=t("Minfo");return o(),c("div",null,[r,l(p,null,{default:i(()=>[d,k]),_:1}),v])}const h=e(u,[["render",m],["__file","09.html.vue"]]);export{h as default};
