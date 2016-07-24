1: 创建基本结构
1)创建一个项目叫做myapp在一个空白文件夹中。这个目录将会是项目的根目录。

$ mkdir myapp
$ cd myapp/
2)创建一个没有任何依赖关系的package.json，可以通过npm init。

{
"name": "myapp",
"version": "0.0.1",
"description": "My app",
"dependencies": { },
"devDependencies": { },
"author": "You"
}

3)创建一个index.html在该文件。这是真正显示在服务器的html。

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Vue Example</title>
  </head>
  <body>
      <h3>{{ message }}</h3>
    <script src="dist/build.js"></script>
  </body>
</html>

注意下面的两点：

dist/build.js并不存在
{{message}}的数据会被vue文件所填入

4)创建一个src文件夹和加上文件src/main.js:

import Vue from 'vue'

new Vue({
  el: 'body',
  data: {
      message: "Hello Vue"
  }
})



2.基本webpack构建
1)创建一个webpack.config.js：

module.exports = {
  // 这是一个主文件包括其他模块
  entry: './src/main.js',
  // 编译的文件路径
  output: {
      //`dist`文件夹
    path: './dist',
    // 文件 `build.js` 即 dist/build.js
    filename: 'build.js'
  },
  module: {
    // 一些特定的编译规则
    loaders: [
      {
        // 让webpack去验证文件是否是.js结尾将其转换
        test: /\.js$/,
        // 通过babel转换
        loader: 'babel',
        // 不用转换的node_modules文件夹
        exclude: /node_modules/
      }
    ]
  }
}

2)创建一个文件.babelrc。Babel是一个工具你可以转换ES6到现在的Javascript。Vue需要配置es2015和stage-0：

{
 "presets": ["es2015", "stage-0"],
 "plugins": ["transform-runtime"]
}

3)在命令行中安装webpack：

$ npm install -g webpack
安装本地库（作为dev dependencies），需要在package.json中添加devDependencies的部分。

"babel-core": "^6.1.2",
"babel-loader": "^6.1.0",
"babel-plugin-transform-runtime": "^6.1.2",
"babel-preset-es2015": "^6.1.2",
"babel-preset-stage-0": "^6.1.2",
"babel-runtime": "^5.8.0",
"webpack": "^1.12.2"
在保存后，运行：

$ npm install
注意我推荐用的是Vue初学者工具中最佳支持的版本，因为有时候最新的版本不能很好的支持。

最后，vuejs库安装到你的dependencies中。


$ npm install --save vue
如今你可以创建一个app用WebPack，运行

$ webpack
你可以看到输出文件：

Hash: 6568e32467dc12c8aeeb
Version: webpack 1.12.9
Time: 743ms
   Asset    Size  Chunks             Chunk Names
build.js  246 kB       0  [emitted]  main
    + 3 hidden modules
你打开index.html。如果你在浏览器上看到Hello Vue，那就做的非常好。恭喜，你基本完成基本的Vue项目。



3.vue-loader和.vue文件
1)现在我们要去做vuejs最奇妙的部分，构建组件通过.vue文件。

保存你的index.html如这样。

<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="utf-8">
 <title>Vue Example</title>
 </head>
 <body>
 <app></app>
 <script src="dist/build.js"></script>
 </body>
</html>
注意如今，用一个viewmodel替换根节点，用一个叫app的组件嫁接在<app></app>。

3.vue-loader和.vue文件
现在我们要去做vuejs最奇妙的部分，构建组件通过.vue文件。

保存你的index.html如这样。

<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="utf-8">
 <title>Vue Example</title>
 </head>
 <body>
 <app></app>
 <script src="dist/build.js"></script>
 </body>
</html>
注意如今，用一个viewmodel替换根节点，用一个叫app的组件嫁接在<app></app>。

把你的main.js的代码改成:

import Vue from 'vue'
import App from './app.vue'

new Vue({
 el: 'body',
 components: { App }
})
现在，注意我通过app.vue取一个部件叫App，并且将模板镶嵌在body元素中。

我们会创建一个文件src/app.vue，并加上这些代码:
<template>
    <div class="message">{{ msg }}</div>
</template>

<script>
export default {
 data () {
    return {
        msg: 'Hello from vue-loader!'
    }
 }
}
</script>

<style>
.message {
    color: blue;
}
</style>


在这个文件中，我们设置了style，定义了脚本的一些功能和定义了HTML的模板。如果你想知道它是怎么执行的，参考vue文档。

重新运行一下webpack，我们看到变化。

Hash: c71cc00f645706203ac4
Version: webpack 1.12.9
Time: 749ms
 Asset Size Chunks Chunk Names
build.js 246 kB 0 [emitted] main
 [3] ./src/app.vue 0 bytes [built] [failed]
 + 3 hidden modules

ERROR in ./src/app.vue
Module parse failed: /home/anirudh/work/misc/vue-scaffold/example/src/app.vue Line 1: Unexpected token <
You may need an appropriate loader to handle this file type.
| <template>
| <div class="message">{{ msg }}</div>
| </template>
 @ ./src/main.js 7:11-31
Webpack不懂得如何去处理.vue的新语法。修改你的webpack配置文件。


module.exports = {
    entry: './src/main.js',
    output: {
        path: './dist',
        publicPath: 'dist/',
        filename: 'build.js'
    },
     module: {
        loaders: [
           {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
     },
     vue: {
        loaders: {
             js: 'babel'
        }
    }
}

现在你可以加上一些库到你的package.json在devDependencies:

"css-loader": "^0.23.0",
 "style-loader": "^0.13.0",
 "vue-loader": "^7.3.0",
 "vue-html-loader": "^1.0.0",
运行npm install获取新的库，然后，运行webpack。

Hash: 740a1d3c85161f03a0cf
Version: webpack 1.12.9
Time: 1355ms
 Asset Size Chunks Chunk Names
build.js 258 kB 0 [emitted] main
 + 11 hidden modules
当你打开浏览器，你可以看到标题"Hello from vue-loader"蓝色字。这就意味着你的样式和JS都编译成功。


4.热模块替代/热更新
热模块替代或热更新是当今最热门新的技术。它让你保存 JavaScript文件，就把对应的组件实时更新。

原来的表现如下：

写一个App
在浏览器加载，并试用它
App进入一个状态被Vue所渲染在屏幕
这时，你想要一个快速修改或修复一个bug。你需要重新加载页面，操作所有的步骤到那个指定状态。

热更新让整个步骤变得简单：

打开一个App，操作到指定状态
修改源代码并保存
Webpack识别到代码变化，它重新编译被更改的指定模块
Webpack利用类似websockets的技术上传代码和更改线上浏览器的效果
Vue检测新的数据模型和热补丁, 和重新渲染app并保存着完整的状态

第一步我们需要用WebPack的dev server。 首先，修改你的devDependencies在package.json。

"vue-hot-reload-api": "^1.2.0",
运行一下代码

$ npm install
$ npm install -g webpack-dev-server
$ webpack-dev-server --inline --hot
当你用webpack-dev-server，你会看到一个很大的输出：

http://localhost:8080/
webpack result is served from /dist/
content is served from /home/anirudh/work/misc/vue-scaffold/example
Hash: ef5ed1df9062de968cb6
Version: webpack 1.12.9
Time: 1773ms
   Asset    Size  Chunks             Chunk Names
build.js  511 kB       0  [emitted]  main
chunk    {0} build.js (main) 465 kB [rendered]
    [0] multi main 52 bytes {0} [built]
    [2] (webpack)-dev-server/client?http://localhost:8080 2.48 kB {0} [built]
    [3] (webpack)/~/url/url.js 22.3 kB {0} [built]
    [... omitted for brevity ...]
   [85] ./~/vue-html-loader!./~/vue-loader/lib/selector.js?type=template&index=0!./src/app.vue 58 bytes {0} [built]
   [86] ./~/vue-hot-reload-api/index.js 5.62 kB {0} [built]
webpack: bundle is now VALID.

当你打开浏览器输入http://localhost:8080之后，你能看到一样的结果。但是不能真正的展示出Vue的热模块替换的牛逼之处。

接下来，你改你的src/app.vue:
    <template>
    <div class="message">Value is: {{ count }}</div>
    <a href="#" @click.prevent="increment">Increment</a>
    </template>

    <script>
    export default {
      data () {
        return {
          count: 0
        }
      },
      methods: {
        increment () {
          this.count ++;
        }
      }
    }
    </script>

    <style>
    </style>


    刷新http://localhost:8080，你可以看到一个计数器和增加按钮。 你点击计数器就会增加。
    现在你更新代码，改样式，改按钮名字或按钮的功能。你保存，组件就更新但是计数器的值还保持不变。

    5.接下来
    这并不是你项目需要的所有，但是它是你需要构建Vue的全部。但是在你要开始写App前，你还要花时间去Google和创建：

    分开开发和产品的构建方式
    你如果想独立为产品最小构建方式。你可以参考一下vue-loader-example webpack config。

    注意，移动你的webpack.config至一个特定文件夹需要你在命令行特别声明。

    测试
    测试其实超出了这教程的范围，测试取决于你App本身。 参考vue-loader-example test example的代码。

    图片，静态文件，CSS
    你需要自定义CSS和图片文件，webpack可以通过loader像file-loader，url-loader来优化开发流程。

    检查错误
    你可以用eslint-loader配置eslint直接运行Webpack。vue-loader-example 设置好.eslintrc文件。

    文／brandonxiang（简书作者）
    原文链接：http://www.jianshu.com/p/a5361bff1cd8