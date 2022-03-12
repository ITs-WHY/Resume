#### 表单验证

校验器的验证逻辑应写在 data() 中 return 前

##### element-ui el-select 中下拉菜单显示与隐藏事件定义

```vue
<el-select @visible-change="queryWare($event,scope.row)"></el-select>
```

其中 $event 代表下拉菜单事件，true 为菜单显示，false 为菜单隐藏。

#### 直接修改数组元素无法触发视图更新

可以使用 Vue.set 的方式来触发视图更新

```javascript
Vue.set(array, index, newValue) // 数组，要修改的值的索引，新的值
```

可以触发视图更新的数组操作：

- Vue.set
- Vue.delete
- 数组中的对象的属性的改变
- array.splice
- 数组赋值为新数组
- push(), pop(), shift(), unshift(), splice(), sort(), reverse()

#### 文件上传时通过 upload 的 :name 属性来指定路径

#### 多路径使用同一组件

出现这种情况可能会点击后不触发页面刷新。可以通过在 router-view 上加上一个 key 来保证路由切换时触发渲染。

```javascript
<router-view :key="key"></router-view>
computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 }
```

加载组件是判断是哪个路由触发的

```javascript
return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
return this.$route.meta.isEdit // 根据meta判断
```

#### 多个 Tabs ，加载时每个都会发请求

用 v-if 来判断当前 tab，然后就只有当前 tag 发送请求。但是会出现一个问题：每次点击 tab 组件都会重新挂载一次。这时候用 keep-alive 来缓存就可以了。

```html
<el-tabs v-model="activeTab">
  <el-tab-pane label="简介及公告" name="announcement">
    <announcement />
  </el-tab-pane>
  <el-tab-pane label="资讯" name="information">
    <keep-alive>
      <information v-if="activeTab=='information'" />
    </keep-alive>
  </el-tab-pane>
  <el-tab-pane label="直播流配置" name="stream">
    <keep-alive>
      <stream v-if="activeTab=='stream'" />
    </keep-alive>
  </el-tab-pane>
</el-tabs>
```

#### Select 选择器

当 v-model 要绑定一个 object 时会出问题。在设置默认值时，必须要同一个引用才行。 

可以使用 [vue-multiselect](https://github.com/shentao/vue-multiselect) 来解决

新版本可以使用 value-key 的方式，只要 value-key 对应的值相等就认为是同一个。

```javascript
<el-select v-model="objectValue" value-key='id'>
    <el-option v-for="item in items" :label="item.id" :value="item"></el-option>
</el-select>
```

#### upload

上传之前如果要再获得参数的话可以使用 before-upload 这个钩子，before-upload 支持 Promise 所以在里面写一个 Promise 就可以改变原有的数据了。

通过 this._data 可以获取当前实例的 data。

然后上传的时候就可以使用这个获得的数据。

#### 除了 button 等原生就有 click 事件的标签

想要监听 click 就必须加上 .native 修饰符

#### Echarts 可以按需引入

```java
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
```

```javascript
//第一种 watch options变化 利用vue的深度 watcher，options一有变化就重新setOption
watch: {
  options: {
    handler(options) {
      this.chart.setOption(this.options)
    },
    deep: true
  },
}
//第二种 只watch 数据的变化 只有数据变化时触发ECharts
watch: {
  seriesData(val) {
    this.setOptions({series:val})
  }
}
```

#### 对 list 的增删改操作

```javascript
//添加数据
this.list.unshift(this.temp);

//删除数据 
const index = this.list.indexOf(row); //找到要删除数据在list中的位置
this.list.splice(index, 1); //通过splice 删除数据

//修改数据
const index = this.list.indexOf(row); //找到修改的数据在list中的位置
this.list.splice(index, 1,this.updatedData); //通过splice 替换数据 触发视图更新
```

#### Watch immediate

watch 时不会监听到变量的初始化。需要加上 immediate: true。

#### Vuex

如果业务之间耦合度比较低的话，完全没有必要使用 vuex 来存储 data，结合业务场景使用。

#### 侧边栏重复点击渲染

#### vue-router

当两个路由一个是动态，一个是静态时，不会优先匹配静态的，而是根据路由定义的顺序来进行优先级匹配。

但是在 vue-router 4.0 中新增了自动优先级排名。



/user/info

/user/:id

