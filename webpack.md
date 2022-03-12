## webpack 与 babel

#### 作用

-  ES6 模块化
- ES6 语法
- 压缩、整合代码，加快网页加载速度

安装 webpack

```
npm install webpack webpack-cli
```

根目录下 webpack.config.js 文件

```js
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin') //解析HTML插件

module.exports = {
    mode: 'development', // production 生产环境
    entry: path.join(__dirname, 'src', 'index.js'), // 文件入口
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackplugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        })
    ],
    devServer: {
        port: 8818,
        contentBase: path.join(__dirname, 'dist'),
    }
}
```

package.json 中

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server" // 本地服务
  },
```

#### babel

将 es6 语法转为 es5

#### ES6 模块化

```javascript
const name = ''
const obj = {
    name: '11'
}
export {
	name,
    obj
}
-----------------------
export function add(){
    console.log('aa')
}
export const name = "张胜男"
```

```javascript
import {name} from './a'
```

##### export 与 export default

export default仅有一个，且导入时不加{}。使用 export default，不需要知道所需加载模块的变量名。

## 配置生产环境打包

#### 关闭 sourcemap

- vue-cli2 配置

修改config目录下的index.js文件

```javascript
module.exports = {
    bulid: {
        productionSourceMap: false
    }
}
```

- vue-cli3和vue-cli4 配置

修改根目录下的vue.config.js文件

```javascript
module.exports = {
    productionSourceMap: false
}
```

# webpack

#### 问题

- 前端代码为何要构建和打包
- moudule chunk bundle 分别是什么，区别
- loader 与 plugin 区别
- webpack 懒加载
- webpack 常见性能优化
- babel-runtime 和 babel-polyfill 区别

## 基本配置

- 拆分配置和 merge

  webpack 分为公共配置，开发环境配置，生产环境配置

  webpack-merge 可以在公共配置基础上配置别的环境

  ```javascript
  const {smart} = require('webpack-merge')
  module.exports = smart(webpackCommonConf,{
    ...  
  })
  ```

- loader 的执行顺序是 从后往前

  ```javascript
  {
      test: /\.css$/,
      loader: ['style-loader','css-loader','postcss-loader']
      // postcss-loader 用来做浏览器兼容性
  }
  ```

- 处理图片

  ```javascript
  {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: {
          loader: 'url-loader',
          options: {
              // 小于 5kb 的图片用 base64 格式产出
              // 否则，依然延用 file-loader 的形式，产出 url 格式
              limit: 5 * 1024,
              // 打包到 img 目录下
              outputPath: '/img1/',
              // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
              // publicPath: 'http://cdn.abc.com'
           }
      }
  },
  ```

## 高级配置

- #### 多入口

  ```javascript
  entry: {
      index: path.join(srcPath, 'index.js'),
      other: path.join(srcPath, 'other.js')
  },
  output: {
      filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
      path: distPath,
      // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },
  plugins: [
      // new HtmlWebpackPlugin({
      //     template: path.join(srcPath, 'index.html'),
      //     filename: 'index.html'
      // })
      // 多入口 - 生成 index.html
      new HtmlWebpackPlugin({
          template: path.join(srcPath, 'index.html'),
          filename: 'index.html',
          // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
          chunks: ['index']  // 只引用 index.js
      }),
      // 多入口 - 生成 other.html
      new HtmlWebpackPlugin({
          template: path.join(srcPath, 'other.html'),
          filename: 'other.html',
          chunks: ['other']  // 只引用 other.js
      })
  ]
  ```

- #### 生产环境抽离 CSS

  开发环境可以用 style-loader 将 css 放到 style 中

  ```javascript
  // 抽离 css
  {
      test: /\.css$/,
      loader: [
         MiniCssExtractPlugin.loader,  //不再用 style-loader
         'css-loader',
         'postcss-loader'
      ]
  },
  plugins: [
  	new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
      new webpack.DefinePlugin({
          // window.ENV = 'production'
          ENV: JSON.stringify('production')
  	}),
      // 抽离 css 文件
      new MiniCssExtractPlugin({
      	filename: 'css/main.[contentHash:8].css'
      })
  ],
  optimization: {
      // 压缩 css
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  }
  ```

- #### 抽离公共代码 -- 生产环境下

  公共代码，例如多入口引用了同一个库。

  第三方代码，例如改变了业务代码，但是很多库的代码其实没有变。但是又要重新打包，contenthash值改变，于是重新加载的内容还包括了没有变化的库。

  ```javascript
  optimization: {
      // 压缩 css
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      // 分割代码块
      splitChunks: {
          chunks: 'all',
          /**
           * initial 入口 chunk，对于异步导入的文件不处理
              async 异步 chunk，只对异步导入的文件处理
              all 全部 chunk                    */
          // 缓存分组
          cacheGroups: {
              // 第三方模块
              vendor: {
                  name: 'vendor', // chunk 名称
                  priority: 1, // 权限更高，优先抽离，重要！！！
                  test: /node_modules/,
                  minSize: 0,  // 大小限制
                  minChunks: 1  // 最少复用过几次
              },
              // 公共的模块
              common: {
                  name: 'common', // chunk 名称
                  priority: 0, // 优先级
                  minSize: 0,  // 公共模块的大小限制
                  minChunks: 2  // 公共模块最少复用过几次
              }
          }
      }
  }
  
  // 每个入口包含的 chunk
  plugins: [
      new HtmlWebpackPlugin({
          template: path.join(srcPath, 'index.html'),
          filename: 'index.html',
          chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
      }),
      new HtmlWebpackPlugin({
          template: path.join(srcPath, 'other.html'),
          filename: 'other.html',
          chunks: ['other', 'common']  // 考虑代码分割
      })
  ]
  ```

- #### 异步加载JS

  webpack 会对异步的 js 单独打包

  ```javascript
  setTimeOut(()=>{
      import(./1.js).then(res=>{
          console.log(res.default.message)
      })
  }),500)
  ```

- #### 处理 Vue

  安装 vue-loader

  ```javascript
  {
      test: /\.vue$/,
      loader: ['vue-loader'],
      include: srcPath
  },
  ```

#### module chunk bundle 的区别

- module - 各个源码文件 可以引用的都是模块，webpack 中一切皆模块
- chunk - 多个模块合并成的一坨 例如 entry splitChunk import
- bundle - 最终的输出文件 一般一个 chunk 对应一个 bundle

# webpack 性能优化

## 优化打包构建速度  -  开发效率

#### 优化 babel-loader

一般不用于生产环境

```javascript
{
    test: /\.js$/,
    use: ['babel-loader?cacheDirectory'], //开启缓存
    include: path.resolve(__dirname, 'src'), //明确缓存范围
    // 排除范围可以用 exclude 用法和 include 一样
}
```

#### IgnorePlugin

例如 moment 主要对时间格式化，支持多国语言，但是打包时会将所有语言都打包进去。

```javascript
new webpack.IgnorePlugin(/\.\/locale/, /moment/) // 忽略locale文件夹
// 要用到时，可以手动引入
import 'moment/locale/zh-cn'
```

#### noParse

可用于生产环境

当 webpack 解析引用时会解析它的依赖，但是很多时候第三方库不用去考虑依赖

```javascript
module:{
    noParse:/jquery/,//不去解析jquery中的依赖库
    rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
    ]
},
```

#### happyPack

多进程打包，js 是单线程，所以可以使用多进程打包提升构建速度

```javascript
// 首先安装 happypack
const HappyPack = require('happypack')
module: {
    rules: [
        {
            test: /\.js$/,
            // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
            use: ['happypack/loader?id=babel'],
            include: srcPath,
            // exclude: /node_modules/
        },
    ]
}
plugins:[
    new HappyPack({
        // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        id: 'babel',
        // 如何处理 .js 文件，用法和 Loader 配置中一样
        loaders: ['babel-loader?cacheDirectory']
    }),
]
```

#### ParallelUglifyPlugin

多进程压缩 JS。和 happypack 同理。一般生产环境下使用。

webpack 内置 Uglify 工具压缩 JS，但是是单线程运行。

```javascript
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
plugins:[
    // 传递给 UglifyJS 的参数
    // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
    uglifyJS: {
        output: {
            beautify: false, // 最紧凑的输出
            comments: false, // 删除所有的注释
        },
        compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
        }
    }
]
```

#### 多进程

- 项目较大时，开启多进程能够提高速度
- 但是项目较小时，开启多进程的开销反而会降低速度

#### 自动刷新

一般使用 devserver 就会自动开启。不用于生产环境。

#### 热更新

不可用于生产环境。

- 自动刷新：整个网页全部刷新，速度较慢
- 自动刷新：整个网页全部刷新，状态会丢失
- 热更新：新代码生效，网页不刷新，状态不丢失

需要在代码中配置哪些模块需要热更新

```javascript
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
plugins: [
    new HotModuleReplacementPlugin()
],
devServer: {
    hot: true,
}
```

```javascript
if(module.hot){
    module.hot.accept([./js], ()=>{
        console.log('hot')
    })
}
```

#### DllPlugin

不用于生产环境。

动态链接库插件，webpack 内置支持

DllPlugin - 打包出 dll 文件

DllReferencePlugin - 使用 dll 文件

- 前端框架体积大，构建较慢
- 但是框架稳定，不常升级版本
- 所以同一个版本只构建一次即可，不用每次重新构建

```javascript
// 1、首先新建一个 js 文件来配置 DllPlugin
// 2、运行 npm run dll 来生成两个文件：dll 文件和描述这个 dll 文件的文件。
// 3、在生产环境中引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
// 4、不再转换 node_modules 的代码
exclude: /node_modules/
// 5、告诉 Webpack 使用了哪些动态链接库
new DllReferencePlugin({
    // 描述 react 动态链接库的文件内容
    manifest: require(path.join(distPath, 'react.manifest.json')),
}),
```

## 优化产出代码

#### 效果

- 打包代码体积更小
- 合理分包，不重复加载
- 速度更快，内存使用更少

#### 做法

- 小图片使用 base64 编码 - 不再网络请求

- bundle 加 hash

- 懒加载

- 提取公共代码

- IgnorePlugin

- CDN 加速

  先设置 CDN 的 url，再把静态文件放到 CDN 上

- 使用 production

- Scope Hosting

#### 使用 production

- 自动开启代码压缩 - webpack4 之后

- Vue React 等会自动删掉调试代码

- 启动 Tree-Shaking - 自动删掉没有被调用的函数

  ES6 Module 才能让 Tree-Shaking 生效， Commonjs 不行


#### ES6 Module 和 Commonjs

- ES6 Module 静态引入，编译时引入
- Commonjs 动态引入，执行时引入
- 只有 ES6 Module 才能静态分析

```javascript
let apiList = require('../config/api.js')
if(isDev){
    apiList = require('../config/api_dev.js')
}
```

```javascript
import apiList from '../config/api.js'
if(isDev){
    import apiList from '../config/api_dev.js' // 报错
}
```

#### Scope Hosting

打包时把多个文件打包成一个函数

- 代码体积更小
- 创建的函数作用域更少

```javascript
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
module.exports = {
    resolve: {
        mainFields: ['jsnext:main','browser', 'main']
    },
    plugins: [
        new ModuleConcatenationPlugin()
    ]
}
```

# babel

优先级相对于 webpack 更低。

## 环境搭建 & 基本配置

.babelrc

```javascript
{
    "presets":[  
        // 预设，是一堆常用 plugin 的集合,能满足常用语法的解析
      	["@babel/preset-env"]  
    ],
    "plugins":[
    ]
}
```

## babel-polyfill

- polyfill 本质是补丁，用来适配一些新的 api

- core-js 和 regenerater

  core-js 是一个标准的库，基本集成了所有的 polyfill

  regenerater 是一个 js 的 generater 的 polyfill

- babel-polyfill 是上面两个的结合

babel 7.4 之后弃用 babel-polyfill

推荐直接使用 core-js 和 regenerater

```javascript
import '@babel/polyfill'
// 新 api

Promise.resolve(100).then(data => data)
[1,2,3,4].includes(4)
// 虽然是新 api 但是语法符合 ES5，所以 babel 不会去转化它
// 可能浏览器不支持这些新的 api，所以需要 babel-polyfill 来对它进行一个兼容
// babel 不解析模块化
```

#### babel-polyfill 按需引入

- babel-polyfill 文件很大
- 一般不需要所有引入

.babelrc

```javascript
{
    "presets":[  
        // 预设，是一堆常用 plugin 的集合,能满足常用语法的解析
      	[
            "@babel/preset-env"
            {
            	"useBuiltIns": "usage", // 按需引入
            	"corejs": 3				// corejs 版本
            }
        ]  
    ],
    "plugins":[
    ]
}
```

#### 问题

污染全局

```javascript
window.Promise = function(){}
Array.prototype.includes = function(){}
//会直接修改全局的 Promise 和 includes
```

如果开发一个系统则可以，但是要做第三方库的话就要注意

## babel-runtime

解决全局污染的问题

```javascript
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
}
```

## 前端代码为何要构建和打包

#### 代码

- 体积更小，加载更快(Tree shaking、压缩、合并)
- 可以编译高级语言或语法(TS、ES6)
- 兼容性和错误检查

#### 流程

- 统一、高效的开发环境
- 统一的构建流程和产出标准
- 集成公司的构建规范

#### loader 与 plugin 区别

- loader 是一个转换器
- plugin 是扩展

#### 常用的 loader 和 plugin

- [loaders | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/loaders/)
- [Plugins | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/plugins/)

#### babel 和 webpack 的区别

- babel 是新语法编译工具，不关系模块
- webpack 是打包构建工具，是多个 loader 和 plugin 的集合

#### 如何产出一个 lib

```javascript
ouput:{
    // lib 文件名
    filename: 'lodash.js',
    // 输出目录
    path: distPath,
    // lib 全局变量名
    library: 'lodash',
}
```

#### babel-runtime 和 babel-polyfill 区别

#### webpack 懒加载

#### 为何 Proxy 不能被 Polyfill

- Promise 可以用 callback 来模拟
- class 可以用 function 来模拟

- Proxy 的功能用 defineProperty 模拟不了

#### webpack 常见性能优化手段















