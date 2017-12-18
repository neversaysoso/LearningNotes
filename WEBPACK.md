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

* index.html --放在public文件夹中;
* Greeter.js -- 放在app文件夹中;
* main.js -- 放在app文件夹中;

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

