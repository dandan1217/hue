import { schedule as _schedule } from 'core/observer/scheduler'

function schedule(watcher) {
  watcher.vm = {}
  _schedule(watcher)
}

describe('scheduler', () => {
  let spy

  beforeEach(() => {
    spy = jasmine.createSpy('scheduler')
  })

  it('runs watcher after nexttick', done => {
    schedule({
      run: ()=>{
        spy()
      }
    })
    waitForUpdate(() => {
      expect(spy.calls.count()).toBe(1)
    }).then(done)
  })

  it('dedup watchers before flushing', done => {
    schedule({
      id: 1,
      run: spy
    })
    schedule({
      id: 1,
      run: spy
    })
    waitForUpdate(() => {
      expect(spy.calls.count()).toBe(1)
    }).then(done)
  })

  it('allow duplicate when flushing', done => {
    const watcher = {
      id: 1,
      run: spy
    }
    schedule(watcher)
    schedule({
      id: 2,
      run: () => {
        schedule(watcher)
      }
    })
    waitForUpdate(()=>{
      expect(spy.calls.count()).toBe(2)
    }).then(done)
  })
})