import{_ as n,o as s,c as a,d as e}from"./app-5340994e.js";const t={},p=e(`<h1 id="树结构转换" tabindex="-1"><a class="header-anchor" href="#树结构转换" aria-hidden="true">#</a> 树结构转换</h1><p>在开发当中，我们经常会遇到树形结构的数据，有时我们需要将数据转换为树结构渲染展示，有时有需要将树结构数据展开铺平从而方便我们进行数据处理。</p><h2 id="数据" tabindex="-1"><a class="header-anchor" href="#数据" aria-hidden="true">#</a> 数据</h2><p>有如下符合树结构的数据：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;1-1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;1-1-1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;1-1&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;1-2&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;1-2-1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;1-2&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;1-3&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;2-1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;2&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;2-1-1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;2-1&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;2-2&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;2&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;2-2-1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;2-2&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;2-1-1-1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">parent</span><span class="token operator">:</span><span class="token string">&#39;2-1-1&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="转换为树结构" tabindex="-1"><a class="header-anchor" href="#转换为树结构" aria-hidden="true">#</a> 转换为树结构</h2><p>将如上的数据转换为树结构，具体代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getTree</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>list <span class="token operator">||</span> <span class="token operator">!</span>list<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">const</span> tree <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>   <span class="token comment">// 存放结果</span>
   <span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>  <span class="token comment">// 存放对象映射关系</span>

   <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//假设每个节点都有子节点，为每个节点添加 children 属性</span>
      item<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

      <span class="token comment">// 使用对象的 name 属性作为 map 的 key 值，对应的对象为 value，建立对象映射关系</span>
      map<span class="token punctuation">[</span>item<span class="token punctuation">.</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>item <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果存在 parent 属性，说明它是某个节点的子节点</span>
            map<span class="token punctuation">[</span>item<span class="token punctuation">.</span>parent<span class="token punctuation">]</span><span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>map<span class="token punctuation">[</span>item<span class="token punctuation">.</span>name<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果没有 parent 属性，说明它是根节点</span>
            tree<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>map<span class="token punctuation">[</span>item<span class="token punctuation">.</span>name<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">return</span> tree
<span class="token punctuation">}</span>
<span class="token comment">// 使用</span>
<span class="token comment">// 这里使用上面的 list 数据</span>
<span class="token keyword">const</span> listToTree <span class="token operator">=</span> <span class="token function">getTree</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>listToTree<span class="token punctuation">)</span>
<span class="token comment">// 输出：</span>
<span class="token comment">// [</span>
<span class="token comment">//     {</span>
<span class="token comment">//         &quot;name&quot;: &quot;1&quot;,</span>
<span class="token comment">//         &quot;children&quot;: [</span>
<span class="token comment">//             {</span>
<span class="token comment">//                 &quot;name&quot;: &quot;1-1&quot;,</span>
<span class="token comment">//                 &quot;parent&quot;: &quot;1&quot;,</span>
<span class="token comment">//                 &quot;children&quot;: [</span>
<span class="token comment">//                     {</span>
<span class="token comment">//                         &quot;name&quot;: &quot;1-1-1&quot;,</span>
<span class="token comment">//                         &quot;parent&quot;: &quot;1-1&quot;,</span>
<span class="token comment">//                         &quot;children&quot;: []</span>
<span class="token comment">//                     }</span>
<span class="token comment">//                 ]</span>
<span class="token comment">//             },</span>
<span class="token comment">//             {</span>
<span class="token comment">//                 &quot;name&quot;: &quot;1-2&quot;,</span>
<span class="token comment">//                 &quot;parent&quot;: &quot;1&quot;,</span>
<span class="token comment">//                 &quot;children&quot;: [</span>
<span class="token comment">//                     {</span>
<span class="token comment">//                         &quot;name&quot;: &quot;1-2-1&quot;,</span>
<span class="token comment">//                         &quot;parent&quot;: &quot;1-2&quot;,</span>
<span class="token comment">//                         &quot;children&quot;: []</span>
<span class="token comment">//                     }</span>
<span class="token comment">//                 ]</span>
<span class="token comment">//             },</span>
<span class="token comment">//             {</span>
<span class="token comment">//                 &quot;name&quot;: &quot;1-3&quot;,</span>
<span class="token comment">//                 &quot;parent&quot;: &quot;1&quot;,</span>
<span class="token comment">//                 &quot;children&quot;: []</span>
<span class="token comment">//             }</span>
<span class="token comment">//         ]</span>
<span class="token comment">//     },</span>
<span class="token comment">//     {</span>
<span class="token comment">//         &quot;name&quot;: &quot;2&quot;,</span>
<span class="token comment">//         &quot;parent&quot;: null,</span>
<span class="token comment">//         &quot;children&quot;: [</span>
<span class="token comment">//             {</span>
<span class="token comment">//                 &quot;name&quot;: &quot;2-1&quot;,</span>
<span class="token comment">//                 &quot;parent&quot;: &quot;2&quot;,</span>
<span class="token comment">//                 &quot;children&quot;: [</span>
<span class="token comment">//                     {</span>
<span class="token comment">//                         &quot;name&quot;: &quot;2-1-1&quot;,</span>
<span class="token comment">//                         &quot;parent&quot;: &quot;2-1&quot;,</span>
<span class="token comment">//                         &quot;children&quot;: [</span>
<span class="token comment">//                             {</span>
<span class="token comment">//                                 &quot;name&quot;: &quot;2-1-1-1&quot;,</span>
<span class="token comment">//                                 &quot;parent&quot;: &quot;2-1-1&quot;,</span>
<span class="token comment">//                                 &quot;children&quot;: []</span>
<span class="token comment">//                             }</span>
<span class="token comment">//                         ]</span>
<span class="token comment">//                     }</span>
<span class="token comment">//                 ]</span>
<span class="token comment">//             },</span>
<span class="token comment">//             {</span>
<span class="token comment">//                 &quot;name&quot;: &quot;2-2&quot;,</span>
<span class="token comment">//                 &quot;parent&quot;: &quot;2&quot;,</span>
<span class="token comment">//                 &quot;children&quot;: [</span>
<span class="token comment">//                     {</span>
<span class="token comment">//                         &quot;name&quot;: &quot;2-2-1&quot;,</span>
<span class="token comment">//                         &quot;parent&quot;: &quot;2-2&quot;,</span>
<span class="token comment">//                         &quot;children&quot;: []</span>
<span class="token comment">//                     }</span>
<span class="token comment">//                 ]</span>
<span class="token comment">//             }</span>
<span class="token comment">//         ]</span>
<span class="token comment">//     }</span>
<span class="token comment">// ]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="树结构展开" tabindex="-1"><a class="header-anchor" href="#树结构展开" aria-hidden="true">#</a> 树结构展开</h2><p>将树结构的数据展开，具体代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//接收一个树结构的数据、子节点的key的名称、一个存放结果的数组作为参数</span>
<span class="token keyword">function</span> <span class="token function">expandTree</span><span class="token punctuation">(</span>tree<span class="token punctuation">,</span> childKey <span class="token operator">=</span> <span class="token string">&#39;children&#39;</span><span class="token punctuation">,</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>tree <span class="token operator">||</span> <span class="token operator">!</span>tree<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   
   <span class="token comment">//遍历树结构</span>
   <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> tree<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
      <span class="token comment">//如果子节点存在并且子节点包含其他节点</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">[</span>childKey<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> item<span class="token punctuation">[</span>childKey<span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//递归调用此方法</span>
            <span class="token function">expandTree</span><span class="token punctuation">(</span>item<span class="token punctuation">[</span>childKey<span class="token punctuation">]</span><span class="token punctuation">,</span> childKey<span class="token punctuation">,</span> list<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">return</span> list
<span class="token punctuation">}</span>

<span class="token comment">// 使用</span>
<span class="token comment">// 这里使用已经转换为树结构的数据 listToTree</span>
<span class="token keyword">const</span> treeToList <span class="token operator">=</span> <span class="token function">expandTree</span><span class="token punctuation">(</span>listToTree<span class="token punctuation">,</span><span class="token string">&#39;children&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>treeToList<span class="token punctuation">)</span>
<span class="token comment">//输出：</span>
<span class="token comment">// [</span>
<span class="token comment">//     {name: &#39;1&#39;, children: Array(3)},</span>
<span class="token comment">//     {name: &#39;1-1&#39;, parent: &#39;1&#39;, children: Array(1)},</span>
<span class="token comment">//     {name: &#39;1-1-1&#39;, parent: &#39;1-1&#39;, children: Array(0)},</span>
<span class="token comment">//     {name: &#39;1-2&#39;, parent: &#39;1&#39;, children: Array(1)},</span>
<span class="token comment">//     {name: &#39;1-2-1&#39;, parent: &#39;1-2&#39;, children: Array(0)}</span>
<span class="token comment">//     {name: &#39;1-3&#39;, parent: &#39;1&#39;, children: Array(0)},</span>
<span class="token comment">//     {name: &#39;2&#39;, parent: null, children: Array(2)},</span>
<span class="token comment">//     {name: &#39;2-1&#39;, parent: &#39;2&#39;, children: Array(1)},</span>
<span class="token comment">//     {name: &#39;2-1-1&#39;, parent: &#39;2-1&#39;, children: Array(1)},</span>
<span class="token comment">//     {name: &#39;2-1-1-1&#39;, parent: &#39;2-1-1&#39;, children: Array(0)},</span>
<span class="token comment">//     {name: &#39;2-2&#39;, parent: &#39;2&#39;, children: Array(1)},</span>
<span class="token comment">//     {name: &#39;2-2-1&#39;, parent: &#39;2-2&#39;, children: Array(0)}</span>
<span class="token comment">// ]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","12.html.vue"]]);export{r as default};
