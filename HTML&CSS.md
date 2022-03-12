# HTML

#### HTML 语义化

例如一个界面全部由 div 组成，另一个有 h1 p h2

1. 增强可读性
2. SEO 搜索引擎优化

#### 块状元素 & 内联元素

display: block/table：div h1 h2 table ul ol p					独占一行

display: inline/inline-block：span img input button 	  行内元素

区别为是否独占一行

# CSS

## 布局

#### problem

- 计算盒子模型宽度
- margin 纵向重叠
- margin 负值
对 margin 的 top left right bottom 设置负值有何效果
- BFC
什么是 BFC 如何应用
- fload 布局 clearfix
如何实现圣杯布局，双飞翼布局
手写 clearfix 10秒
- flex 布局
实现一个三点的色子

#### 盒子模型宽度

```css
#div {
  width: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
}
```

offsetWidth = 内容宽度 + 内边距 + 边框，无外边距

改变 offsetWidth：

```css
#div {
  width: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
  box-sizing: border-box; // 让宽度变为box的宽度
}
```

#### margin 纵向重叠

相邻元素的 margin-top 与 margin-bottom 会发生重叠(最终值为较大值)

空内容的 <p></p> 会全部重叠

#### margin 负值

margin-top 与 margin-left 为负值时，该元素自身向上、左移动

margin-right 为负值，右侧元素左移，自身不动

margin-bottom 为负值，下方元素上移，自身不动

#### BFC 理解 & 应用

解决元素脱离文档流的问题

Block format context，块级格式化上下文

是一块独立的渲染区域，内部元素的渲染不影响边界外元素

形成的常见条件：

- float 不为 none
- position 为 absolute 或 fixed
- overflow 不为 visible

### Float布局

圣杯布局 双飞翼布局：

- 三栏布局，中间栏优先加载和渲染
- 两侧内容(宽度)固定，中间内容自适应
- 用于 PC 端

技术总结：

- 使用 float 布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，padding 与 margin

#### 圣杯布局

首先元素应为 float

父元素应设置 padding，center 内容不把页面撑满

左侧栏

```css
#left {
  position: relative;
  background-color: yellow;
  width: 200px;
  margin-left: -100%; // 相当于左移 center的宽度
  right: 200px; // 与宽度一致 必须设置 position为relative 相当于自身移动 不影响外部元素
}
```

右侧栏

```css
#right {
  background-color: red;
  width: 150px;
  margin-right: -150px; // 自身在外界看来的宽度为0
}
```

#### 双飞翼布局

使用 margin，复杂度更低

#### 手写 clearfix

```
.clearfix:after {
	content: '',
	display: table;
	clear: both;
}
```

### flex 布局

实现一个三点的色子

常用语法(必须熟练掌握)：

- flex-direction：主轴的方向

  ```css
  .box {
  	flex-direction: row | row-reverse | column | column-reverse;
  }
  row（默认值）：主轴为水平方向，起点在左端。
  row-reverse：主轴为水平方向，起点在右端。
  column：主轴为垂直方向，起点在上沿。
  column-reverse：主轴为垂直方向，起点在下沿。
  ```

- justify-content：项目在主轴上的对齐方式

  ```css
  .box {
    justify-content: flex-start | flex-end | center | space-between | space-around;
  }
  flex-start（默认值）：左对齐
  flex-end：右对齐
  center： 居中
  space-between：两端对齐，项目之间的间隔都相等。
  space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
  ```

- align-items：整个容器在交叉轴(与主轴垂直)上的对齐方式

  ```css
  .box {
    align-items: flex-start | flex-end | center | baseline | stretch;
  }
  flex-start：交叉轴的起点对齐。
  flex-end：交叉轴的终点对齐。
  center：交叉轴的中点对齐。
  baseline: 项目的第一行文字的基线对齐。
  stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
  ```

- flex-wrap：换行方式

  ```css
  .box{
    flex-wrap: nowrap | wrap | wrap-reverse;
  }
  nowrap: 不换行
  wrap: 向下换行
  wrap-reverse: 向上换行
  ```

- align-self：单个项目在交叉轴上的对齐方式

### CSS 定位

#### absolute 与 relative 定位

- relative 根据自身定位
- absolute 根据最近一层的定位元素定位

##### 定位元素

- absolute relative fixed
- body

#### 居中对齐实现方式

水平居中：

- inline 元素: text-align: center
- block 元素: margin: auto
- absolute 元素: left: 50% + margin-left 负值(需得到元素的宽度)

垂直居中：

- inline 元素: line-height = height(需得到元素的高度)
- absolute 元素: top:50% + margin-top 负(需得到元素的高度)
- absolute 元素: transform(-50%, -50%)
- absolute 元素: top,left,bottom,right = 0  +  margin:auto

### CSS 图文样式

line-height 如何继承

```html
<style>
  body {
    font-size: 20px;
    line-height: 200%;
  }
  p {
    font-size: 16px;
  }
</style>
```

- 具体数值 例5px 直接继承该值
- 比例，则继续继承该比例，值为比例运算后的值
- 百分比，继承计算后的值，与比例不同

### CSS 响应式

- rem 是什么
- 响应式布局常见方案

#### rem - 长度单位

- px，绝对长度单位
- em，相对长度单位，相对于父元素，不常用
- rem，相对长度单位，相对于根元素(html)，常用于响应式布局

#### 响应式布局常用方案

- media-query(CSS3) 查询不同屏幕宽度，根据宽度设置根元素 font-size
- rem，基于根元素的

#### vw/vh

- rem 的弊端
  阶梯性，非线性

- 网页视口尺寸

  ```js
  window.screen.height		// 屏幕高度
  window.innerheight			// 网页视口高度
  document.body.clientHeight	// body 高度
  ```

- vh 网页视口高度的 1%
- vw 网页视口宽度的 1%
- vmax vmin：取两个值得最大、最小值

css 属性继承

css3 新特性