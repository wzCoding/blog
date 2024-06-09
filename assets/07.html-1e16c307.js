import{_ as o,r as c,o as l,c as i,e as t,f as n,b as a,w as e,d as p}from"./app-adbf27dd.js";const u={},r=p(`<h1 id="watch-侦听器" tabindex="-1"><a class="header-anchor" href="#watch-侦听器" aria-hidden="true">#</a> watch 侦听器</h1><p><code>watch</code> 侦听器是 Vue3 中的一个重要特性，它可以监测数据的变化，并在它们发生变化时调用传入的回调函数来帮助我们完成一些其他操作。</p><h2 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h2><p><code>watch</code> 侦听器接收 3 个参数：</p><ul><li>第一个参数是我们要侦听的数据（响应式数据对象、getter 函数、前面两种数据组成的数组）</li><li>第二个参数是回调函数，当数据发生变化时，回调函数会被调用</li><li>第三个参数是可选的： <ul><li><code>immediate</code>：一个布尔值，表示是否在侦听开始之后立即调用回调函数</li><li><code>deep</code>：一个布尔值，表示是否深度侦听，即是否在侦听数据对象时，递归地侦听其所有属性</li><li><code>once</code>：一个布尔值，表示是否只调用一次回调函数，即在侦听开始之后立即调用回调函数，然后停止侦听</li><li><code>flush</code>：一个字符串，表示回调函数的调用时机，可以是 <code>pre</code>（表示在 DOM 更新之前调用）、<code>post</code>（表示在 DOM 更新之后调用）、<code>sync</code>（表示同步调用）</li></ul></li></ul><h3 id="监听响应式数据对象" tabindex="-1"><a class="header-anchor" href="#监听响应式数据对象" aria-hidden="true">#</a> 监听响应式数据对象</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">watch</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newValue<span class="token punctuation">,</span> oldValue</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;obj changed&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;newValue ==&gt;&#39;</span><span class="token punctuation">,</span> newValue<span class="token punctuation">,</span> <span class="token string">&#39;oldValue ==&gt;&#39;</span><span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">deep</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span>value<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">// 输出：</span>
<span class="token comment">// obj changed</span>
<span class="token comment">// newValue ==&gt; { count: 1 }</span>
<span class="token comment">// oldValue ==&gt; { count: 0 }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="监听-getter-函数" tabindex="-1"><a class="header-anchor" href="#监听-getter-函数" aria-hidden="true">#</a> 监听 getter 函数</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>value<span class="token punctuation">.</span>count<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newValue<span class="token punctuation">,</span> oldValue</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;obj.count changed&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;newValue ==&gt;&#39;</span><span class="token punctuation">,</span> newValue<span class="token punctuation">,</span> <span class="token string">&#39;oldValue ==&gt;&#39;</span><span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">deep</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span>value<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">// 输出：</span>
<span class="token comment">// obj.count changed</span>
<span class="token comment">// newValue ==&gt; 1</span>
<span class="token comment">// oldValue ==&gt; 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="监听多个数据" tabindex="-1"><a class="header-anchor" href="#监听多个数据" aria-hidden="true">#</a> 监听多个数据</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> watch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>value<span class="token punctuation">.</span>count<span class="token punctuation">,</span> num<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>newValue1<span class="token punctuation">,</span> newValue2<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>oldValue1<span class="token punctuation">,</span> oldValue2<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;obj.count or num changed&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;newValue1 ==&gt;&#39;</span><span class="token punctuation">,</span> newValue1<span class="token punctuation">,</span> <span class="token string">&#39;newValue2 ==&gt;&#39;</span><span class="token punctuation">,</span> newValue2<span class="token punctuation">,</span> <span class="token string">&#39;oldValue1 ==&gt;&#39;</span><span class="token punctuation">,</span> oldValue1<span class="token punctuation">,</span> <span class="token string">&#39;oldValue2 ==&gt;&#39;</span><span class="token punctuation">,</span> oldValue2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">deep</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span>value<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
num<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">// 输出：</span>
<span class="token comment">// obj.count or num changed</span>
<span class="token comment">// newValue1 ==&gt; 1</span>
<span class="token comment">// newValue2 ==&gt; 1</span>
<span class="token comment">// oldValue1 ==&gt; 0</span>
<span class="token comment">// oldValue2 ==&gt; 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h2>`,12),d=t("code",null,"watch",-1),k=p(`<p><code>watch</code> 也是懒执行的，即只有在侦听开始之后，才会执行传入的回调函数。它同样有着自身内部的 effect 方法，用于控制回调函数的执行。</p><p><code>watch</code> 的实现还依赖 <code>traverse</code> 函数，它用来读取 <code>watch</code> 所监听的源对象。</p><p>以下是简单的代码实现：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">watch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//定义 getter，用来读取监听数据的值</span>
    <span class="token keyword">let</span> getter

    <span class="token comment">//参数归一化处理，将传入的 source 转换为 getter 函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        getter <span class="token operator">=</span> source
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">traverse</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//定义 watch 监听的新值和旧值</span>
    <span class="token keyword">let</span> oldValue<span class="token punctuation">,</span> newValue

    <span class="token comment">//定义清理过期回调的函数</span>
    <span class="token keyword">let</span> cleanup

    <span class="token comment">//将用户传入的过期回调函数存储在 cleanup 中</span>
    <span class="token keyword">function</span> <span class="token function">onInvalidate</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cleanup <span class="token operator">=</span> fn
    <span class="token punctuation">}</span>
    
    <span class="token comment">//定义 job 任务函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">job</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

        <span class="token comment">//获取新值</span>
        newValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        
        <span class="token comment">//如果 cleanup 清理过期回调的函数存在，就先清理过期的回调，然后再执行</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cleanup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//执行传入的 callback</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">,</span> onInvalidate<span class="token punctuation">)</span>
        
        <span class="token comment">//获取旧值</span>
        oldValue <span class="token operator">=</span> newValue
    <span class="token punctuation">}</span>

    <span class="token comment">//注册 effectFn 副作用函数</span>
    <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>

        <span class="token comment">//执行 getter 读取数据</span>
        <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">getter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>   
            <span class="token comment">//设置 lazy 选项，表示懒执行</span>
            <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

            <span class="token comment">//设置 scheduler 调度器函数</span>
            <span class="token function-variable function">scheduler</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

                <span class="token comment">//判断 options 中的 flush 是否为 post</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>flush <span class="token operator">===</span> <span class="token string">&#39;post&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

                    <span class="token comment">//如果 flush 为 post，则将 job 函数放到微任务队列中执行</span>
                    <span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token comment">//否则直接执行 job 函数</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
    
    <span class="token comment">//判断 options 中的 immediate 选项是否为 true</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">//是则直接执行 job 函数</span>
        <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//否则手动执行副作用函数，获取旧值</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        oldValue <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> seen <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">//如果被读取的数据是原始值或者已经被读取过，就直接返回</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> value <span class="token operator">!==</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">||</span> value <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> seen<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
   <span class="token comment">//否则将数据添加到 seen 这个集合中用来缓存</span>
   seen<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
   
   <span class="token comment">//循环遍历传入的对象数据的每个属性，递归的调用 traverse 函数处理</span>
   <span class="token comment">//（这里暂时不考虑数组的情况，数组直接使用循环即可）</span>
   <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> value<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> seen<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">return</span> value
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function v(m,b){const s=c("RouterLink");return l(),i("div",null,[r,t("p",null,[d,n(" 侦听器的实现原理是利用了 Vue 的 "),a(s,{to:"/blog-vue/01.html"},{default:e(()=>[n("响应式系统")]),_:1}),n("。在响应式系统中，通过 "),a(s,{to:"/blog-vue/01.html#%E6%89%A7%E8%A1%8C%E5%89%AF%E4%BD%9C%E7%94%A8%E5%87%BD%E6%95%B0"},{default:e(()=>[n("effect")]),_:1}),n(" 方法来执行传入的回调函数。")]),k])}const g=o(u,[["render",v],["__file","07.html.vue"]]);export{g as default};
