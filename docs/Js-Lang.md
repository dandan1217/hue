# JabvaScript Object 相关特性

## `Object.prototype.hasOwnProperty(obj, key)` vs `obj.hasOwnProperty(key)`

link: https://stackoverflow.com/questions/12017693/why-use-object-prototype-hasownproperty-callmyobj-prop-instead-of-myobj-hasow

区别在于：
- 1. `Object.create(null)` 没有 `__proto__`, 因此也没有`hasOwnProperty`这个方法
- 2. `hasOwnProperty`这个方法有可能被重写 (实际上`Object.prototype.hasOwnProperty`也可以被重写，只是基本不会有人这么蛋疼)
- 3. 从语法定义上，只有ECMAScript定义了每个object最终都会继承Object.prototype的继承模式（inherit scheme）,而JavaScript中的对象不一定非要遵守此模式，见1，因此不能默认所有对象都会继承Object.prototype

其他测试(chrome 59)
````
Object.prototype.hasOwnProperty(null, 'a') //false
null.hasOwnProperty(null, 'a') // exception

Object.prototype.hasOwnProperty(undefined, 'a') //false
undefined.hasOwnProperty(undefined, 'a') // exception

Object.prototype.hasOwnProperty(1, 'a') //v
1.hasOwnProperty(undefined, 'a') // exception
````
由此可见调用 `Object.prototype.hasOwnProperty` 也会更加稳定


## ES2015 `Symbols`
link: https://stackoverflow.com/questions/21724326/why-bring-symbols-to-javascript/22280202#22280202

本意是提供js的私有属性。
但目前可以通过反射`Object.getOwnPropertySymbols`来访问。
现在的用法是作为唯一符号，避免属性的名字冲突。
