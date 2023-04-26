# CSS 介绍

## 什么是 CSS
**CSS** 是层叠样式表（Cascading Style Sheets）的简称，是用来指定文档如何展示给用户的一门语言，它用于设置和布置网页，可以使网页变得更加漂亮美观。

## CSS 可以用来干什么
**CSS**  可以用于给文档添加样式（例如改变标题 ```<h1>``` 和链接 ```<a href="https://xxx.xxx">``` 的颜色及大小），可以创建布局（如将一个单列文本变成包含主要内容区域和存放相关信息的侧边栏区域的布局），还可以用来做一些特效（动画）等。

## 如何使用 CSS
**CSS** 样式需要在 **HTML** 文档中使用才能展现出效果，在文档中使用 **CSS** 的方法共有3钟：  
1. **外部样式表**：将 **CSS** 编写在扩展名为 ```.css``` 的单独文件中，并在 **HTML** 头部 ```<head>``` 中使用 ```<link>``` 标签引用它  
    
<CodeGroup>
  <CodeGroupItem title="HTML">

```html{6}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CSS</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
     <h1>Hello World!</h1>
     <p>this is an example</p>
  </body>
</html>
```  

 </CodeGroupItem>

 <CodeGroupItem title="CSS">

```css
/* style.css */
h1{
   color:red; /* h1标题的字体颜色设置为红色 */
}
p{
  background-color: yellow; /* 段落的背景色设置为黄色 */  
}
```  

  </CodeGroupItem>
</CodeGroup>  

2. **内部样式表**：内部样式表是指不使用外部 **CSS** 文件，而是将 **CSS** 放在 **HTML** 文件 ```<head>``` 标签里的 ```<style>``` 标签之中  
    
<CodeGroup>
  <CodeGroupItem title="HTML">

```html{6-13}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CSS</title>
    <style>
      h1 {
        color: blue; /* 设置字体颜色 */
      }
      p {
         background-color: yellow; /* 设置背景颜色 */
      }
    </style>
  </head>
  <body>
     <h1>Hello World!</h1>
     <p>this is an example</p>
  </body>
</html>
```    
  </CodeGroupItem>
</CodeGroup>  

3. **内联样式**：内联样式表存在于 **HTML** 元素的 **style** 属性之中。其特点是每个 **CSS** 表只影响一个元素  
  
<CodeGroup>
  <CodeGroupItem title="HTML">

```html{8-9}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CSS</title>
  </head>
  <body>
     <h1 style="color:red;">Hello World!</h1>
     <p style="background-color: yellow;">this is an example</p>
  </body>
</html>
```    
  </CodeGroupItem>
</CodeGroup>  

在上面的代码中我们使用了一些简单的 **CSS** 样式，但这只是 **CSS** 的冰山一角，我们将会在接下来的内容里介绍更多的 **CSS** 样式以及其他跟 **CSS** 相关的知识。   
<infoBox>

在使用 **CSS** 样式时请尽可能的使用 **外部样式表**，这样利于维护，能够使我们的样式代码更加容易阅读和理解，但是具体用哪种方式来使用 **CSS** 还需要结合你的项目的实际情况跟需求而定。
</infoBox>      