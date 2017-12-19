# webpack学习笔记

## 什么是Webpack

`WebPack`是一款`模块化打包工具`。

它做的事情是：分析你的项目结构，找到`JavaScript`模块以及其它的一些浏览器不能直接运行的拓展语言（`Scss`，`ES6`,`TypeScript`等），并将其转换和打包为合适的格式供浏览器使用。

## WebPack和Grunt以及Gulp的区别

其实`Webpack`和另外两个并没有太多的可比性，`Gulp`/`Grunt`是一种能够优化前端的开发流程的工具，而`WebPack`是一种模块化的解决方案，不过`Webpack`的优点使得`Webpack`在很多场景下可以替代`Gulp`/`Grunt`类的工具。

`Grunt`和`Gulp`的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务。如下图：

![`Gulp`/`Grunt`](./images/gulp.png)

`Webpack`的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：`index.js`），`Webpack`将从这个文件开始找到你的项目的所有依赖文件，使用`loaders`处理它们，最后打包为一个（或多个）浏览器可识别的`JavaScript`文件。如下图：

![`webpack`](./images/webpack.png)

如果实在要把二者进行比较，`Webpack`的处理速度更快更直接，能打包更多不同类型的文件。

## 使用Webpack

初步了解了`Webpack`工作方式后，我们一步步的开始学习使用`Webpack`。

### 安装

`Webpack`可以使用`npm`安装，新建一个空的练习文件夹（此处命名为`webpackSampleProject`），在终端中转到该文件夹后执行下述指令就可以完成安装。

```bash
//全局安装
npm install -g webpack
//安装到你的项目目录
npm install --save-dev webpack
```

### 正式使用Webpack前的准备

1.在上述练习文件夹中创建一个`package.json`文件，这是一个标准的`npm`说明文件，里面蕴含了丰富的信息，包括当前项目的依赖模块，自定义的脚本任务等等。在终端中使用`npm init`命令可以自动创建这个`package.json`文件。

```bash
npm init
```

输入这个命令后，终端会问你一系列诸如项目名称，项目描述，作者等信息，不过不用担心，如果你不准备在`npm`中发布你的模块，这些问题的答案都不重要，回车默认即可。

2.`package.json`文件已经就绪，我们在本项目中安装`Webpack`作为依赖包

```bash
//安装Webpack
npm install --save-dev webpack
```

3.回到之前的空文件夹，并在里面创建两个文件夹,app文件夹和public文件夹，app文件夹用来存放原始数据和我们将写的`JavaScript`模块，public文件夹用来存放之后供浏览器读取的文件（包括使用`webpack`打包生成的`js`文件以及一个`index.html`文件）。接下来我们再创建三个文件:

* `index.html` --放在public文件夹中;
* `Greeter.js` -- 放在app文件夹中;
* `main.js` -- 放在app文件夹中;

我们在`index.html`文件中写入最基础的`html`代码，它在这里目的在于引入打包后的js文件（这里我们先把之后打包后的js文件命名为`bundle.js`，之后我们还会详细讲述）。

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```

我们在`Hello.js`中定义一个返回包含问候信息的`html`元素的函数,并依据`CommonJS`规范导出这个函数为一个模块：

```javascript
// Hello.js
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "你好!";
  return greet;
};
```

`main.js`文件中我们写入下述代码，用以把`Hello模块`返回的节点插入页面。

```javascript
//main.js 
const hello = require('./Hello.js');
document.querySelector("#root").appendChild(hello());
```

### 正式使用webpack

webpack可以在终端中使用，在基本的使用方法如下：

```bash
# {extry file}出填写入口文件的路径，本文中就是上述main.js的路径，
# {destination for bundled file}处填写打包文件的存放路径
# 填写路径的时候不用添加{}
webpack {entry file} {destination for bundled file}
```

指定入口文件后，`webpack`将自动识别项目所依赖的其它文件，不过需要注意的是如果你的`webpack`不是全局安装的，那么当你在终端中使用此命令时，需要额外指定其在`node_modules`中的地址，继续上面的例子，在终端中输入如下命令

```bash
# webpack非全局安装的情况
node_modules/.bin/webpack app/main.js public/bundle.js
```

可以看出`webpack`同时编译了`main.js` 和`Greeter,js`,现在打开`index.html`,此时已经成功的使用`Webpack`打包了一个文件了。

不过在终端中进行复杂的操作，其实是不太方便且容易出错的，接下来看看`Webpack`的另一种更常见的使用方法。

### 通过配置文件来使用Webpack

`Webpack`拥有很多其它的比较高级的功能（比如说本文后面会介绍的`loaders`和`plugins`），这些功能其实都可以通过命令行模式实现，但是正如前面提到的，这样不太方便且容易出错的，更好的办法是定义一个配置文件，这个配置文件其实也是一个简单的`JavaScript`模块，我们可以把所有的与打包相关的信息放在里面。

继续上面的例子来说明如何写这个配置文件，在当前练习文件夹的根目录下新建一个名为`webpack.config.js`的文件，我们在其中写入如下所示的简单配置代码，目前的配置主要涉及到的内容是入口文件路径和打包后文件的存放路径。

```javascript
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```

说明：`__dirname`是`node.js`中的一个全局变量，它指向当前执行脚本所在的目录。

有了这个配置之后，再打包文件，只需在终端里运行`webpack(非全局安装需使用node_modules/.bin/webpack)`命令就可以了，这条命令会自动引用`webpack.config.js`文件中的配置选项。

又学会了一种使用`Webpack`的方法，这种方法不用管那烦人的命令行参数，有没有感觉很爽。如果我们可以连`webpack(非全局安装需使用node_modules/.bin/webpack)`这条命令都可以不用，那种感觉会不会更爽~，继续看下文。

### 更快捷的执行打包任务

在命令行中输入命令需要代码类似于`node_modules/.bin/webpack`这样的路径其实是比较烦人的，不过值得庆幸的是`npm`可以引导任务执行，对`npm`进行配置后可以在命令行中使用简单的`npm start`命令来替代上面略微繁琐的命令。在`package.json`中对`scripts`对象进行相关设置即可，设置方法如下。

```json
{
  "name": "webpacksimpleproject",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.10.0"
  }
}
```

说明：`package.json`中的`script`会安装一定顺序寻找命令对应位置，本地的`node_modules/.bin`路径就在这个寻找清单中，所以无论是全局还是局部安装的`Webpack`，你都不需要写前面那指明详细的路径了。

`npm`的`start`命令是一个特殊的脚本名称，其特殊性表现在，在命令行中使用`npm start`就可以执行其对于的命令，如果对应的此脚本名称不是`start`，想要在命令行中运行时，需要这样用`npm run {script name}`如`npm run build`。


### webpack本地服务器

`Webpack`提供一个可选的本地开发服务器，这个本地服务器基于`node.js`构建，可以实现在浏览器监听你的代码的修改的功能，不过它是一个单独的组件，在`webpack`中进行配置之前需要单独安装它作为项目依赖

```bash
npm install --save-dev webpack-dev-server
```

devserver作为webpack配置选项中的一项，以下是它的一些配置选项

|配置选项|功能描述|
|:-|:-|
|`contentBase`|默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）|
|`port`|设置默认监听端口，如果省略，默认为”8080“|
|`inline`|设置为true，当源文件改变时会自动刷新页面|
|`historyApiFallback`|在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html|

把这些命令加到webpack的配置文件中，现在的配置文件webpack.config.js如下所示

```javascript
module.exports = {
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public"
  } 
}
```

## loaders

### 鼎鼎大名的Loaders登场了！

`Loaders`是`webpack`提供的最激动人心的功能之一了。通过使用不同的`loader`，`webpack`有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换`scss`为`css`，或者把下一代的`JS`文件（`ES6`，`ES7`)转换为现代浏览器兼容的`JS`文件

`Loaders`需要单独安装并且需要在`webpack.config.js`中的`modules`关键字下进行配置，`Loaders`的配置包括以下几方面：

* `test`：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
* `loader`：loader的名称（必须）
* `include`/`exclude`：手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
* `query`：为loaders提供额外的设置选项（可选）

### Babel

Babel是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：

* 让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；
* 让你能使用基于JavaScript进行了拓展的语言，比如TypeScript

#### Babel的安装与配置

Babel其实是几个模块化的包，其核心功能位于称为`babel-core`的`npm`包中，`webpack`可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包。

```bash
npm install --save-dev babel-core babel-loader babel-preset-env
```

在`webpack`中的配置如下：

```javascript
//webpack.config.js
module.exports = {
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
```
在根目录下新建文件`.babelrc`，配置`babel`信息，`webpack`会自动调用`.babelrc`里的`babel`配置选项：
```json
//.babelrc
{
  "presets": [
    "env"
  ]
}
```
 现在用`ES6`语法重新编写你的`Hello.js`与`main.js`:

 ```javascript
// Hello.js
export default () => {
  let greet = document.createElement('div');
  greet.textContent = "你好!";
  return greet;
}
```

`main.js`文件中我们写入下述代码，用以把`Hello模块`返回的节点插入页面。

```javascript
//main.js 
import hello from "./Hello.js"
document.querySelector("#root").appendChild(hello());
```

此时，运行本地服务器，若在`ie浏览器`中可以正常显示，说明配置成功（高级浏览器默认支持`ES6`）

### CSS

`webpack`提供两个工具处理样式表，`css-loader` 和 `style-loader`，二者处理的任务不同：

`style-loader`提取`CSS`文件

`css-loader`处理`CSS`文件

二者组合在一起使你能够把样式表嵌入`webpack`打包后的`JS`文件中。

我们先安装这2个`loader`

```bash
npm install --save-dev style-loader css-loader
```

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}
```
这里要注意的是：先后顺序从前到后执行

接下来，在app文件夹里创建一个名字为"main.css"的文件，设置样式：

```css
/* main.css */
html {
  background: yellow;
}
```
把样式导入到main.js中
```javascript
//main.js
import hello from "./Hello.js";
import './main.css';
document.querySelector("#root").appendChild(hello());
```

### CSS预处理器

`Sass` 和 `Less` 之类的预处理器是对原生CSS的拓展，它们允许你使用类似于`variables`, `nesting`, `mixins`, `inheritance`等不存在于`CSS`中的特性来写`CSS`，`CSS预处理器`可以这些特殊类型的语句转化为浏览器可识别的`CSS`语句

你现在可能都已经熟悉了，在`webpack`里使用相关`loaders`进行配置就可以使用了，以下是常用的`CSS处理loaders`:

* Less Loader
* Sass Loader
* Stylus Loader

下面我们试着使用一下`sass-loader`

由于`sass-loader`的运行依赖于`node-sass`包，所以，安装：

```bash
npm install --save-dev sass-loader node-sass
```
配置
```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /(\.sass|\.scss)$/,
        loaders: ['style-loader', 'css-loader','sass-loader']
      }
    ]
  }
}
```
新建`app.scss`文件
```css
/* app.scss */
body {
  background: blue;
}
```
引入
```javascript
//main.js
import hello from "./Hello.js";
import './main.css';
import './app.scss';
document.querySelector("#root").appendChild(hello());
```

至此，我们已经谈论了处理`JS`的`Babel`和处理`CSS`的`SASS`的基本用法，它们其实也是两个单独的平台，配合`webpack`可以很好的发挥它们的作用。接下来介绍`Webpack`中另一个非常重要的功能-`Plugins`

## Plugins

插件（`Plugins`）是用来拓展`Webpack`功能的，它们会在整个构建过程中生效，执行相关的任务。

`Loaders`和`Plugins`常常被弄混，但是他们其实是完全不同的东西，

可以这么来说，`loaders`是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，`插件`并不直接操作单个文件，它直接对整个构建过程起作用。

`Webpack`有很多内置插件，同时也有很多第三方插件，可以让我们完成更加丰富的功能。

### 插件的使用

在`webpack`配置中的`plugins`关键字部分添加该插件的一个实例（`plugins`是一个数组）

继续上面的例子，我们添加一个给打包后代码添加版权声明的插件。

```javascript
//webpack.config.js
const webpack = require('webpack');
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /(\.sass|\.scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究')
  ]
}
```
这就是`webpack插件`的基础用法了，下面给大家推荐几个常用的插件

### HtmlWebpackPlugin

这个插件的作用是依据一个简单的`index.html`模板，生成一个自动引用你打包后的`JS`文件的新`index.html`。这在每次生成的`js文件名称不同`时非常有用（比如添加了`hash`值）。

安装：
```bash
npm install --save-dev html-webpack-plugin
```

在项目根目录下创建`index.html`文件模板
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>WSP</title>
</head>

<body>
  <div id='root'>
  </div>
</body>

</html>
```
更新`webpack`配置文件
```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...
  module: {
    ...
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html"
    })
  ]
}
```
再次执行`npm start`你会发现，`build`文件夹下面生成了`bundle.js`和`index.html`。

### 优化插件

`webpack`提供了一些在发布阶段非常有用的优化插件，它们大多来自于`webpack社区`，可以通过`npm`安装，通过以下插件可以完成产品发布阶段所需的功能

* `OccurenceOrderPlugin` :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
* `UglifyJsPlugin`：压缩JS代码；
* `ExtractTextPlugin`：分离CSS和JS文件

我们继续用例子来看看如何添加它们，`OccurenceOrder` 和 `UglifyJsPlugin` 都是内置插件，你需要做的只是安装其它非内置插件

```bash
npm install --save-dev extract-text-webpack-plugin
```
配置：
```javascript
//webpack.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /(\.sass|\.scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css")
  ]
}
```

### 缓存

缓存无处不在。

`webpack`可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体`（[name], [id] and [hash]）`到输出文件名前

以`hash`为例，为生成的js和css文件添加`hash`字符串

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: __dirname + '/app/main.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle-[hash].js'
  },
  devServer: {
    contentBase: "./build"
  },
  module: {
    ...
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style-[hash].css")
  ]
}
```
现在用户会有合理的缓存了。

### CleanWebpackPlugin

添加了`hash`之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多，因此这里介绍另外一个很好用的插件`clean-webpack-plugin`。

```bash
npm install --save-dev clean-webpack-plugin
```

配置
```javascript
...
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  ...
  plugins: [
    ...
    new CleanWebpackPlugin('build/*')
  ]
}
```