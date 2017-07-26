var options = {
  data: {
    name: 'dandan',
    age: '12',
    city: ['shanghai', 'guangzhou', 'shenzhen'],
    others: {
      birthday: 19960518
    }
  },
  methods: {
    eat(food){
      console.log(this, 'eat', food)
    },
    sleep(time) {
      console.log(this, 'sleep', time)
    }
  },
  computed: {
    allCity: function(){
      return this.$data.city.join(',')
    }
  }
}

var h = new Hue(options)