import{_ as e,r as t,o as p,c as o,e as n,f as s,b as c,d as l}from"./app-638e6571.js";const i={},u=n("h1",{id:"foreach-原理",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#foreach-原理","aria-hidden":"true"},"#"),s(" forEach 原理")],-1),r=n("p",null,[n("code",null,"forEach()"),s(" 方法是我们在处理数组使经常用到的遍历方法，它相较于其他循环方法可以使代码更加简洁，下面会探究 "),n("code",null,"forEach()"),s(" 方法的实现原理。")],-1),k=n("h2",{id:"实现原理",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#实现原理","aria-hidden":"true"},"#"),s(" 实现原理")],-1),d={href:"https://262.ecma-international.org/13.0/?_gl=1*qwct4d*_ga*MTgzNjYzMjg5Ny4xNzEzMjgwNTU3*_ga_TDCK4DWEPP*MTcxNjY0OTQ0NC4yLjEuMTcxNjY0OTYxOC4wLjAuMA..",target:"_blank",rel:"noopener noreferrer"},m=n("code",null,"forEach()",-1),v=l(`<blockquote><p>When the forEach method is called, the following steps are taken:</p><ol><li>Let O be ? ToObject(this value).</li><li>Let len be ? LengthOfArrayLike(O).</li><li>If IsCallable(callbackfn) is false, throw a TypeError exception.</li><li>Let k be 0.</li><li>Repeat, while k &lt; len，</li></ol><ul><li>Let Pk be ! ToString(𝔽(k)).</li><li>Let kPresent be ? HasProperty(O, Pk).</li><li>If kPresent is true, then</li><li>Let kValue be ? Get(O, Pk).</li><li>Perform ? Call(callbackfn, thisArg, « kValue, 𝔽(k), O »).</li><li>Set k to k + 1.</li></ul><ol start="6"><li>Return undefined.</li></ol></blockquote><h2 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现" aria-hidden="true">#</a> 具体实现</h2><p>上面引用的一系列步骤详细说明了 <code>forEach()</code> 的实现标准，下面按照这个标准来实现一个 <code>forEach()</code> 方法。</p><p>具体实现代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myForEach</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//第一步，获取 this 上下文，并将之转换为对象，这里由于 this 已经是对象了，所以跳过这个步骤</span>

    <span class="token comment">//第二步，获取并保存数组的长度</span>
    <span class="token keyword">let</span> len <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>length 
    
    <span class="token comment">//第三步，判断传入的回调函数是否是 function 类型，不是则抛出错误</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> callback <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>callback<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> is not a function</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//第四步，设置一个循环变量 k，初始值为 0</span>
    <span class="token keyword">let</span> k <span class="token operator">=</span> <span class="token number">0</span>
    
    <span class="token comment">//第五步，使用 while 循环，循环条件为 k &lt; len（数组长度）</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span> k <span class="token operator">&lt;</span> len <span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token comment">//将 k 转换为字符串类型，用 pk 保存</span>
       <span class="token keyword">let</span> Pk <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span>
       <span class="token comment">//这一步将数组看作对象，判断 Pk（数组索引）是否存在</span>
       <span class="token keyword">let</span> kPresent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>Pk<span class="token punctuation">)</span>
       <span class="token comment">//这一步判断如果 kPresent 存在，则继续执行</span>
       <span class="token keyword">if</span><span class="token punctuation">(</span>kPresent<span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token comment">// 获取 Pk 索引对应的值</span>
          <span class="token keyword">let</span> kValue <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">[</span>Pk<span class="token punctuation">]</span>
          <span class="token comment">// 调用传入的回调方法，并传入数组当前项，数组当前索引，数组本身 参数</span>
          <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> kValue<span class="token punctuation">,</span> k<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
       <span class="token punctuation">}</span>
       <span class="token comment">// 循环变量增加</span>
       k<span class="token operator">++</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//第六步，返回 undefined</span>
    <span class="token keyword">return</span> <span class="token keyword">undefined</span>
<span class="token punctuation">}</span>
<span class="token comment">// 使用</span>
<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span>
arr<span class="token punctuation">.</span><span class="token function">myForEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span>index<span class="token punctuation">,</span>self</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 输出：</span>
<span class="token comment">//1</span>
<span class="token comment">// 0</span>
<span class="token comment">// (5) [1, 2, 3, 4, 5]</span>
<span class="token comment">// 2</span>
<span class="token comment">// 1</span>
<span class="token comment">// (5) [1, 2, 3, 4, 5]</span>
<span class="token comment">// 3</span>
<span class="token comment">// 2</span>
<span class="token comment">// (5) [1, 2, 3, 4, 5]</span>
<span class="token comment">// 4</span>
<span class="token comment">// 3</span>
<span class="token comment">// (5) [1, 2, 3, 4, 5]</span>
<span class="token comment">// 5</span>
<span class="token comment">// 4</span>
<span class="token comment">// (5) [1, 2, 3, 4, 5]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function b(h,f){const a=t("ExternalLinkIcon");return p(),o("div",null,[u,r,k,n("p",null,[n("a",d,[s("ECMA (262)"),c(a)]),s(" 标准中关于 "),m,s(" 的实现步骤如下：")]),v])}const _=e(i,[["render",b],["__file","06.html.vue"]]);export{_ as default};
