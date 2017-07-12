# Vue options

## data

+ 类型： `Object | Function`
+ 详情：

1. Vue实例的数据对象，Vue会递归的将其转换为getter/setter,从而让data属性能够相应数据变化。对象必须是纯粹的对象。
2. Vue实例代理了data对象上所有的属性。
3. 以`_`或`$`开头的属性不会被Vue实例代理，因为它们可能和Vue内置的属性,API方法冲突。
4. 当一个组件被定义，`data`必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果data仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供data函数，每次创建一个新实例后，我们能够调用`data`函数来返回一个全新的副本数据对象。

## props
+ 类型： `Array<string> | Object`
+ 详情

props可以数组或对象，用于接收父组件的数据。props可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测，自定义检验和设置默认值。
````
// 简单语法
Vue.component('props-demo-simple', {
  props: ['size', 'myMessage']
})
// 对象语法，提供校验
Vue.component('props-demo-advanced', {
  props: {
    // 只检测类型
    height: Number,
    // 检测类型 + 其他验证
    age: {
      type: Number,
      default: 0,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    }
  }
})
````

## propsData
+ 类型 { [key: string]: any}
+ 限制： 只用于 `new` 创建的实例中
+ 详细：
创建实例时传递props。主要作用是方便测试
+ 示例:
````
var Comp = Vue.extend({
  props: ['msg'],
  template: '<div>{{ msg }}</div>'
})
var vm = new Comp({
  propsData: {
    msg: 'hello'
  }
})
````

## computed
+ 类型 {[key:string]: Function | {get: Function, set: Function}}
+ 详细：
1. 计算属性会被混入Vue实例中。所有的getter和setter的this上下文自动绑定为Vue实例
2. 计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。
+ 示例
````
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取，值只须为函数
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // -> 2
vm.aPlus = 3
vm.a       // -> 2
vm.aDouble // -> 4
````

## methods
+ 类型: `{ [key: string]: Function }`
+ 详细
1. methods 将被混入到 Vue 实例中。

+ 示例
````
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
````

## watch
+ 类型 `{ [key: string]: string | Function | Object }`

+ 详细
一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。
````
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',
    // 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    }
  }
})
vm.a = 2 // -> new: 2, old: 1
````
