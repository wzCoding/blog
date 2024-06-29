import{_ as n,o as a,c as s,d as e}from"./app-3272fd37.js";const p={},t=e(`<h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1><p>Webpack 是用于现代 JS 程序的 <strong>静态模块</strong> 打包工具。它主要用于将模块化的 JS 文件打包整合在一起，以便使我们的代码能够运行在浏览器中。除了处理打包 JS 文件之外，Webpack 也能够通过 Loader 处理转换其它资源，为我们的开发工作提供了极大的便利。</p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><p>Webpack 需要在 Node.js 环境下使用，目前 Webpack 已经更新到 webpack 5 版本，其所需的 Node 版本为 <code>10.13.0</code>。</p><h3 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h3><p>首先创建一个工程文件夹，里面包括 <code>index.html</code> 以及 src 子文件夹下的 <code>index.js</code> 文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>demo
<span class="token operator">|</span>- index.html
<span class="token operator">|</span>- src
   <span class="token operator">|</span>- index.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行 <code>npm init</code>，初始化工程文件夹，安装一些必要的 node 依赖包，此时文件夹下会生成 <code>package.json</code> 文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>demo
<span class="token operator">|</span>- package.json
<span class="token operator">|</span>- package-lock.json
<span class="token operator">|</span>- index.html
<span class="token operator">|</span>- src
   <span class="token operator">|</span>- index.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><p>当工程文件夹初始化完成后，就可以安装 webpack 了，执行 <code>npm install webpack webpack-cli -dev</code>。此时 <code>package.json</code> 文件中会出现一条依赖记录。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token property">&quot;webpack&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^5.38.1&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;webpack-cli&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.7.2&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，就可以使用 webpack 相关的功能了。</p><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><p>在安装完成 webpack 相关依赖后，还需要进行部分配置才能使 webpack 正常工作。</p><ul><li>脚本配置：在 <code>package.json</code> 添加 <code>&quot;script&quot;</code> 脚本配置。<div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span><span class="token string">&quot;webpack serve --open&quot;</span><span class="token punctuation">,</span>  <span class="token comment">//启动开发服务器</span>
  <span class="token property">&quot;watch&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack --watch&quot;</span><span class="token punctuation">,</span>    <span class="token comment">//监听代码变化以自动重新打包</span>
  <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack&quot;</span><span class="token punctuation">,</span>  <span class="token comment">//打包代码</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>打包配置：新建一个 <code>webpack.config.js</code> 文件，用来设置适合工程的打包配置。<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">entry</span><span class="token operator">:</span><span class="token string">&#39;./src/index.js&#39;</span><span class="token punctuation">,</span>
   <span class="token literal-property property">devtool</span><span class="token operator">:</span> <span class="token string">&#39;inline-source-map&#39;</span><span class="token punctuation">,</span>
   <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">static</span><span class="token operator">:</span> <span class="token string">&#39;./dist&#39;</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;[name].bundle.js&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token literal-property property">clean</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="相关概念" tabindex="-1"><a class="header-anchor" href="#相关概念" aria-hidden="true">#</a> 相关概念</h2><p>在上面了解了 webpack 的基本使用方法后，还有一些关于 webpack 的重要概念也需要了解。</p><h3 id="chunk" tabindex="-1"><a class="header-anchor" href="#chunk" aria-hidden="true">#</a> chunk</h3><p>chunk 的含义是 <strong>块</strong>，表示在 webpack 打包编译过程中生成的一组有依赖关系的代码块，例如：</p><ul><li>入口 <code>entry</code> 模块的代码</li><li>通过 <code>import()</code> 动态导入的模块代码</li><li>使用 <code>splitChunk</code> 拆分的代码</li></ul><p>chunk 是在打包过程中产生的，不会输出到打包的结果中。</p><h3 id="bundle" tabindex="-1"><a class="header-anchor" href="#bundle" aria-hidden="true">#</a> bundle</h3><p>bundle 的含义是 <strong>包</strong>，是由 webpack 对 chunk 进行进一步处理和优化后生成的最终输出文件。每个 chunk 可能包含多个模块，而每个 bundle 仅对应一个入口点和其所依赖的所有模块打包而成。换而言之，bundle 是打包的最终产物。</p><h3 id="module" tabindex="-1"><a class="header-anchor" href="#module" aria-hidden="true">#</a> module</h3><p>module 的含义是 <strong>模块</strong>，是由我们直接编写的代码，一个模块可能是一个方法、一个组件、一个页面等。在现代化的前端开发方式下，一个完整的页面应用可能会由多个模块组成，不同的模块会各自实现其特定的功能，它们之间可以进行组合，用以实现更加复杂的功能。</p><h3 id="entry" tabindex="-1"><a class="header-anchor" href="#entry" aria-hidden="true">#</a> entry</h3><p>entry 的含义是 <strong>入口</strong>，表示 webpack 打包的起点，它告诉 webpack 应该从哪个模块开始寻找依赖关系，从而构建其内部的依赖图。</p><h3 id="loader" tabindex="-1"><a class="header-anchor" href="#loader" aria-hidden="true">#</a> loader</h3><p>loader 的含义是 <strong>解析器</strong>，它赋予了 webpack （其自身只能处理 JS 与 JSON 文件）处理其他文件的强大能力，loader 可以将处理后的文件转换为模块以提供给程序使用。</p><h3 id="plugin" tabindex="-1"><a class="header-anchor" href="#plugin" aria-hidden="true">#</a> plugin</h3><p>plugin 的含义是 <strong>插件</strong>，它可以执行在 webpack 打包过程中的更加复杂一些的任务，用以扩展 webpack 功能。例如：</p><ul><li>资源管理</li><li>打包优化</li><li>注入环境变量</li></ul><p>plugin 与 loader 的区别在于，loader 专注于增强 webpack 解析文件的能力，plugin 用来扩展 webpack 的其他功能，使之更加灵活。</p><h3 id="output" tabindex="-1"><a class="header-anchor" href="#output" aria-hidden="true">#</a> output</h3><p>output 的含义是 <strong>输出</strong>，它告诉 webpack 如何命名以及在哪里输出最终的打包产物（bundle）。</p>`,36),o=[t];function c(r,i){return a(),s("div",null,o)}const d=n(p,[["render",c],["__file","01.html.vue"]]);export{d as default};