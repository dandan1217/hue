/** @flow */

import {
  no,
  noop,
} from 'shared/util'

import { LIFECYCLE_HOOKS } from 'shared/constants'


const identity = (_) => _

export default ({
  /**
   * Option merge strategies
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to supress warnings
   */
  silent: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as
   * a component.
   */
  isReservedTag: no,

  /**
   * Check if a attribute is reserved so that it cannot be used as a 
   * component prop.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property
   */
  mustUseProp: no,
})