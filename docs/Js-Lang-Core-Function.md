# JavaScript 核心函数

## `fn.apply` vs `fn.call`
link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

这两者的语法基本一致， 最基本的区别在于， `fn.call`接受参数列表， 而`fn.apply`只接受一个单独数组作为参数

Syntax

````
fn.apply(thisArg, [argsArray])
fn.call(thisArg, arg1, arg2, ...)
```` 

link: https://stackoverflow.com/a/1986909
两者区别
`fn.apply`允许以一个数组的形式来传递`arguments`
`fn.call()`需要显式的列出参数
疑问： 
1. 是否可以用`fn.apply`替代`fn.call` ?
2. 在有`spread`语法的前提下是否可以用`fn.call`替代`fn.apply` ?

## 为什么 `fn.call` 比 `fn.apply` 快很多
link: https://stackoverflow.com/a/23770316
// TODO to write this

## `fn.bind`的特性以及应当如何实现`fn.bind`
link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
link: http://blog.csdn.net/u010552788/article/details/50850453
// TODO write this
