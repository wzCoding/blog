import{_ as t,r as p,o as e,c as o,e as n,f as s,b as c,d as l}from"./app-5340994e.js";const i={},u=n("h1",{id:"promise-实现",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#promise-实现","aria-hidden":"true"},"#"),s(" promise 实现")],-1),k=n("h2",{id:"实现标准",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#实现标准","aria-hidden":"true"},"#"),s(" 实现标准")],-1),r=n("code",null,"promise",-1),d={href:"https://promisesaplus.com/",target:"_blank",rel:"noopener noreferrer"},v=l(`<blockquote><p>“promise” is an object or function with a then method whose behavior conforms to this specification.</p><p>“thenable” is an object or function that defines a then method.</p><p>“value” is any legal JavaScript value (including undefined, a thenable, or a promise).</p><p>“exception” is a value that is thrown using the throw statement.</p><p>“reason” is a value that indicates why a promise was rejected.</p></blockquote><p>由以上规范的描述可知， <code>promise</code> 是一个具有 <code>then()</code> 方法的对象</p><h2 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现" aria-hidden="true">#</a> 具体实现</h2><p>下面是按照 Promises/A+ 规范来实现的 <code>promise</code> 方法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code> <span class="token comment">//定义 promise 的三种状态，这三种状态之间是互斥的</span>
<span class="token keyword">const</span> <span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">//还在执行或者挂起状态</span>
<span class="token keyword">const</span> <span class="token constant">FULFILLED</span> <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">//执行成功状态</span>
<span class="token keyword">const</span> <span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">//执行失败状态</span>

<span class="token comment">//判断一个值是否是 promise</span>
<span class="token keyword">function</span> <span class="token function">isPromiseLike</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">//根据 promise/A+ 规范判断传入的值是否是对象/函数，并且它是否具有 then 方法</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> value<span class="token punctuation">.</span>then <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> value<span class="token punctuation">.</span>then <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">//模拟微任务，将 promise 执行的回调放入微任务队列中</span>
<span class="token keyword">function</span> <span class="token function">microTask</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">//判断浏览器环境</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span>MutationObserver <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> MutationObserver <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> tag <span class="token operator">=</span> <span class="token string">&#39;div&#39;</span>
      <span class="token keyword">const</span> ob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>
      <span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span>
      ob<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">attributes</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
      el<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>name <span class="token operator">=</span> tag
   <span class="token punctuation">}</span>
   <span class="token comment">//判断 node 环境</span>
   <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>process <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> process <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> process<span class="token punctuation">.</span>nextTick <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   <span class="token comment">//其他环境</span>
   <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">myPromise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

   <span class="token comment">//这里通过闭包来模拟私有属性</span>
   <span class="token keyword">let</span> state <span class="token operator">=</span> <span class="token constant">PENDING</span> <span class="token comment">//promise 的初始状态设置为 &#39;pending&#39;</span>
   <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token keyword">undefined</span> <span class="token comment">//promise 的初始结果不确定，设置为 undefined</span>
   <span class="token keyword">const</span> handlers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">//promise 的 then 方法中收集相关传入参数的数组集合</span>

   <span class="token comment">// promise 改变状态的方法</span>
   <span class="token keyword">const</span> <span class="token function-variable function">stateChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">next<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">//根据 promise/A+ 规范，promise 状态一旦改变，就确定下来不会再变化了</span>
      <span class="token comment">//这里对 state 进行判断，防止重复触发改变 promise 的状态</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">!==</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
      state <span class="token operator">=</span> next
      result <span class="token operator">=</span> value
      <span class="token comment">//当状态变化时执行此方法</span>
      <span class="token function">onStateChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   <span class="token comment">//promise 成功回调</span>
   <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">stateChange</span><span class="token punctuation">(</span><span class="token constant">FULFILLED</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   <span class="token comment">//promise 失败回调</span>
   <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">stateChange</span><span class="token punctuation">(</span><span class="token constant">REJECTED</span><span class="token punctuation">,</span> reason<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   <span class="token comment">//当 promise 状态发生改变时执行的方法</span>
   <span class="token keyword">const</span> <span class="token function-variable function">handleStateChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">callback<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">//这里执行 then 方法中传入的参数要分三种情况：</span>
      <span class="token comment">//1.传入的参数是函数 2.传入的参数是 promise 3.传入的参数不是函数</span>
      <span class="token function">microTask</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>callback <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> callback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               <span class="token keyword">try</span> <span class="token punctuation">{</span>
                  <span class="token comment">//这里使用 try / catch 处理前两种情况</span>
                  <span class="token comment">//将promise的执行结果传入回调函数中，获取回调函数的返回结果</span>
                  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
                  <span class="token comment">//判断结果是否是 promise</span>
                  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPromiseLike</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">//是 promise 则调用它的 then 方法</span>
                        res<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
                  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token comment">//不是 promise 则直接将结果 resolve</span>
                        <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
                  <span class="token punctuation">}</span>
               <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">//在这里捕获回调执行的错误情况</span>
                  <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
               <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
               <span class="token comment">//这里处理传入参数不是函数/不是promise的情况</span>
               <span class="token keyword">const</span> handler <span class="token operator">=</span> state <span class="token operator">===</span> <span class="token constant">FULFILLED</span> <span class="token operator">?</span> resolve <span class="token operator">:</span> reject
               <span class="token function">handler</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   <span class="token comment">//promise 状态变化执行的方法</span>
   <span class="token keyword">const</span> <span class="token function-variable function">onStateChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">//如果 promise 的状态还在执行，没有发生变化，就不应该触发 then 方法的回调</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
      <span class="token comment">//通过 while 循环从 保存 then 方法的相关参数的集合中取出每一个参数集合执行 </span>
      <span class="token comment">//这里因为 then 方法可以支持链式调用，所以用数组来存储，通过遍历来取出</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>handlers<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token punctuation">{</span> onFulfilled<span class="token punctuation">,</span> onRejected<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject <span class="token punctuation">}</span> <span class="token operator">=</span> handlers<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment">//当 promise 执行成功，状态改变为 &#39;fulfilled&#39; 时</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token constant">FULFILLED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               <span class="token function">handleStateChange</span><span class="token punctuation">(</span>onFulfilled<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//当 promise 执行失败，状态改变为 &#39;rejected&#39; 时</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>state <span class="token operator">===</span> <span class="token constant">REJECTED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               <span class="token function">handleStateChange</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
   <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   <span class="token comment">//promise 的 then 方法，这里是关键，根据 promise/A+ 规范 then 必须返回一个 promise</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">then</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">onFulfilled<span class="token punctuation">,</span> onRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">myPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">//这里由于我们无法确定 promise 在什么时候能完成（即不知道 promise 的状态在何时发生改变），</span>
            <span class="token comment">//所以将 then 方法中的相关回调函数全部收集起来，等待状态变更时调用</span>
            handlers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
               onFulfilled<span class="token punctuation">,</span>
               onRejected<span class="token punctuation">,</span>
               resolve<span class="token punctuation">,</span>
               reject
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token comment">//promise 状态变更时会执行此方法的逻辑</span>
            <span class="token function">onStateChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   
   <span class="token comment">//catch 方法实际上是只穿传入了 onRejected 的 then 方法</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">catch</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">onRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> onRejected<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   
   <span class="token comment">//finally 方法没有参数，并且返回一个与原 promise 状态相同的 promise 对象</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">finally</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
               <span class="token keyword">return</span> myPromise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                  <span class="token keyword">return</span> value
               <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
               <span class="token keyword">return</span> myPromise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                  <span class="token keyword">throw</span> reason
               <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
      <span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//myPromise 的静态方法 resolve</span>
myPromise<span class="token punctuation">.</span><span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">myPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPromiseLike</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//myPromise 的静态方法 reject</span>
myPromise<span class="token punctuation">.</span><span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">myPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//使用</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">myPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
   <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
   <span class="token comment">//setTimeout(() =&gt; resolve(1), 1000)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
   <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token number">123</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
   <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
      <span class="token keyword">return</span> res <span class="token operator">*</span> <span class="token number">2</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
   <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
      <span class="token keyword">return</span> res <span class="token operator">*</span> <span class="token number">2</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

<span class="token comment">//输出：</span>
<span class="token comment">// ok 1</span>
<span class="token comment">// ok 123</span>
<span class="token comment">// ok 246</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function m(b,f){const a=p("ExternalLinkIcon");return e(),o("div",null,[u,k,n("p",null,[r,s(" 经常用来处理异步任务，它的实现标准在 "),n("a",d,[s("Promises/A+"),c(a)]),s(" 规范中有明确描述：")]),v])}const h=t(i,[["render",m],["__file","08.html.vue"]]);export{h as default};
