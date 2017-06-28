/*!
 * Hue.js v1.0.0
 * (c) 2014-2017 Xiaofeng Lu
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Vue = global.Vue || {})));
}(this, (function (exports) { 'use strict';

/**  */

exports.target = null;

var targetStack = [];

function pushTarget(_target) {
  if(exports.target){
    targetStack.push(exports.target);
  }
  exports.target = _target;
}

function popTarget() {
  exports.target = targetStack.pop();
}

/**  */

function remove(arr, obj) {
  var j = 0;
  for(var i = 0, l = arr.length; i < l; i++) {
    if(arr[j] !== obj){
      arr[j] = arr[i];
      j++;
    }
  }
}

/**  */

var uid = 0;

var Dep = function Dep(){
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub){
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub){
  remove(this.subs, sub);
};

Dep.prototype.notify = function notify () {
  var subs = this.subs.slice();
  for(var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

/*  */

exports.Dep = Dep;
exports.pushTarget = pushTarget;
exports.popTarget = popTarget;

Object.defineProperty(exports, '__esModule', { value: true });

})));
