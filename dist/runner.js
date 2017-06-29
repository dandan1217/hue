var vm = {}

vm._watchers = []

var user = {
  'name': 'sky',
  'arr': [1, 2, 3, {'a': 'a des', 'b': 'b des'}] 
}

Hue.observe(user)

var watcher = new Hue.Watcher(vm,
  function(){ 
    return user['name'] 
  }, 
  function() {
    debugger
    console.log('call watcher callback')
    console.log('this.deps', this.deps)
  })

watcher.update()