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

  it('proxy computed property', () => {
    var vm = new Hue({
      data: { a: 1 },
      computed: {
        gv: function () {
          return this.a * 2
        },
        sv: {
          get: function () {
            return this.a + 1
          },
          set: function (v) {
            this.a = v - 1
          }
        }
      }
    })
    expect(vm.gv).toBe(2)
    vm.sv = 3
    expect(vm.a).toBe(2)
    expect(vm.gv).toBe(4)
  })

  it('cached computed property', () => {
    var vm = new Hue({
      computed: function () {
        return new Date()
      }
    })
    var date1 = vm.date
    var date2 = vm.date
    expect(date1).toBe(date2)
  })

  it('proxy methods and bind context', () => {
    var vm = new Hue({
      methods: {
        getContext() {
          return this
        }
      }
    })
    expect(vm.getContext()).toBe(vm)
  })
})