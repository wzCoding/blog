import{_ as n,o as s,c as a,d as t}from"./app-638e6571.js";const e={},p=t(`<h1 id="元素外部点击事件" tabindex="-1"><a class="header-anchor" href="#元素外部点击事件" aria-hidden="true">#</a> 元素外部点击事件</h1><p>点击事件通常都是由绑定了点击事件的元素触发的，但是在某些情况下，我们也会有监听是否在目标元素的外部区域触发了点击事件的需求。</p><h2 id="监听外部点击事件" tabindex="-1"><a class="header-anchor" href="#监听外部点击事件" aria-hidden="true">#</a> 监听外部点击事件</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code> <span class="token comment">//一个简单的监听是否在目标元素之外触发了点击事件的函数</span>
<span class="token comment">//接收 3 个参数：</span>
<span class="token comment">//1. 目标元素</span>
<span class="token comment">//2. 在目标元素外部触发点击事件后执行的回调函数</span>
<span class="token comment">//3. 需要排除的元素（即使在目标元素之外触发了点击事件，这部分元素也不会触发回调执行）</span>
<span class="token keyword">function</span> <span class="token function">clickOutSide</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> exclude</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>target<span class="token punctuation">)</span> <span class="token keyword">return</span>
   <span class="token comment">//将需要排除的元素参数归一化处理</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>exclude<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      exclude <span class="token operator">=</span> <span class="token punctuation">[</span>exclude<span class="token punctuation">]</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">const</span> excludeElements <span class="token operator">=</span> exclude<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>Boolean<span class="token punctuation">)</span>

   <span class="token comment">//点击事件的处理函数</span>
   <span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

      <span class="token comment">//获取目标元素的尺寸与位置信息</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> width<span class="token punctuation">,</span> height <span class="token punctuation">}</span> <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      <span class="token comment">//计算目标元素的结束位置</span>
      <span class="token keyword">const</span> endX <span class="token operator">=</span> x <span class="token operator">+</span> width
      <span class="token keyword">const</span> endY <span class="token operator">=</span> y <span class="token operator">+</span> height

      <span class="token comment">//排除 exclude 参数中的元素</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>excludeElements<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> excludeElements<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

      <span class="token comment">// 判断触发点击事件的元素的坐标位置是否与目标元素有重叠</span>
      <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>clientX <span class="token operator">&gt;</span> endX <span class="token operator">||</span> event<span class="token punctuation">.</span>clientX <span class="token operator">&lt;</span> x <span class="token operator">||</span> event<span class="token punctuation">.</span>clientY <span class="token operator">&gt;</span> endY <span class="token operator">||</span> event<span class="token punctuation">.</span>clientY <span class="token operator">&lt;</span> y<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token comment">//执行回调</span>
            callback <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   <span class="token comment">//给页面绑定点击事件</span>
   document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> handleClick<span class="token punctuation">)</span>

   <span class="token comment">//返回一个清除监听点击事件的函数，以便在合适的时候移除对整个页面点击事件的监听</span>
   <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      document<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> handleClick<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   
<span class="token punctuation">}</span>

<span class="token comment">//使用</span>

<span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;inner&quot;</span><span class="token operator">&gt;</span> inner <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;exclude&quot;</span><span class="token operator">&gt;</span> exclude <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token keyword">const</span> clean <span class="token operator">=</span> <span class="token function">clickOutSide</span><span class="token punctuation">(</span>
   <span class="token comment">//目标元素</span>
   document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.inner&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
   <span class="token comment">//回调函数</span>
   <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;点击了外部&#39;</span><span class="token punctuation">)</span>
      <span class="token comment">//在这里清除点击事件</span>
      <span class="token function">clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>

   <span class="token comment">//这里的元素不会触发回调函数的执行</span>
   document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.exclude&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","13.html.vue"]]);export{r as default};
