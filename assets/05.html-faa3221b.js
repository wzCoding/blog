import{_ as n,o as s,c as a,d as e}from"./app-998d52ba.js";const p={},t=e(`<h1 id="打包优化" tabindex="-1"><a class="header-anchor" href="#打包优化" aria-hidden="true">#</a> 打包优化</h1><p>webpack 为我们构建现代化的前端页面提供了十分巨大的帮助。然而随着页面功能越来越复杂，项目体积越来越庞大时，webpack 的打包时间也会变得越来越长，打包体积也会越来越大，长时间的构建和大体积的文件会造成一些效率与性能上的问题。所以我们有必要了解一些 webpack 打包优化的技巧。</p><h2 id="优化技巧" tabindex="-1"><a class="header-anchor" href="#优化技巧" aria-hidden="true">#</a> 优化技巧</h2><p>可以结合 webpack 配置文件的打包配置及项目的实际情况来做针对性的优化，下面将列举出一些常用的 webpack 优化技巧。</p><h3 id="缩小搜寻范围" tabindex="-1"><a class="header-anchor" href="#缩小搜寻范围" aria-hidden="true">#</a> 缩小搜寻范围</h3><ul><li>优化 loader 配置：在 loader 配置中使用 <code>include</code> 或者 <code>exclude</code> 属性来包括/排除需要解析的文件。<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
             <span class="token comment">// 如果项目源码中只有 js 文件就不要写成 /\\.jsx?$/，缩小匹配范围</span>
             <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
             <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;babel-loader&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
             <span class="token comment">// __dirname 表示当前工作目录，也就是项目根目录</span>
             <span class="token comment">// 只对项目根目录下的 src 目录中的文件采用 babel-loader 解析</span>
             <span class="token literal-property property">include</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
             <span class="token comment">// 也可以使用 exclude 属性来排除不需要解析的目录</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>优化 resolve.module 配置：确定模块的查找目录，避免多层查找（webpack 的模块查找机制是从 <code>./node_modules</code> 目录下开始查找，如果没找到再去上一层的 <code>../node_modules</code> 查找，还是没有找到的情况下再去 <code>../../node_modules</code> 查找）。<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token comment">// 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤</span>
       <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">[</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;node_modules&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
 <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>优化 resolve.mainFields 配置：确定第三方模块的入口文件字段，避免多次搜索，resolve.mainFields 的默认值与 target 的配置有关： <ul><li>当 target 为 web 或者 webworker 时，值是 <code>[&quot;browser&quot;, &quot;module&quot;, &quot;main&quot;]</code></li><li>当 target 为其它情况时，值是 <code>[&quot;module&quot;, &quot;main&quot;]</code></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token comment">// 只采用 main 字段作为入口文件描述字段，以减少搜索步骤</span>
       <span class="token literal-property property">mainFields</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>优化 resolve.alias 配置：设置路径别名，减少解析时间。<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token comment">// 使用 alias 把设置路径别名，减少耗时的递归解析操作</span>
       <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>优化 resolve.extensions 配置：减少文件类型后缀，缩小匹配范围。<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token comment">// 尽可能的减少后缀尝试的可能性</span>
       <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;js&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;json&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="合理利用缓存" tabindex="-1"><a class="header-anchor" href="#合理利用缓存" aria-hidden="true">#</a> 合理利用缓存</h3><p>合理的利用缓存能够大幅度的提升打包的速度。webpack 在启动打包流程时会经历一系列的解析、编译的步骤，我们可以将这些步骤中生成的一些资源缓存起来，当再次编译时，可以直接利用这些缓存资源从而提升打包编译的效率。</p><p>使用缓存的方式有以下几种：</p><ul><li>使用 <code>cache</code> 属性设置缓存：<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">cache</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token comment">// 缓存生成的 webpack 模块和 chunk，改善构建速度。</span>
       <span class="token comment">// 与 cache: true 效果相同</span>
       <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;filesystem&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>使用 cache-loader 设置缓存：<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
             <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
             <span class="token comment">//设置解析文件的范围</span>
             <span class="token literal-property property">include</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
             <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                   <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&quot;cache-loader&quot;</span><span class="token punctuation">,</span>
                   <span class="token literal-property property">options</span><span class="token operator">:</span><span class="token punctuation">{</span>
                      <span class="token comment">// 指定缓存文件存放的目录，默认目录是 &#39;node_modules/.cache/webpack&#39;</span>
                      <span class="token literal-property property">cacheDirectory</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;.cache&quot;</span><span class="token punctuation">)</span>
                   <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
             <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>使用 <code>babel-loader</code> 时开启缓存：<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
             <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
             <span class="token comment">//设置解析文件的范围</span>
             <span class="token literal-property property">include</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
             <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                   <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&quot;babel-loader&quot;</span><span class="token punctuation">,</span>
                   <span class="token literal-property property">options</span><span class="token operator">:</span><span class="token punctuation">{</span>
                      <span class="token comment">// 指定缓存文件存放的目录，默认目录是 &#39;node_modules/.cache/babel-loader&#39;</span>
                      <span class="token literal-property property">cacheDirectory</span><span class="token operator">:</span> <span class="token boolean">true</span>
                   <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
             <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>使用 <code>terser-webpack-plugin</code> 开启缓存：<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
       <span class="token keyword">new</span> <span class="token class-name">TerserWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token comment">//开启压缩插件的缓存设置</span>
          <span class="token literal-property property">cache</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
       <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="使用-dllplugin" tabindex="-1"><a class="header-anchor" href="#使用-dllplugin" aria-hidden="true">#</a> 使用 DLLPlugin</h3><p>DLL 的含义是 <strong>动态链接库</strong>，一个动态链接库中可以包含给其他模块调用的函数和数据。由此我们就可以很容易的想到将那些稳定的、不需要重复编译的第三放库设置为 DLL，这样就可以在 webpack 启动时编译一次，之后就不再需要编译，而是直接从 DLL 中获取，从而大幅提升构建速度了。</p><p>基于以上的想法，我们可以使用 DLLPlugin 和 DllReferencePlugin，它可以帮助我们完成 DLL 的设置和使用：</p><ul><li>设置 DLL：设置 DLL 时会生成 <code>manifest.json</code> 文件，此文件描述了当前的 DLL 中包含哪些模块以及模块的路径和名称。（DLL 需要先单独打包构建然后才能给项目中的 webpack 配置使用，下面将以 vue 为例来构建 DLL）。<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> DllPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack/lib/DllPlugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 入口文件</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token comment">// 把 vue 相关模块的放到一个单独的动态链接库</span>
       <span class="token literal-property property">vue</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vue&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;vue-router&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token comment">// 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，</span>
       <span class="token comment">// 也就是 entry 中配置的 vue</span>
       <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;[name].dll.js&#39;</span><span class="token punctuation">,</span>
       <span class="token comment">// 输出的文件都放到 dist 目录下</span>
       <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token comment">// 存放动态链接库的全局变量名称，例如对应 vue 来说就是 _dll_vue</span>
       <span class="token comment">// 之所以在前面加上 _dll_ 是为了防止全局变量冲突</span>
       <span class="token literal-property property">library</span><span class="token operator">:</span> <span class="token string">&#39;_dll_[name]&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
       <span class="token comment">// 使用 DllPlugin</span>
       <span class="token keyword">new</span> <span class="token class-name">DllPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token comment">// 动态链接库的全局变量名称，需要和 output.library 中保持一致</span>
          <span class="token comment">// 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值</span>
          <span class="token comment">// 例如 vue.manifest.json 中就有 &quot;name&quot;: &quot;_dll_vue&quot;</span>
          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;_dll_[name]&#39;</span><span class="token punctuation">,</span>
          <span class="token comment">// 描述动态链接库的 manifest.json 文件输出时的文件名称</span>
          <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;[name].manifest.json&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>使用 DLL：将生成的 <code>manifest.json</code> 文件路径作为参数传递给 DllReferencePlugin。<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> DllReferencePlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack/lib/DllReferencePlugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
       <span class="token comment">// 告诉 Webpack 使用了哪些动态链接库</span>
       <span class="token keyword">new</span> <span class="token class-name">DllReferencePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token comment">// 描述 vue 动态链接库的文件内容</span>
          <span class="token literal-property property">manifest</span><span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./dist/vue.manifest.json&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="使用多线程打包" tabindex="-1"><a class="header-anchor" href="#使用多线程打包" aria-hidden="true">#</a> 使用多线程打包</h3><p>webpack 在解析与编译文件时会产生大量的计算任务，由于 JS 本身是单线程执行的，这些数量庞大的计算任务就会非常耗时从而减慢打包速度，因此我们可以使用thread-loader 来开启多线程打包，将计算任务放在其他线程执行从而提升打包速度。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
         <span class="token punctuation">{</span>
            <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">include</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
               <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&quot;thread-loader&quot;</span><span class="token punctuation">,</span>
               <span class="token comment">// 有同样配置的 loader 会共享一个 worker 池，thread-loader 必须放在首位</span>
               <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                  <span class="token comment">// 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，</span>
                  <span class="token comment">// 在 require(&#39;os&#39;).cpus() 是 undefined 时回退至 1</span>
                  <span class="token literal-property property">workers</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>

                  <span class="token comment">// 一个 worker 进程中并行执行工作的数量</span>
                  <span class="token comment">// 默认为 20</span>
                  <span class="token literal-property property">workerParallelJobs</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>

                  <span class="token comment">// 额外的 node.js 参数</span>
                  <span class="token literal-property property">workerNodeArgs</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;--max-old-space-size=1024&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

                  <span class="token comment">// 允许重新生成一个僵死的 work 池</span>
                  <span class="token comment">// 这个过程会降低整体编译速度</span>
                  <span class="token comment">// 并且开发环境应该设置为 false</span>
                  <span class="token literal-property property">poolRespawn</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

                  <span class="token comment">// 闲置时定时删除 worker 进程</span>
                  <span class="token comment">// 默认为 500（ms）</span>
                  <span class="token comment">// 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在</span>
                  <span class="token literal-property property">poolTimeout</span><span class="token operator">:</span> <span class="token number">2000</span><span class="token punctuation">,</span>

                  <span class="token comment">// 池分配给 worker 的工作数量</span>
                  <span class="token comment">// 默认为 200</span>
                  <span class="token comment">// 降低这个数值会降低总体的效率，但是会提升工作分布更均一</span>
                  <span class="token literal-property property">poolParallelJobs</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>

                  <span class="token comment">// 池的名称</span>
                  <span class="token comment">// 可以修改名称来创建其余选项都一样的池</span>
                  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;my-pool&quot;</span>
               <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// 一些耗时的 loader</span>
            <span class="token string">&#39;babel-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;sass-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="压缩代码" tabindex="-1"><a class="header-anchor" href="#压缩代码" aria-hidden="true">#</a> 压缩代码</h3><p>我们在开发环境下编写的代码为了清晰与美观可能会存在大量的空格与空行，这些空白的地方在文件中也会占据一定的体积从而在打包编译时造成不必要的空间浪费。此时我们可以使用 TerserWebpackPlugin 来压缩我们的代码从而减小文件体积，提升打包速度。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> TerserPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;terser-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// webpack 优化选项 </span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 开启压缩</span>
    <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 具体压缩方式</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// 使用 TerserPlugin 压缩文件</span>
      <span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js(\\?.*)?$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token comment">// 设置压缩文件的范围</span>
        <span class="token literal-property property">include</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// 开启多进程压缩</span>
        <span class="token literal-property property">parallel</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-cdn" tabindex="-1"><a class="header-anchor" href="#使用-cdn" aria-hidden="true">#</a> 使用 CDN</h3><p>在我们的项目中，一些第三方库往往是稳定的，不需要经过我们再次打包编译，而且如果你不想将这些第三方库设置为 DLL，那么也可以使用 CDN 的方式来引用这些第三放库。</p><blockquote><p>CDN：内容分发网络，即在不同位置的服务器上缓存资源，将离用户最近的服务器上的资源发送给用户，从而提高响应速度，降低网络堵塞。</p></blockquote><p>使用 CDN 需要配合 <code>externals</code> 属性来进行设置：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 使用 externals 选项来告诉 webpack 不要将模块中的这些依赖打包到最终 bundle 产物中去，</span>
  <span class="token comment">// 而是在 CDN 中引用它们</span>
  <span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// externals 配置对象的 key 对应模块中引入的依赖的名称</span>
    <span class="token comment">// externals 配置对象的 value 对应 CDN 提供的全局对象的名称</span>
    <span class="token string-property property">&quot;vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Vue&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;vue-router&quot;</span><span class="token operator">:</span> <span class="token string">&quot;VueRouter&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 在 index.html 文件中通过 script 标签引用它们</span>
<span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">&quot;https://cdn.jsdelivr.net/npm/vue@3.4.29/dist/vue.global.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">&quot;https://cdn.jsdelivr.net/npm/vue-router@4.2.5/dist/vue-router.global.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拆分-chunks" tabindex="-1"><a class="header-anchor" href="#拆分-chunks" aria-hidden="true">#</a> 拆分 CHUNKS</h3><p>在 webpack 输出打包结果时，可能会将所有依赖打包为一个 chunks，这会导致 chunks 体积过大从而影响解析加载的速度，我们可以使用 webpack 的 <code>optimization.splitChunks</code> 属性来设置拆分 chunk，减小 chunks 的体积。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// webpack 优化选项</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 拆分 chunks 设置</span>
    <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 设置要拆分的 chunk 类型</span>
      <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token string">&#39;async&#39;</span><span class="token punctuation">,</span>
      <span class="token comment">// 设置拆分的 chunk 的最小体积</span>
      <span class="token literal-property property">minSize</span><span class="token operator">:</span> <span class="token number">20000</span><span class="token punctuation">,</span>
      <span class="token comment">// 设置拆分后剩余的最小 chunk 体积限制来避免大小为零的模块</span>
      <span class="token comment">// 开发模式下默认为 0，其他情况下为 minSize 的值</span>
      <span class="token literal-property property">minRemainingSize</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token comment">// 拆分前必须共享模块的最小 chunk 数</span>
      <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token comment">// 按需加载 chunk 时的最大并行请求数</span>
      <span class="token literal-property property">maxAsyncRequests</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
      <span class="token comment">// 起始入口点的最大并行请求数</span>
      <span class="token literal-property property">maxInitialRequests</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
      <span class="token comment">// 强制执行拆分的体积阈值</span>
      <span class="token literal-property property">enforceSizeThreshold</span><span class="token operator">:</span> <span class="token number">50000</span><span class="token punctuation">,</span>
      <span class="token comment">// 设置 chunk 拆分的缓存组</span>
      <span class="token literal-property property">cacheGroups</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 缓存组中拆分的 chunk 名称</span>
        <span class="token literal-property property">defaultVendors</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token comment">// 拆分的 chunk 中要匹配的模块</span>
          <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\\\/]node_modules[\\\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
          <span class="token comment">// chunk 缓存组的优先级，优先级越高越先考虑优化</span>
          <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">,</span>
          <span class="token comment">// 是否复用已经拆分过的模块</span>
          <span class="token literal-property property">reuseExistingChunk</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// 缓存组中拆分的 chunk 默认名称</span>
        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
          <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">20</span><span class="token punctuation">,</span>
          <span class="token literal-property property">reuseExistingChunk</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="按需加载模块" tabindex="-1"><a class="header-anchor" href="#按需加载模块" aria-hidden="true">#</a> 按需加载模块</h3><p>我们在浏览器中访问网页时，往往最先加载的是网站的首页，此时我们可以先加载网站首页所需要的资源，而剩余的其他页面的资源可以等到我们需要时在进行加载。 实现按需加载的关键是使用动态导入语句 <code>import()</code> 以及魔法注释。下面以 vue-router 为例来实现按需加载。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHashHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>
<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">&#39;./Home.vue&#39;</span>

<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> Home
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/about&#39;</span><span class="token punctuation">,</span> <span class="token comment">//当匹配到 about 路由时在加载 about 模块</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;about&#39;</span><span class="token punctuation">,</span>
    <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName: &quot;about&quot; */</span> <span class="token string">&#39;./about.vue&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31),o=[t];function l(c,i){return s(),a("div",null,o)}const u=n(p,[["render",l],["__file","05.html.vue"]]);export{u as default};
