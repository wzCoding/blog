import{_ as c,r as o,o as l,c as i,e as t,f as n,b as a,w as e,d as p}from"./app-34a4ae3f.js";const u={},d=p(`<h1 id="computed-计算属性" tabindex="-1"><a class="header-anchor" href="#computed-计算属性" aria-hidden="true">#</a> computed 计算属性</h1><p>计算属性 <code>computed</code> 是 Vue3 中的一个重要特性，它可以将一个方法转换为响应式的属性。当计算属性的依赖项发生变化时，计算属性会自动更新。</p><p><code>computed</code> 是一个函数，它通常接受一个 getter 函数作为参数，getter 函数中要依赖其他的响应式数据。<code>computed</code> 函数返回一个 <code>ref</code> 对象，通过 <code>.value</code> 来访问计算属性的值</p><h2 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h2><p><code>computed</code> 计算属性有两种用法：</p><ul><li>只读的计算属性：仅传入 getter 函数作为参数，返回一个只读的响应式属性</li><li>可读可写的计算属性：传入 getter 和 setter 函数作为参数，返回一个可读可写的响应式属性</li></ul><h3 id="只读的计算属性" tabindex="-1"><a class="header-anchor" href="#只读的计算属性" aria-hidden="true">#</a> 只读的计算属性</h3><p>这是最常用的计算属性的使用方法，它只传入一个 getter 函数作为参数，返回一个只读的响应式属性。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> doubleCount <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> count<span class="token punctuation">.</span>value <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>doubleCount<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 0</span>

count<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>doubleCount<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可读可写的计算属性" tabindex="-1"><a class="header-anchor" href="#可读可写的计算属性" aria-hidden="true">#</a> 可读可写的计算属性</h3><p>这是计算属性的另一种用法，它以配置了 getter 和 setter 函数的对象作为参数，返回一个可读可写的响应式属性。它不仅能够在依赖变化时自动更新自身的值，也可以在自身的值变化时更新依赖的值。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> doubleCount <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> count<span class="token punctuation">.</span>value <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">newValue</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    count<span class="token punctuation">.</span>value <span class="token operator">=</span> newValue <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>doubleCount<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 0</span>

doubleCount<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 2</span>

count<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>doubleCount<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="计算属性缓存" tabindex="-1"><a class="header-anchor" href="#计算属性缓存" aria-hidden="true">#</a> 计算属性缓存</h2><p>计算属性会缓存其结果，计算属性在第一次计算出结果后，只有当计算属性依赖的响应式数据发生变化时，才会重新计算。如果多次访问计算属性，Vue 会自动缓存计算结果，并在下次访问时直接返回缓存的结果，以提高性能。</p><h2 id="计算属性与方法的区别" tabindex="-1"><a class="header-anchor" href="#计算属性与方法的区别" aria-hidden="true">#</a> 计算属性与方法的区别</h2><p>计算属性与方法的主要区别在于计算属性的值会根据其依赖的响应式数据自动更新，而方法则需要手动更新。</p><h2 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h2>`,17),r=t("code",null,"computed",-1),k=p(`<p><code>computed</code> 是懒执行的，它在内部有着自身的 effect 方法，并在内部通过缓存与懒执行的标识符来控制计算属性的缓存与更新。</p><p>以下是简单的代码实现：</p><h3 id="computed" tabindex="-1"><a class="header-anchor" href="#computed" aria-hidden="true">#</a> computed</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//定义 value 变量来缓存副作用函数执行结果 </span>
  <span class="token keyword">let</span> value<span class="token punctuation">;</span>
  <span class="token comment">//定义 dirty 标识符来控制是否需要重新触发执行副作用函数</span>
  <span class="token keyword">let</span> dirty <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token comment">//定义懒执行的副作用函数</span>
  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span><span class="token punctuation">{</span>
     <span class="token comment">//定义 lazy 标识符来控制是否需要懒执行</span>
     <span class="token literal-property property">lazy</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
     <span class="token comment">//定义 scheduler 调度器来控制副作用函数的执行时机</span>
     <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>dirty<span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token comment">// 将 dirty 标识符重置为 true</span>
          dirty <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
          <span class="token comment">//在这里手动触发执行依赖（value）</span>
          <span class="token function">trigger</span><span class="token punctuation">(</span>computedRef<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//定义计算属性的计算结果（ref对象）</span>
  <span class="token keyword">const</span> computedRef <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">//定义 value 属性来访问计算属性的值</span>
    <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//通过判断 dirty 标识来控制是否执行副作用函数</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//计算属性的计算结果</span>
        value <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//计算出结果后将 dirty 标识符重置为 false，表示当再次访问计算属性的 value 值时，</span>
        <span class="token comment">//不需要再次执行副作用函数，直接取用缓存的 value 值即可</span>
        dirty <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">//在这里手动收集计算属性的依赖（value）</span>
      <span class="token function">track</span><span class="token punctuation">(</span>computedRef<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> computedRef<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="effect" tabindex="-1"><a class="header-anchor" href="#effect" aria-hidden="true">#</a> effect</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//之前定义的 effect 方法进行部分改造</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//将副作用函数赋值给全局变量，表示当前执行的副作用函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">effectFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//在执行当前传入的副作用函数前，需要先清理掉上一次旧的副作用函数</span>
        <span class="token function">cleanup</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
        <span class="token comment">//将当前执行的副作用函数赋值给之前定义的全局变量，以便后续使用（判断）</span>
        activeEffect <span class="token operator">=</span> effectFn
        <span class="token comment">//模拟函数调用栈，将当前执行的副作用函数压入栈中保存</span>
        effectStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
        <span class="token comment">//执行副作用函数</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">//执行完副作用函数后，将当前执行的副作用函数弹出栈</span>
        effectStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">//将全局变量的值恢复为上一个副作用函数</span>
        activeEffect <span class="token operator">=</span> effectStack<span class="token punctuation">[</span>effectStack<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token comment">//返回副作用函数的执行结果</span>
        <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>
    <span class="token comment">//给 effectFn 添加一个配置对象，用于存储副作用函数的调度执行逻辑</span>
    effectFn<span class="token punctuation">.</span>options <span class="token operator">=</span> options
    <span class="token comment">//给 effectFn 添加 deps 属性，用于存储与响应式数据相关副作用函数的集合</span>
    effectFn<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment">//判断是否需要懒执行</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//执行副作用函数</span>
      <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> effectFn
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function v(m,b){const s=o("RouterLink");return l(),i("div",null,[d,t("p",null,[r,n(" 计算属性的实现原理是利用了 Vue 的 "),a(s,{to:"/blog-vue/01.html"},{default:e(()=>[n("响应式系统")]),_:1}),n("。在响应式系统中，通过 "),a(s,{to:"/blog-vue/01.html#%E6%89%A7%E8%A1%8C%E5%89%AF%E4%BD%9C%E7%94%A8%E5%87%BD%E6%95%B0"},{default:e(()=>[n("effect")]),_:1}),n(" 方法来执行副作用函数。")]),k])}const h=c(u,[["render",v],["__file","07.html.vue"]]);export{h as default};
