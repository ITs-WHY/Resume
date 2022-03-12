## 性能优化

#### 当父组件需要修改子组件的值时,如果对性能要求较高,可以由子组件来管理 state 而不进行状态提升

这样可以缩短 batchUpdate 的时间,能够有效将数据更新时间控制在 16ms 以下.

#### 函数组件的 SCU

使用 React.memo((props)=>{},areEqual) 可以实现 SCU

React.memo 本身实现一层浅比较,但是父组件的 inline 函数每次重新渲染都会重新创建,这就意味着每次传入的 props 中的函数都不是同一个(虽然它们内容一模一样).但是深比较是更浪费性能的.

1. 可以在 areEqual 中判断来排除所有的函数变化

2. 使用 useCallback 来保存这个函数
   ```react
   const fn_callback = useCallback(()=>{
       fn()
   },['依赖项'])
   // 适用
   <div onClick={fn_callback}></div>
   // 在下面的内联函数情况中 useCallback 也不起作用。每次调用 render 函数时都会创建一个函数的新实例，render 函数会将该函数的新实例绑定到该按钮。此外最后一个函数实例会被垃圾回收，大大增加了 React 应用的工作量。
   <div onClick={()=>fn_callback(params)}></div>
   ```
   
3. 通过 data-attributes 传递参数

   ```react
   handleClick(e){
       console.log(e.target.dataset.letter)
   }
   <div date-letter onClick={this.handleClick}/>
   ```

#### useMemo 做计算结果缓存

只有当依赖项变化时才会重新计算.

```react
const value = useMemo(()=>{
    return calculate(params)
},['依赖项'])
```

#### 提前将函数绑定到 this

```react
constructor(){
    this.onClick = this.onClick.bind(this)
}
<div onClick={this.onClick} />
// 下面的操作,每次 render 都会创建一个新的函数
<div onClick={this.onClick.bind(this)} />
```

或者也可以使用箭头函数的方式,就不需要绑定 this.

但是箭头函数的缺点是该函数本质是这个对象的实例属性,也就意味着多次调用该组件也会多次创建函数.

#### 大量数据时使用虚拟列表

只渲染当前视口可见的数据.

- [react-virtualized](https://github.com/bvaughn/react-virtualized)
- [react-window](https://github.com/bvaughn/react-window) 更轻量的 react-virtualized, 同出一个作者

#### 在 setState 中传入函数 可以获取到最新的 state 值

#### 避免使用内联对象 内联函数

```react
// 每次渲染都会重新创建这个对象
return <div style={{width:'100%'}} />
// 每次渲染都会重新创建这个函数
return <div onClick={()=>focus('1')} />
```

#### 在 React 事件中使用异步

首先在 react 中所有的原生事件都会被处理成合成事件.

在 React16 中,出于性能考虑(但其实并没有提升性能),合成事件 SyntheticEvent,对象被放入事件池统一管理,这就意味着它可以复用.当所有事件处理函数被调用后它的属性就变为空.

所以在 React16 中的合成事件里使用异步获取不到这个事件的对象.

在 React 17 中取消了事件池

```react
const handleClick = (e)=>{
    // 阻止 react 重置合成事件对象
    e.persist();
    setTimeOut(()=>{
        // do something
    },10000)
}

<button onClick={handleClick}></button>
```

#### 受控组件失控

可能是因为绑定的值为 undefined 或 null。

