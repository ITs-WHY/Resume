## HTML 元素

本质是一个文档，具有大纲，语义与结构很重要

```html
<meta charset="utf-8"> 定义字符编码
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"> 定义视口参数，适配移动端
<base href="/"> 定义链接的 baseurl
```

#### header 元素

不体现在页面中

- meta
- title
- style
- link
- script
- base

#### body 元素

- div / section / article / aside / header / footer
- p / span / strong / em
- table / thead / tbody / tr / td
- ul / ol / li / dl / dt / dd
- a
- form / input / select / textarea / button属性

#### 属性

- img：src，alt(替换文本)
- form：target，method，enctype(编码方式)
- radio：name(表示同一组单选框)
- label：for(和表单关联)
- button：type=reset(重置表单)

## HTML版本

```html
<p>标签可以没有结束
<div style=color:red>属性可以不用引号
Boolean 值可以省略
<P>标签可以大写
```

h5 新语义

- section 区域
- article 区域
- nav 导航
- aside 不重要内容、侧边栏
- em / strong 强调
- i icon

表单增强

- 日期、时间、搜索
- 表单验证
- placeholder 
- autofocus 自动聚焦

## HTML 元素分类

#### 默认样式分类

- 块级元素 block	

  独占一行，有规则形状，尺寸

- 内联元素 inline	

  无规则形状

- 内联块级 inline-block 

  对外是内联元素，在行中又具有块级元素的特征

#### HTML 嵌套关系

- 块级元素可以包含行内元素
- 块级元素不一定可以包含块级元素
- 行内元素一般不能包含块级元素(除了 a)
- a 在嵌套关系计算中不会出现

#### HTML 默认样式

重置默认样式 - CSS Reset

```css
*{
    margin:0;
    padding:0;
}
```

## Problem

1. doctype 的意义是什么
   - 浏览器以标准模式渲染
   - 让浏览器知道元素的合法性
2. HTML XHTML HTML5
   - XHTML 是 HTML 严格化的结果
   - HTML5 是 HTML 的新版本，规则比 XHTML 宽松
3. HTML5 的变化
   - 新语义化元素
   - 表单增强
   - 新 API(存储、音视频、头像、实时通讯、设备能力(定位))
   - 元素分类、嵌套
4. em 与 i 区别
   - em 是语义化标签，表示强调
   - i 是样式标签(斜体)，目前一般是 icon
5. 语义化好处
   - 可读性
   - 机器容易理解(爬虫、读屏)
   - SEO
6. 哪些元素自闭合
   - 表单元素 input
   - 图片 img
   - br hr
7. HTML 与 DOM 区别
8. property attribute区别
   - attribute 是属性，是死的
   - property 是特性，是活的
9. form 作用
   - 直接提交
   - 使用 reset
   - 表单验证
   - 浏览器保存













