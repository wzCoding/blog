import{_ as n,o as s,c as a,d as t}from"./app-c5fd9173.js";const p={},e=t(`<h1 id="分时函数" tabindex="-1"><a class="header-anchor" href="#分时函数" aria-hidden="true">#</a> 分时函数</h1><p>当有大量的渲染任务或者其他同步任务需要执行时，如果一次性全部执行可能会大量占用浏览器资源，导致浏览器无法及时执行从而卡顿，这样就会对使用体验造成不好的影响，此时我们就应当合理的安排这些任务的执行时机以缓解浏览器的压力。</p><h2 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现" aria-hidden="true">#</a> 具体实现</h2><p>分时函数可以将任务进行分割，将分割后的小段任务分配在浏览器的执行空闲时间段来执行，从而显著降低了浏览器的资源占用，它的实现如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 分时函数可以将大量任务分割，接收 3 个参数：任务列表，执行任务的回调，分割执行任务的回调</span>
<span class="token keyword">function</span> <span class="token function">splitTask</span><span class="token punctuation">(</span><span class="token parameter">list<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> splitor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>list<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   
   <span class="token comment">//如果没有传入 splitor 参数（分割任务执行器），就使用浏览器提供的 requestIdleCallback</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">!</span>splitor <span class="token operator">||</span> <span class="token keyword">typeof</span> splitor <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> window<span class="token punctuation">.</span>requestIdleCallback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      splitor <span class="token operator">=</span> window<span class="token punctuation">.</span>requestIdleCallback
   <span class="token punctuation">}</span>
   
   <span class="token comment">//设置当前任务索引，初始值为 0</span>
   <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span>

   <span class="token comment">//保存任务列表的长度</span>
   <span class="token keyword">const</span> len <span class="token operator">=</span> list<span class="token punctuation">.</span>length

   <span class="token comment">//判断当前是否应当执行任务，接收一个自定义的执行时间判断回调和当前时间参数</span>
   <span class="token keyword">const</span> <span class="token function-variable function">shouldRun</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">timeCallback<span class="token punctuation">,</span> now</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">//执行传入的自定义执行时间回调，传入当前时间与开始执行时间的差值，判断是否小于 16.6（浏览器刷新一帧的时间）</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>timeCallback <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> timeCallback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token function">timeCallback</span><span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> now <span class="token operator">&lt;</span> <span class="token number">16.6</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// requestIdleCallback 特有的回调参数 didTimeout来判断是否应当执行</span>
      <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>timeCallback <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> timeCallback <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> timeCallback<span class="token punctuation">.</span>didTimeout <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token operator">!</span>timeCallback<span class="token punctuation">.</span>didTimeout
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> now <span class="token operator">&lt;</span> <span class="token number">16.6</span>
   <span class="token punctuation">}</span>
   
   <span class="token comment">//具体执行任务的函数</span>
   <span class="token keyword">function</span> <span class="token function">runTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> list<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      
      <span class="token comment">//通过任务执行分割器来执行任务</span>
      <span class="token function">splitor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">remaining</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
         <span class="token comment">//获取当前时间</span>
         <span class="token keyword">let</span> now <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
         <span class="token comment">//while 循环执行任务</span>
         <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">shouldRun</span><span class="token punctuation">(</span>remaining<span class="token punctuation">,</span> now<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> index <span class="token operator">&lt;</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> task <span class="token operator">=</span> list<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
            callback <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">(</span>task<span class="token punctuation">,</span> index<span class="token punctuation">)</span>
            <span class="token comment">//更新当前时间</span>
            now <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            index<span class="token operator">++</span>
         <span class="token punctuation">}</span>

         <span class="token comment">//递归调用不间断执行</span>
         <span class="token function">runTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   <span class="token function">runTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//使用</span>
<span class="token keyword">const</span> tasks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">task</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">param</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">run</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">task<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">第 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 个任务</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">splitTask</span><span class="token punctuation">(</span>tasks<span class="token punctuation">,</span> run<span class="token punctuation">)</span>

<span class="token comment">// splitTask(tasks, run, (task) =&gt; {</span>
<span class="token comment">//    setTimeout(() =&gt; {</span>
<span class="token comment">//       task((time) =&gt; time &lt; 16)</span>
<span class="token comment">//    }, 200);</span>
<span class="token comment">// })</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","09.html.vue"]]);export{k as default};
