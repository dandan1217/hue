import { eventsMixin } from 'core/instance/event'

describe('eventsMixin', () => {
  let Hue
  let spy1, spy2

  beforeAll(() => {
    Hue = function () { 
      this._events = Object.create(null)
    }
    eventsMixin(Hue)
    spy1 = jasmine.createSpy('callback1')
    spy2 = jasmine.createSpy('callback2')
  })

  afterAll(() => {
    Hue = null
  })

  it('on, off, once and emit events', () => {
    function fn1() {
      spy1()
    }
    function fn2() {
      spy2()
    }
    let h = new Hue()
    h.$on('event', fn1)
    h.$on('event', fn2)
    h.$on('event', fn2)
    h.$emit('event')
    expect(spy1.calls.count()).toBe(1)
    expect(spy2.calls.count()).toBe(2)
    
    h.$off('event', fn2)
    h.$off('event', fn2)
    h.$emit('event')
    expect(spy1.calls.count()).toBe(2)
    expect(spy2.calls.count()).toBe(2)

    h.$once('event', fn2)
    h.$emit('event')
    expect(spy1.calls.count()).toBe(3)
    expect(spy2.calls.count()).toBe(3)
    
    h.$emit('event')
    expect(spy1.calls.count()).toBe(4)
    expect(spy2.calls.count()).toBe(3)

    h.$on(['event2', 'event'], fn2)
    h.$emit('event')
    h.$emit('event2')
    expect(spy1.calls.count()).toBe(5)
    expect(spy2.calls.count()).toBe(5)
  })
})