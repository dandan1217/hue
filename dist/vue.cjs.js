/*!
 * Hue.js v1.0.0
 * (c) 2014-2017 Xiaofeng Lu
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**  */

function remove(arr, obj) {
  var j = arr.indexOf(obj);
  if (j > -1) {
    return arr.splice(j, 1)
  }
}

function extend(obj, keys, values) {
  for(var i = 0, l = keys.length; i < l; i++) {
    obj[keys[i]] = values[i];
  }
}

/**  */

var uid = 0;

var Dep = function Dep() {
  this.id = uid++;
    this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

Dep.target = null;

var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*  */

var arrayProto = Array.prototype;

var arrayMethods$1 = Object.create(arrayProto)

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  var original = arrayProto[method];
  def(arrayMethods$1, method, function mutator() {
    var arguments$1 = arguments;

    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    ob.dep.notify();
    return result
  });
});

var seenObjects = new Set();

function traverse(val) {
  _tarverse(val, seenObjects);
  seenObjects.clear();
}

function _tarverse(val, seen) {
  var isA = Array.isArray(val);

  if ((!isA(val) && !isObject(val)) ||
    !Object.isExtensible(val)) {
    return
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    seen.add(depId);
  }

  if (isA) {
    var i = val.length;
    while (i--) {
      _tarverse(val[i]);
    }
  } else {
    var keys = Object.keys(val);
    var i$1 = keys.length;
    while (i$1--) {
      _tarverse(val[keys[i$1]], seen);
    }
  }

}

/*  */

var uid$1 = 0;

var Watcher = function Watcher(vm, getter, cb, options) {
  this.vm = vm;
  vm._watchers.push(this);
  this.id = ++uid$1;
  this.getter = getter;
  this.cb = cb;

  this.deps = [];
  this.newDeps = [];
  this.depIds = new Set();
  this.newDepIds = new Set();

  this.value = this.get();
};

Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  value = this.getter.call(vm, vm);
  traverse(value);
  popTarget();
  this.cleanDeps();
  return value
};

Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

Watcher.prototype.cleanDeps = function cleanDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  tmp.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps.length = 0;
};

Watcher.prototype.update = function update () {
  queueWatcher(this);
};

Watcher.prototype.run = function run () {
  var value = this.get();
  if (value !== this.value) {
    var oldValue = this.value;
    this.value = value;
    this.cb.call(this.vm, value, oldValue);
  }
};

Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  value.__ob__ = this;

  if (Array.isArray(value)) {
    extend(value, arrayKeys, arrayMethods); // make array itself active
    this.observeArray(value); // make array children active
  } else {
    this.walk(value); // 
  }
};

Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};


function observe(value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (Array.isArray(value) ||
    isPlainObject(value) && Object.isExtensible(value)) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    vm.vmCount++;
  }
  return ob
}

function defineReactive(obj, key, val) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.Depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}


function set(obj, key, val) {
  if (Array.isArray(obj) && typeof key === 'number') {
    obj.length = Math.max(obj.length, key);
    obj.splice(key, 1, val);
  }

  if (hasOwn(obj, key)) {
    obj[key] = val;
    return val
  }

  var ob = obj.__ob__;
  if (ob && ob.vmCount) {
    return val
  }
  if (!ob) {
    obj[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

function del(obj, key) {
  if (Array.isArray(obj) && typeof key === 'number') {
    obj.splice(key, 1);
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  var ob = obj.__ob__;
  delete obj[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

function dependArray(arr) {
  for (var i = 0, l = arr.length; i < l; i++) {
    var val = arr[i];
    val && val.__ob__ && val.__ob__.dep.depend();
    if (Array.isArray(val)) {
      dependArray(val);
    }
  }
}

/*  */

exports.pushTarget = pushTarget;
exports.popTarget = popTarget;
exports.arrayMethods = arrayMethods$1;
exports.Observer = Observer;
exports.observe = observe;
exports.defineReactive = defineReactive;
exports.set = set;
exports.del = del;
