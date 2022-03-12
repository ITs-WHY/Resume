## 问题

- event loop 机制，画图
- 宏任务&微任务
- Promise 哪三种状态，如何变化
- Promise then&catch 连接
- async/await 
- Promise & setTimeout 顺序

## event loop 事件循环

- js 为单线程
- js 的异步基于回调实现
- event loop 就是异步回调机制的实现原理

#### JS执行

- 逐行执行
- 某一行出错，停止执行
- 先执行同步，再执行异步

#### event loop 过程

- 同步代码，在 Call Stack(调用栈) 中执行
- 遇到异步代码，先记录下，等待时机(定时，网络请求)
- 时机到了、有返回值了(浏览器控制)，将异步代码移动至 Callback Queue(回调队列)
- 若 Call Stack 为空(同步代码执行完)，Event loop 开始工作
- Event loop 轮询查找，如有则移动到 Call Stack 执行
- Event loop 继续轮询查找

##### DOM 也是基于回调实现(例如点击事件)，但它不是异步

#### Call Stack 调用栈

调用栈是JS引擎追踪函数执行流程的一种机制。

- 函数执行时，这个函数进入调用栈 
- 这个函数执行完就出栈
- 若这个函数调用了其他函数，那么它先不出栈，其他函数入栈。
- 当所有其他函数都执行完并出栈时，此函数继续执行，执行完后也出栈

#### 调用栈/堆栈溢出

- 递归时没有结束判断
- 调用栈不停压入函数直至溢出
- 溢出后会阻塞代码，因为 JS 是单线程，只有一个调用栈。同时会影响页面渲染。

## Promise 进阶

#### 状态

- pending
- resolved
- rejected
- (pending -> resolved) 或 (pending -> rejected) 状态不可逆

#### then 与 catch 改变状态

- **then 正常返回 resolved，里面有错误返回 rejected**
- **catch 正常返回 resolved，里面有错误返回 rejected**

#### 手写 Promise.all

## async/await

背景：异步回调的 callback hell

解决：Promise，但 Promise 也基于回调函数

**async/await 是同步语法，彻底弃用回调函数**

#### async/await 与 Promise 的关系

- 执行 async 函数，返回的是 Promise 对象
- await 相当于 Promise 的 then
- 可用 try...catch 捕获异常，代替 Promise 的 catch

```javascript
async function fn1(){
    return 100 //相当于 return Promise.resolve(100)
}
const res1 = fn1()
res1.then(data =>{
    console.log('data', data)
})

!(async function(){
    const p1 = Promise.resolve(200)
    const data = await p1 // 相当于 Promise then
    console.log('data', data)
})()

// await 后直接跟值，就把值封装为 Promise.resolve()
!(async function(){
    const data1 = await 400 // 相当于 await Promise.resolve(400)
    console.log('data', data1)
})()

// await 后可以跟 async,因为 async 本质也是一个 Promise
!(async function(){
    const data2 = await fn1() // 相当于 await Promise.resolve(400)
    console.log('data', data2)
})()

// 异常处理
!(async function(){
    const p4 = Promise.reject('err')
    try{
        const res = await p4
        console.log(res)
    }catch(ex){
        console.log(ex) // 相当于 Promise 的 catch
    }
})()

// 因为 await 相当于 then，所以此处不会执行
!(async function(){
    const p4 = Promise.reject('err')
    const res = await p4
    console.log(res)
})()
```

#### async/await 实例

```javascript
async function async1 () {
    console.log("async1 start") // 2 
    await async2() // await 后的内容全部都是 callback 里的内容 所以下面一行最后执行
    console.log("async1 end") // 5
    await async3() //可以看做是一种异步嵌套
    	console.log("async1 end 2") //7
}
async function async2 () {
    console.log('async2') // 3 async 函数本身是同步代码，await 后的才是异步
}
async function async3 () {
    console.log("async3") //6
}
console.log('script start') // 1
async1()
console.log('script end') // 4
```

#### async 的优势

- 可读性，例如存在条件判断的 Promise
- 能够显示哪一步抛出的异常
- await 能够设置断点

## async 与 Promise 优劣

1. 代码更加简洁

2. 错误处理

   ```javascript
   // 可以使用 try catch,捕获异常时不用在每个 .catch 中重复
   // 并且可以同时处理同步和异步错误
   ```

3. 条件分支的嵌套更少,逻辑更清晰,可读性更高

   ```javascript
   // 反例
   getJSON()
   .then(data => {
       if (data.needsAnotherRequest) {
           return makeAnotherRequest(data)
       } else {
           console.log(data)
           return data
       }
   }).then(moreData => {
       console.log(moreData)
       return moreData
   })
   ```

4. 中间值

   当下次请求需要上次请求的值时

   ```javascript
   promise1()
   .then(value1 => {
       // do something
       return promise2(value1)
   }).then(value2 => {
       // do something          
       return promise3(value1, value2)
   })
   
   const value1 = await promise1()
   const value2 = await promise2(value1)
   return promise3(value1, value2)
   ```

5. 异常

   从 promise 中返回的异常没有哪一个环节抛出的异常信息

   使用了async/await的代码中，异常堆栈指向了正确的函数

6. 调试

   promise 无法进行断点调试

## 异步的本质

- async/await 是用来消灭异步回调语法的
- 但是 JS 还是单线程，异步还是基于 event loop
- async/await 只是一个语法糖

####  for ... of

异步的遍历

```javascript
function muti(num) {
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve(num*num)
        },1000)
    })
}
const nums = [1,2,3]
!(async function(){
    for (let i of nums) {
        const res = await muti(i)
        console.log(res)
    }
})()
```

## 宏任务 微任务

 不同类型的异步和写的顺序没有关系

- 宏任务：setTimeout，setInterval，Ajax，DOM事件
- 微任务：Promise async/await

#### event loop 和 DOM 渲染

- js 和 DOM 渲染共用一个线程
- js 执行的时候 要留时间给 DOM 渲染

机制

- 每次 Call Stack 清空(轮询结束)，即同步任务执行完
- DOM 结构如果有改变则重新渲染
- 再次触发下一次 Event Loop

#### 为什么微任务执行更早


1. Call Stack 空闲 
2. 执行当前的微任务
3. 尝试 DOM 渲染
4. 触发 Event Loop

微任务是 ES 规范，不会经过 Web APIS。微任务会进入 microtask queue

#### Promise 初始化内容立即执行

```javascript
new Promise(resolve =>{
    console.log('promise init') // 会立即执行
})
```

## Event loop 进阶

#### 浏览器 event loop 机制

1. 执行同步代码
2. 同步代码执行完毕，Call Stack 清空，event loop 启动
3. 从**微任务**队列中取出队首，放入 Call Stack 中运行
4. 重复 3，直到**微任务**队列为空(在**微任务**执行过程中产生微任务，也会加入**微任务**队列，在这个周期中也会被执行)
5. 微任务队列执行完毕，开始渲染
6. 渲染完成后，event loop 启动，将**宏任务**队列队首放入 Call Stack 中。
7. 该**宏任务**执行完毕后，重复 3-6。

注意点：

- 微任务每次都会执行完毕，微任务队列为空，才开始渲染，然后执行宏任务
- 微任务执行过程中产生的微任务也会在当前周期执行
- 宏任务每个周期只执行一个

#### NodeJS event loop 机制