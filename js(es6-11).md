## 变量声明

```js
var a = 1
// 这里把变量和 window 的属性绑定了，是js的一个问题
console.log(window.a)
// 这里其实是 window.b = 2
b = 2
```

let 解决了 变量定义时和全局属性绑定的问题

```js
let a = 1
window.a --> undefined
```

#### let 与 var 区别

- 不属于 window 对象

- 不允许重复声明

- 不存在变量提升

- 暂时性死区

  在变量声明之前不能使用变量

- 块级作用域

  ```javascript
  for(var i=0;i<3;i++){
      setTimeout(()=>{
          console.log(i)
      },100)
  }
  ---> 3 3 3
  for(let i=0;i<3;i++){
      setTimeout(()=>{
          console.log(i)
      },100)
  }
  ---> 0 1 2
  ```

#### const

const 定义时需要赋值


但是 const 值不一定不能改变，引用类型。

如果需要不能改变的对象，可以使用 Object.freeze()，但是 Object.freeze() 是浅冻结。

ES5 中定义常量

```javascript
Object.defineProperty(window, 'a', {
    value: 1,
    writable: false,
})
```

#### 解构赋值 - es6

- 数组解构

  通过顺序对应

  let [a,b,c] = [1,2,3]

  let [a,b,c=5] = [1,2,3] ---> c:3

- 对象解构

  通过 key 对应

  const {name, age} = {name:1,age:2}

  const {name:myname, age:myage} = {name:1,age:2}

- 字符串解构

  和数组解构相同

  let [a,b,c] = 'why'

- 参数解构

- 返回值解构

## 数组遍历

### ES5 遍历

#### for 循环

#### forEach

不支持 break continue

```js
arr.forEach((elem, index, array)=>{})
```

#### map

返回一个新数组

#### filter

返回一个新数组

#### some

返回布尔值

#### every

返回布尔值

#### reduce

接受一个函数作为累加器,

```javascript
// 第二个参数为初始值
arr.reduce((prev, cur, index, arr)=>{},0)
let max = arr.reduce((prev, cur)=>{
    return Math.max(prev, cur)
})
arr.reduce((prev, cur)=>{
    prev.indecOf(cur) == -1 && prev.push(cur) 
},[])
```

#### for in

会把自己定义的方法也遍历出来

### ES6 遍历

#### find

返回第一个通过测试的元素

#### findIndex

返回第一个通过测试的元素的索引

#### for of

```javascript
for(let [index, item] of arr.entries()){
    
}
```

## 数组扩展

#### 伪数组

- function foo(){ console.log(arguments) }

  arguments 是伪数组

- document.get... 

  返回 HTMLCollection 类型

- document.querySelectorAll

  返回 NodeList 类型

HTMLCollection 或 NodeList 并不是数组，它们是伪数组，但是也有长度等类型。但是没有 push 等方法。

#### ES5 将伪数组转化为数组

Array.prototype.slice.call(HTMLCollection)

#### ES6 将伪数组转化为数组

**Array.from**

```javascript
let arrayLike = {
    0:'1',
    1:'2',
    2:'3',
    length:3
}
let arr = Array.from(arrayLike)
```

#### 数组初始化

**Array.of**

```javascript
// ES5
let arr = new Array(1,2,3) => [1,2,3]
let arr = new Array(3) => [null,null,null]
// ES6
// Array.of 里可以试各种类型
let arr = Array.of(3) => [3]
```

#### copyWithin

用数组里的元素替换其他元素

```javascript
let arr = [0,1,2,3,4,5]
// 从 index 为 a 的元素开始替换为 b - c 之间的元素，如果没有 c,则一直到末尾
arr.copyWithin(a,b,c)
```

#### Fill

填充元素

```javascript
let arr = new Array(3).fill(0)
let arr = [0,1,2,3,4,5]
// 将 a-b 之间的元素替换为 new
arr.fill('new', a, b)
```

#### includes

找数组里的元素

```javascript
let arr = [1,2,3,NaN]
// ES5 
arr.indexOf(1) => 2
arr.indexOf(NaN) => -1
// ES6
arr.includes(1) => true
arr.includes(NaN) => true
```

## 函数的参数

#### 参数默认值

```javascript
// ES6
// 有默认值的参数要放在最后
function a(x, y = 'world'){
    console.log(x, y)
}
function ajax(url, {
    body='',
    method='GET',
    headers={}
}={}){
    console.log(method)
}
// ES5
// 当 y = 0 时会出bug
function a(x, y){
    y = y||'world'
    console.log(x, y)
}
```

#### length

返回没有指定默认值的参数的个数

```javascript
function f(x,y=2,c=3){}
f.length => 1
```

#### 参数作用域

```javascript
// 在这里 (x, y=x) 是一个作用域
let x= 1
function foo(x, y=x){
    console.log(y)
}
foo(2)
=> 2
```

#### 函数 name 属性

```javascript
function foo()
foo.name => 'foo'
foo.bind({}).name => 'bound foo'
```

## 扩展运算符与 rest 参数

- ...
- 扩展运算符：把数组打散成用逗号隔开的值
- rest 参数：把逗号隔开的值合成一个数组

#### 合并数组

```javascript
let arr1 = [1,2,3]
let arr2 = [4,5,6]
Array.prototype.push.apply(arr1,arr2)
arr1.push(...arr2)
```

#### 合并参数

```javascript
function foo(...args){
    console.log(args)
}
foo(1,2,3) => [1,2,3]
```

#### 不确定有几个参数

```javascript
function (x, ...args){
    // ...args 是剩余的参数
}
```

#### 解构

```javascript
let [x, ...args] = [1,2,3,4]
args => [2,3,4]
```

## 箭头函数

- this 指向是定义时的指向，而不是调用时的指向

- 不可以作为构造函数

- 不能使用 arguments 对象

  可以使用 rest 参数来代替

## 对象扩展

#### 如果对象的 key 和 value 的变量名一样，可以直接写变量名。

```javascript
state: {
    CASE_DATA,
},
```

#### 对象的键是一个变量时

```javascript
let s = 'aaa'
let obj = {
    [s]: '123'
}
```

#### 对象内的方法不要用箭头函数，this 的指向会出现问题，会指向 window

```javascript
let obj ={
    // es6 方法简写
    study(){
        return 'study'
    }
}
```

#### Object.is()

还是根据内存地址来判断

```javascript
Object.is(2, '2') => false
Object.is(Nan, Nan) => true
```

#### 扩展运算符

```javascript
...
Object.assign() // 当存在相同时后面的会把前面的覆盖
```

#### in

判断对象里是否包含这个**键**

#### 对象遍历

```javascript
for(let key in obj){
    console.log(obj[key])
}
Object.keys(obj).forEach(key=>{
    console.log(obj[key])
})
Object.getOwnPropertyNames(obj).forEach(key=>{
    console.log(obj[key])
})
Reflect.ownKeys(obj).forEach(key=>{
    console.log(obj[key])
})
```

## 深拷贝

- JSON
- 手动实现

## 面向对象

ES5

```javascript
// 构造函数
function People(name, age){
	this.name = name // 实例属性
    this.age = age
    // 方法一般不定义在类里面，因为每次新建都会创建一个方法。应写在 prototype 里。
    this.showName = ()=>{}
}
// 实例方法
Prople.prototype.showName = () =>{}
let p = new People('a', 13)

// 静态方法
Math.random()
People.getCount = ()=>{
    console.log('...')
}

// 静态属性
People.count = 1

// ES5 继承
function Animal(name){
    this.name = name
}
function Dog(name, bark){
    Animal.call(this, name) // 只能继承父类的属性
    this.bark = bark
}
Dog.prototype = new Animal()
Dog.prototype.constructor = Dog
```

ES6

```javascript
// class 本质还是一个语法糖
class People {
    constructor(name, age){
        this.name = name
        this.age = age
        this._sex = -1
    }
    // 这种方式可以增加一些逻辑判断
    get sex(){
        return this._sex
    }
    set sex(val){
        this._sex = val
    }
    showName(){
        console.log(this.name)
    }
    // 静态方法
    static getCount(){
        return 1
    }
}
// es6 不支持定义静态属性，但是可以用 es5 的方法。
People.count = 1

class Coder extends People{
    constructor(name, age, company){
        super(name, age)
        this.company = company
    }
    showCompany = () =>{
        console.log(this.company)
    }
}
```

## ES6 Symbol

- 是一种新的数据类型
- 独一无二的

```javascript
let s1 = Symbol('foo')
let s2 = Symbol('foo2')

const obj = {
    name:'1'
}
let s = Symbol(obj)
// 会自动调用 toString 方法
console.log(s) => Symbol([object])

// Symbol没有自己的属性
s.name = 'why'
console.log(s) => Symbol()

// 输出描述
console.log(s.dexcription)

// 全局的环境，会生成同一个
let s1 = Symbol.for('1')
let s2 = Symbol.for('1')
s1 === s2 => true


```

#### 应用场景

当 key 出现重复时

```javascript
const stu1 = Symbol('aa')
const stu2 = Symbol('aa')
const grade = {
    [stu1]:{},
    [stu2]:{}
}
```

保护属性

```javascript
const sym = Symbol('123')
class User {
    constructor(name){
        this[sym] = '123'
    }
}
for(let key in user){
    console.log(key) // 此处取不到 symbol
}
for(let key of Object.keys(user)) // 此处取不到 symbol
Object.getOwnPropertySymbols(user) // 只能取到 Symbol
Reflect.ownKeys(user) // 都能取到
// 消除魔术字符串
// 魔术字符串指的是一个字符串在代码中出现多次，例如作为判断条件
const type = {
    triangle: Symbol(),
    circle: Symbol()
}
const getName = (type) =>{
    if(type===type.triangle){
        return 1
    }else if(type===type.circle){
        return 2
    }
}
```

## ES6 数据结构 Set

- 新的数据结构
- key 和 value 值一样

```javascript
let s = new Set([1,2,3])
// 新增
s.add('new').add('new1')
// 删除
s.delete('new')
// 清空
s.clear()
// 判断是否存在
s.has('new') => true
// 长度
s.size
// 遍历
s.forEach(item=>console.log(item))
for(let item of s) console.log(item)
for(let item of s.keys())
for(let item of s.values())
for(let item of s.entries())
```

#### 场景

- 数组去重

  let s = new Set(arr)

- 合并去重

  let s = new Set([...arr1, arr2])

- 转化为数组

  [...s]

  Array.from(s)

- 求交集

  ```javascript
  let s1 = new Set(arr1)
  let s2 = new Set(arr2)
  let result = new Set(arr1.filter(item=>{
      return s2.has(item)
  }))
  ```

- 差集

  ```javascript
  let s1 = new Set(arr1)
  let s2 = new Set(arr2)
  let result1 = new Set(arr1.filter(item=>{
      return s2.has(item)
  }))
  let result2 = new Set(arr2.filter(item=>{
      return s1.has(item)
  }))
  [...result1,...result2]
  ```

#### WeakSet

- 只能存储对象
- 不能遍历
- 是一个弱引用,垃圾回收机制不会考虑 WeakSet 的引用

```javascript
let ws = new WeakSet()
ws.add(1) => error
const obj1 = {name:'1'}
ws.add(obj1)
ws.delete(obj1)
ws.has(obj1)
// WeakSet 不能遍历
```

## ES6 数据结构 Map

出于 js 内置的对象的键只能是字符串,Map 的键可以试任何值.

```javascript
let m = new Map()
let m = new Map([
    [1,'1']
])

m.set(1, '1')
m.set(1, '2') // 覆盖上次的值
m.has(1)
m.get(1) => '2'
m.get(2) => undefined

const obj1 = {name:'1'}
m.set(obj1,'1')
m.get(obj1) // 键和内存地址绑定

m.set(NaN, 1)
m.get(NaN) => 1

m.size // 长度
m.delete // 删除
m.clear() // 清空

// 遍历
for(let key of map.keys())
for(let value of map.values())
for(let item of map.entries())
map.forEach((value, key)=>{
    // 并非数组的 forEach
    // 第二个参数绑定 this
}, this)
    
// 转为数组
[...map]
Array.from(map)
```

## 字符串

#### unicode

```js
\u{20BB7}
\uxxxx 取值范围 0000-ffff
```

#### 遍历器

```js
for(let item of 'abcdefg')
```

### 模板字符串^

```js
// 换行 \n
const str1 = '123123dlkn \n glksfnlsanv \n lksanvlnlvcxznl;jsoaipgjowj'
// 回车就换行
const str2 = `123
123
${1+2}`

// 动态class
`div div-my-${classParam}`
```

#### include

```js
//es5
'why'.indexof('w') --- 0
'why'.indexof('ww') --- -1
//es6
'why'.includes('w') --- true
'why'.includes('ww') --- false
```

#### startsWith

#### endWith

以 ... 为开头/结尾

#### repeat

重复

```js
'1'.repeat(100)
```

## 正则表达式

```js
// i(忽略大小写) m(多行匹配) g(全局匹配,会匹配上一次匹配成功的下一个)
// y 粘连修饰符 从剩余的第一个开始匹配
// u unicode 模式
```

