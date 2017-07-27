import { initState, stateMixin } from 'core/instance/state'

describe('state', () => {
  let Hue
  let spy1, spy2

  beforeAll(() => {
    Hue = function (options) {
      this.$options = options
      initState(this)
    }
    stateMixin(Hue)
  })

  afterAll(() => {
    Hue = null
  })

  it('proxy and observe data option', () => {
    var data = { a: 1 }
    var vm = new Hue({ data: data })
    expect(vm.a).toBe(1)
    expect(vm.$data).toBe(data)
  })
})