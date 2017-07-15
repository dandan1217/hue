/** @flow */
import { initMixin } from './init'
import { eventsMixin } from './event'

function Hue(options) {
  if (!(this instanceof Hue)) {
    throw new Error("Hue is a constructor and should be called with `new` keyword")
  }
  this._init(options)
}

initMixin(Hue)
eventsMixin(Hue)

export default Hue