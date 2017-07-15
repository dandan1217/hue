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

===

## el
+ 类型: `string | HTMLElement`
+ 限制: 只是由`new`创建的实例中遵守
+ 详细:
1. 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标
2. 在实例挂载之后,元素可以用 vm.$el 访问。
3. 所有的挂载元素都会被Vue生成的DOM替换

## render
+ 类型: `(createElement: () => VNode) => VNode`
+ 详细:
1. 接收一个createElement方法作为第一个参数创建`VNode`
2. 如果组件是一个函数组件，Render函数会接收一个额外的`context`参数，为没有实例的函数组件提供上下文信息。

## renderError
+ 类型: `(createElement: () => VNode, error: Error) => VNode`
+ 当`render`函数遭遇错误时，提供另外一种渲染输出，其错误会作为第二个参数传递给`renderError`
＋示例
````
new Vue({
  render (h) {
    throw new Error('oops')
  },
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack)
  }
}).$mount('#app')
````

===

## parent
+ 类型： `Vue instance`
+ 详细:
指定已创建的实例的父实例

## mixins
`mixins`接受一个混合对象的数组。这些混合实例对象可以像正常的实例对象一样包含选项。他们将在`Vue.extend()`里选择最终使用相同的选项合并逻辑。Mixin钩子按传入顺序依次调用。
+ 示例：
````
var mixin = {
  created: function () { console.log(1) }
}
var vm = new Vue({
  created: function () { console.log(2) },
  mixins: [mixin]
})
// -> 1
// -> 2
````

## extends
+ 类型: `Object | Function`
+ 详细：
允许声明扩展另一个组件（可以是一个简单的选项对象或构造函数）, 而无需使用`Vue.extend`。
这主要是为了便于扩展单文件组件。
与`mixins`类似，区别在于，组件自身的选项会比要扩展的源组件具有更高的优先级。
+ 示例：
````
var CompA = { ... }
// 在没有调用 Vue.extend 时候继承 CompA
var CompB = {
  extends: CompA,
  ...
}
````

## provide/inject
+ 类型:
  - provide: `Object | ()->Object`
  - inject: `Array<string>|{[key:string]:string | Symbol}`
+ 详细:
1. 这对选项需要一起使用，以允许一个祖先组件向所有子孙后代注入一个依赖。不论组件的层次有多深，并在上下游关系成立的时间里始终生效。

2. provide选项应该是一个对象或返回一个对象的函数，该对象包含可注入其子孙的属性。

3. `provide` 与 `indect` 绑定并不是可响应的。然而如果传入的是一个可监听的对象，那么其对象的属性还是可响应的。


