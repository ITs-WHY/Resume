## 页面加载过程

- 加载资源的形式
  html、js、css、media文件
- 加载资源
  1.将 url 解析为 ip 地址。
  2.向 ip 地址发送 http 请求。
  3.服务器处理请求并返回
- 渲染界面
  1.根据 HTML 代码生成 DOM Tree
  2.根据 CSS 生成 CSSOM
  3.DOM Tree 和 CSSOM 整合成 Render Tree
  4.根据 Render Tree 渲染界面
  5.遇到 <script> 暂停渲染，优先加载并执行 js 代码，完成再继续
  6.渲染完成 Render Tree

##### css 放在 head

使得在 DOM tree 生成之前就生成好 CSSOM。待 DOM 树生成完毕后直接与 CSSOM 生成 Render Tree。否则会导致重复渲染。

##### js 放在 body 最后

#### window.onload  & DOMContentLoaded

widow.onload 在页面全部资源加载完后执行

DOMContentLoaded DOM渲染完执行

## 性能优化

- 多使用内存、缓存等
- 减少 CPU 计算量，减少网络加载耗时 (空间换时间)

### 加快加载

- 减少资源体积：压缩代码
- 减少访问次数：合并代码、SSR 服务端渲染、缓存
- CDN

### 加快渲染

- css、js 位置
- DOMContentLoaded 触发 js
- 懒加载
- DOM 缓存
- 频繁 DOM 操作，合并后一起插入 DOM
- 防抖 节流

####  缓存

- 静态资源增加 hash 后缀
- 文件内容不变，则 hash 与 url 不变
- url 与文件不变会自动触发 http 缓存，返回 304

#### SSR(server side render)

- SSR：将网页和数据一起加载，一起渲染
- 非 SSR：先加载网页，再加载数据，再渲染数据。

#### 懒加载

#### 防抖

持续触发不执行，不触发后过一段时间执行。

监听一个输入框变化后的 change 事件

频繁输入可能频繁触发 change 事件

防抖指输入结束或暂停时才触发 change 事件。

```javascript
input1 = document.getElementById('input')
let timer = null
input1.addEventListener('keyup', function(){
    if (timer){
        clearTimeout(timer)
    }
    timer = setTimeout(()=>{
        console.log(input1.value)
        timer = null
    }, 500)
})
```

```javascript
// 封装
function debounce(fn, delay=500){
	let timer = null
    return function(){
        if (timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
input1.addEventListener('keyup', debounce(function (){
    console.log('excuted')
}, 600))
```

#### 节流

持续触发不立即执行，等一段时间后执行。

- 如拖拽元素时要实时获取元素位置，直接使用 drag 会导致卡顿。
- 节流指可以每隔一段时间获取一次位置。

```javascript
const div1 = document.getElementById('div1')
let timer = null
div1.addEventListener('drag', function(e){
    if (timer){
        return 
    }
    timer = setTimeout(()=>{
        console.log(e)
        timer = null
    }, 100)
})
```

```javascript
function throttle(fn, delay=100){
    let timer = null
    return function(){
        if(timer){
            return
        }
        timer = setTimeout(()=>{
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
div1.addEventListener('drag', throttle(function(e){
    console.log(e)
},100))
```

节流还可以通过 requestAnimation 的方式来执行,但是会有问题,就是它就是固定的每秒60次,如果上一次还没有执行,下一次也会被推入进行执行.

## 安全

#### XSS

跨站请求攻击。嵌入脚本等

可将 < > 替换为 lt; gt;

#### XSRF

- 使用 post
- 增加验证
- 