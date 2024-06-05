import{_ as n,o as s,c as a,d as e}from"./app-c5fd9173.js";const t={},p=e(`<h1 id="防抖与节流" tabindex="-1"><a class="header-anchor" href="#防抖与节流" aria-hidden="true">#</a> 防抖与节流</h1><p>防抖与节流是我们在开发中经常用到的工具函数，它们的作用是降低事件的触发频率，从而提高性能。</p><h2 id="防抖函数" tabindex="-1"><a class="header-anchor" href="#防抖函数" aria-hidden="true">#</a> 防抖函数</h2><p>防抖函数的作用是在一定时间内，事件被触发 n 次，只会执行一次回调函数。如果在一定时间内事件再次被触发，则会重新计算执行时间。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">callback<span class="token punctuation">,</span>delay</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">//设置定时器，用来表示事件是否触发过</span>
   <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span>
   <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//保存 this 上下文与参数</span>
      <span class="token keyword">let</span> that <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token keyword">let</span> args <span class="token operator">=</span> arguments
      
      <span class="token comment">//如果timer存在，表示重复触发了事件，清空已经存在的定时器（即取消即将执行的回调函数）</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span>
         timer <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span>
      
      <span class="token comment">//重新设置定时器，在到达给定的延迟后触发一次回调函数执行</span>
      timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
         callback <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>that<span class="token punctuation">,</span>args<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>delay<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>防抖函数经常用于输入框搜索事件、窗口大小变化事件等。</p><h2 id="节流函数" tabindex="-1"><a class="header-anchor" href="#节流函数" aria-hidden="true">#</a> 节流函数</h2><p>节流函数的作用是在一定时间内只执行一次回调函数，如果在这个时间内再次被触发，不会执行，直到下一个时间段。</p><h3 id="一般节流函数" tabindex="-1"><a class="header-anchor" href="#一般节流函数" aria-hidden="true">#</a> 一般节流函数</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">callback<span class="token punctuation">,</span>delay</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">//设置定时器，表示事件是否触发</span>
   <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span>
   <span class="token comment">//记录开始时间，表示事件触发的时间，后续再次触发会更新这个时间</span>
   <span class="token keyword">let</span> start <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//保存 this 上下文与参数</span>
      <span class="token keyword">let</span> that <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token keyword">let</span> args <span class="token operator">=</span> arguments
      
      <span class="token comment">//如果timer存在，表示重复触发了事件，清空已经存在的定时器（即取消即将执行的回调函数）</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span>
         timer <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span>
      <span class="token comment">//当重复触发事件后，计算给定的时间间隔与事件触发时间之间的的差值</span>
      <span class="token keyword">let</span> remaining <span class="token operator">=</span> delay <span class="token operator">-</span> <span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span>

      <span class="token keyword">if</span><span class="token punctuation">(</span>remaining <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token comment">//时间差值小于等于0 ，则说明已经到达给定的时间间隔，可以触发回调函数执行</span>
         callback <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>that<span class="token punctuation">,</span>args<span class="token punctuation">)</span>
         start <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
         <span class="token comment">//如果时间差值大于0，则说明还没有到达下一个时间间隔，将回调函数放入定时器中</span>
         <span class="token comment">//等待到达给定的时间间隔后执行回调</span>
         <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            callback <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>that<span class="token punctuation">,</span>args<span class="token punctuation">)</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>delay<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般节流函数经常用于滚动事件、表单按钮提交事件等。</p><h3 id="raf节流函数" tabindex="-1"><a class="header-anchor" href="#raf节流函数" aria-hidden="true">#</a> raf节流函数</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">rafThrottle</span><span class="token punctuation">(</span><span class="token parameter">callback<span class="token punctuation">,</span>delay</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">//设置触发锁</span>
   <span class="token keyword">let</span> lock <span class="token operator">=</span> <span class="token boolean">false</span>

   <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

      <span class="token comment">//如果触发锁为true，说明事件已经触发过，直接返回</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>lock<span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span>
      <span class="token punctuation">}</span>

      <span class="token comment">//如果触发锁为false，说明事件没有触发，此时可以触发回调执行，将触发锁设置为true</span>
      lock <span class="token operator">=</span> <span class="token boolean">true</span>

      <span class="token comment">//保存 this 上下文与参数</span>
      <span class="token keyword">let</span> that <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token keyword">let</span> args <span class="token operator">=</span> arguments
      
      <span class="token comment">//利用 requestAnimationFrame 函数来触发回调执行</span>
      window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
         callback <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>that<span class="token punctuation">,</span>args<span class="token punctuation">)</span>
         lock <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
         
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由 requestAnimationFrame 实现的节流函数适合用于控制执行与渲染相关的高频事件。</p>`,14),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","10.html.vue"]]);export{r as default};
