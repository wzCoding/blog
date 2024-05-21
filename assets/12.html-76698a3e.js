import{_ as c,r as p,o as l,c as r,b as a,w as o,f as e,d as n,e as s}from"./app-0b9f3789.js";const u={},d=e('<h1 id="执行上下文" tabindex="-1"><a class="header-anchor" href="#执行上下文" aria-hidden="true">#</a> 执行上下文</h1><p>执行上下文是 Javascript 中一个十分重要的概念，当我们运行一段 JS 代码时，这段代码实际上就运行在执行上下文中，理解执行上下文的相关知识可以帮助我们更好的理解 JS 代码是如何运行的</p><h2 id="什么是执行上下文" tabindex="-1"><a class="header-anchor" href="#什么是执行上下文" aria-hidden="true">#</a> 什么是执行上下文</h2><p>执行上下文是指在执行 JS 代码时，JS 解释器需要的所有信息。它包括变量、函数声明、作用域和 <strong>this</strong> 关键字的值，可以理解为执行上下文是在执行 JS 代码前做好了一切准备工作，确保 JS 代码可以顺利执行</p><h2 id="执行上下文的分类" tabindex="-1"><a class="header-anchor" href="#执行上下文的分类" aria-hidden="true">#</a> 执行上下文的分类</h2><p>执行上下文可以分为 <strong>全局执行上下文</strong> 和 <strong>函数执行上下文</strong></p><h3 id="全局执行上下文" tabindex="-1"><a class="header-anchor" href="#全局执行上下文" aria-hidden="true">#</a> 全局执行上下文</h3><p><strong>全局执行上下文</strong> 是 JS 代码运行时的环境。它是为运行代码主体而创建的执行上下文，也就是说它是为那些存在于函数之外的任何代码而创建的。全局执行上下文只有一个，它在 JS 代码开始执行时创建，并在所有代码执行完毕后销毁。全局执行上下文包含了全局对象，以及一些全局变量和函数。当 JS 代码运行时，它实际上是运行在全局执行上下文中</p><h3 id="函数执行上下文" tabindex="-1"><a class="header-anchor" href="#函数执行上下文" aria-hidden="true">#</a> 函数执行上下文</h3><p><strong>函数执行上下文</strong>是在函数被调用时创建的。当函数被调用时，JS 引擎会创建一个新的执行上下文，并将其压入<strong>执行栈</strong>中。在函数执行完毕后，该执行上下文会被弹出栈。每个函数都有自己的执行上下文，它包含了函数内部的变量、函数参数、函数声明等信息。函数执行上下文与全局执行上下文不同，它是为了执行特定的函数而创建的，而全局执行上下文是为运行代码主体而创建的</p>',10),k=n("p",null,"执行栈：也称为调用栈，是 JS 引擎用来跟踪函数调用的一种数据结构。它是一个先进后出（LIFO）的栈结构，用于存储执行上下文。当 JS 引擎执行代码时，它会创建一个全局执行上下文并将其压入执行栈中。每当一个函数被调用时，JS 引擎会创建一个新的执行上下文并将其压入执行栈的顶部。当函数返回时，该执行上下文会被弹出栈。这样，JS 引擎就能够跟踪函数调用的顺序，并在函数返回时恢复正确的执行上下文",-1),v=e(`<h2 id="执行上下文的创建" tabindex="-1"><a class="header-anchor" href="#执行上下文的创建" aria-hidden="true">#</a> 执行上下文的创建</h2><p>执行上下文可以分为以下几步：</p><ul><li>进行 <strong>this</strong> 绑定，确定 <strong>this</strong> 的指向</li><li>创建 <strong>词法环境</strong> 组件</li><li>创建 <strong>变量环境</strong> 组件</li></ul><p>下面会对上述3个步骤进行简要分析</p><h3 id="this-绑定" tabindex="-1"><a class="header-anchor" href="#this-绑定" aria-hidden="true">#</a> this 绑定</h3><p>在全局执行上下文中，<strong>this</strong> 指向全局对象（在浏览器中指向全局对象 <code>window</code>，在 nodeJs 中指向全局对象 <code>global</code>，在严格模式下则是 <code>undefined</code>）</p><p>在函数执行上下文中，<strong>this</strong> 的指向则取决于函数是如何被调用的（可以理解为谁调用了这个函数，那么这个函数的 <strong>this</strong> 就指向了谁）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&quot;Jhon&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hello! </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//(this指向全局对象window) Hello! Jhon</span>

<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&quot;Mike&quot;</span><span class="token punctuation">,</span>
    <span class="token function-variable function">action</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hi! </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
person<span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//(this指向变量对象person) Hi! Mike</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的 this 指向的伪代码就像这样</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>GlobalExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>        <span class="token comment">//全局执行上下文</span>
  <span class="token literal-property property">ThisBinding</span><span class="token operator">:</span> window<span class="token punctuation">,</span>           
  <span class="token comment">// LexicalEnvironment: {},     // 全局词法环境   </span>
  <span class="token comment">// VariableEnvironment: {}     // 变量环境</span>
<span class="token punctuation">}</span>

FunctionExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>      <span class="token comment">//函数执行上下文</span>
  <span class="token literal-property property">ThisBinding</span><span class="token operator">:</span> person<span class="token punctuation">,</span>
  <span class="token comment">// LexicalEnvironment: {},    // 函数词法环境</span>
  <span class="token comment">// VariableEnvironment: {}    // 变量环境</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),m=n("p",null,[n("strong",null,"this"),s(" 的指向并非总是固定的，JS 中还提供了一些方法（"),n("code",null,"call"),s("、"),n("code",null,"apply"),s("、"),n("code",null,"bind"),s(" 等）使我们可以更改 this 的指向，从而满足开发的需要")],-1),b=e(`<h3 id="词法环境" tabindex="-1"><a class="header-anchor" href="#词法环境" aria-hidden="true">#</a> 词法环境</h3><p><strong>词法环境</strong>（Lexical Environment）是由环境记录器和外部环境引用两个内部组件组成的</p><ul><li>环境记录器（EnvironmentRecord）：定义的变量与函数都存储在这里</li><li>外部环境引用（outer）：可以访问外部的词法环境</li></ul><p>词法环境是一个抽象的概念，用于描述当前代码的运行环境。它是一个包含了标识符绑定（Identifier Bindings）的映射结构，这些绑定由变量、函数声明、函数形参和 catch 语句的异常对象组成。词法环境有两种类型：<strong>全局环境</strong> 和 <strong>函数环境</strong></p><h4 id="全局环境" tabindex="-1"><a class="header-anchor" href="#全局环境" aria-hidden="true">#</a> 全局环境</h4><p>全局环境属于词法环境之一，它的外部词法环境引用为 null。this 指向为全局对象（global object）。拥有由用户定义的全局变量以及一些内置对象，例如 <code>Math</code>、<code>String</code> 和 <code>Array</code> 等</p><h4 id="函数环境" tabindex="-1"><a class="header-anchor" href="#函数环境" aria-hidden="true">#</a> 函数环境</h4><p>函数环境也属于词法环境之一，它的外部词法环境引用为可能是全局环境或者包含了这个函数的外部函数环境。this 指向取决于函数是如何调用的。拥有在函数内部定义的变量，一个 <code>arguments</code> 参数对象（包含了调用该函数时传入的实参）和参数的长度 <code>length</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">add3</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add3</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的词法环境创建的伪代码就像这样：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>GlobalExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>     <span class="token comment">//全局执行上下文</span>
  <span class="token comment">// ThisBinding: &lt;Global Object&gt;,           </span>
  <span class="token literal-property property">LexicalEnvironment</span><span class="token operator">:</span> <span class="token punctuation">{</span>       <span class="token comment">// 全局词法环境</span>
    <span class="token literal-property property">EnvironmentRecord</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">Type</span><span class="token operator">:</span> <span class="token string">&quot;Object&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">// 在这里绑定标识符</span>
      <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token operator">&lt;</span> uninitialized <span class="token operator">&gt;</span><span class="token punctuation">,</span>   <span class="token comment">// let、const声明的变量</span>
      <span class="token literal-property property">add3</span><span class="token operator">:</span> <span class="token operator">&lt;</span> func <span class="token operator">&gt;</span>          <span class="token comment">// 函数声明</span>
    <span class="token punctuation">}</span>
    <span class="token literal-property property">outer</span><span class="token operator">:</span> <span class="token operator">&lt;</span><span class="token keyword">null</span><span class="token operator">&gt;</span>             <span class="token comment">// 全局环境对外部环境的引用为 null           </span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// VariableEnvironment: {}     // 变量环境</span>
<span class="token punctuation">}</span>

FunctionExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>    <span class="token comment">//函数执行上下文</span>
  <span class="token comment">// ThisBinding: &lt;Global Object&gt;,</span>
  <span class="token literal-property property">LexicalEnvironment</span><span class="token operator">:</span> <span class="token punctuation">{</span>               <span class="token comment">// 函数词法环境</span>
    <span class="token literal-property property">EnvironmentRecord</span><span class="token operator">:</span> <span class="token punctuation">{</span>   
      <span class="token literal-property property">Type</span><span class="token operator">:</span> <span class="token string">&quot;Declarative&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">// 在这里绑定标识符</span>
      <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token operator">&lt;</span> uninitialized <span class="token operator">&gt;</span><span class="token punctuation">,</span>           <span class="token comment">// let、const声明的变量</span>
      <span class="token literal-property property">Arguments</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>   <span class="token comment">// arguments对象</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">outer</span><span class="token operator">:</span> <span class="token operator">&lt;</span>GlobalLexicalEnvironment<span class="token operator">&gt;</span>  <span class="token comment">//外部引用为全局词法环境</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// VariableEnvironment: {}    // 变量环境</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量环境" tabindex="-1"><a class="header-anchor" href="#变量环境" aria-hidden="true">#</a> 变量环境</h3><p>变量环境与词法环境类似，但它只包含了由 <code>var</code> 声明的变量</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">&quot;abc&quot;</span>
<span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&quot;Alice&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的变量环境的创建的伪代码就像这样：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>GlobalExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>        <span class="token comment">//全局执行上下文</span>
  <span class="token comment">//ThisBinding: &lt;Global Object&gt;,           </span>
  <span class="token comment">// LexicalEnvironment: {},     // 全局词法环境   </span>
  <span class="token literal-property property">VariableEnvironment</span><span class="token operator">:</span> <span class="token punctuation">{</span>         <span class="token comment">// 变量环境</span>
    <span class="token literal-property property">EnvironmentRecord</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">Type</span><span class="token operator">:</span> <span class="token string">&quot;Object&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">//存储并直接定义 var 变量</span>
      <span class="token literal-property property">str</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token literal-property property">outer</span><span class="token operator">:</span> <span class="token operator">&lt;</span><span class="token keyword">null</span><span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>     
<span class="token punctuation">}</span>

FunctionExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>      <span class="token comment">//函数执行上下文</span>
  <span class="token comment">//ThisBinding: &lt;Global Object&gt;,</span>
  <span class="token comment">// LexicalEnvironment: {},    // 函数词法环境</span>
  <span class="token literal-property property">VariableEnvironment</span><span class="token operator">:</span> <span class="token punctuation">{</span>        <span class="token comment">// 变量环境</span>
     <span class="token literal-property property">EnvironmentRecord</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">Type</span><span class="token operator">:</span> <span class="token string">&quot;Object&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">//存储并直接定义 var 变量</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token literal-property property">outer</span><span class="token operator">:</span> <span class="token operator">&lt;</span><span class="token keyword">null</span><span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由上代码可以看出， <code>var</code> 定义的变量存储于执行上下文的变量环境中，并且直接将其初始化为 <code>undefined</code>，从这里也可以解释开发中遇到的变量提升的现象，而 <code>let</code>、<code>const</code> 所定义的变量则是存储于词法环境中，并没有被初始化，所以就不能在定义之前使用，不存在变量提升。在词法环境中还包含了对外部环境的引用，如果这个被引用的外部环境中又引用了其他的外部环境，就像一条锁链一样对外部环境的引用一直延伸下去，就形成了一条链式引用的结构，这就是我们常说的作用域链。甚至闭包的产生也与此相关</p><h2 id="简要图示" tabindex="-1"><a class="header-anchor" href="#简要图示" aria-hidden="true">#</a> 简要图示</h2>`,18);function h(g,y){const t=p("Minfo"),i=p("Mermaid");return l(),r("div",null,[d,a(t,null,{default:o(()=>[k]),_:1}),v,a(t,null,{default:o(()=>[m]),_:1}),b,a(i,{id:"mermaid-135",code:"eJxLL0osyFAIceIqLk2CsJ91Ln+xsOfZgg4FH083f66UzKLU5JLM/DyQIgUFuLKnrSuebmyAKH6yo+vJju5n09qBClLzUlCUte99NnUDdmUgzPVi/wSglFfwk92Lny9o1NW1e9ox++nuXdiNxyOnq/u0r/tp61K4822SiuyA1NNdU0GGkm6cHcTpLzY0P5+ygguZA3fks2kbsPsPvzSGU+GWYZiDVbseTv9gVw4ReLqu51nHhKcT+kAB83RZ07N5c17sn/FsTufT1m1Pdk8Di4L1P1/b+XRfK8SrIKswgwHDP1hseLFo9dM9O5+270LxJaoIF46gh7jgWWcD0HWQdAGOTDItAQC9acYv"})])}const x=c(u,[["render",h],["__file","12.html.vue"]]);export{x as default};