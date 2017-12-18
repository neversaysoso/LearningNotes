# webpack学习笔记

## 1.什么是Webpack

`WebPack`是一款`模块化打包工具`。

它做的事情是：分析你的项目结构，找到`JavaScript`模块以及其它的一些浏览器不能直接运行的拓展语言（`Scss`，`ES6`,`TypeScript`等），并将其转换和打包为合适的格式供浏览器使用。

## 2.WebPack和Grunt以及Gulp的区别

其实`Webpack`和另外两个并没有太多的可比性，`Gulp`/`Grunt`是一种能够优化前端的开发流程的工具，而`WebPack`是一种模块化的解决方案，不过`Webpack`的优点使得`Webpack`在很多场景下可以替代`Gulp`/`Grunt`类的工具。

![`Gulp`/`Grunt`](./images/gulp.png)

![`webpack`](./images/webpack.png)