function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({
  data: function () {
    return {
      rules: false,
      actions: ['spock', 'scissors', 'paper', 'lizard', 'rock'],
      pick: '',
      house: '',
      winner: '',
      score: 0,
      again: false
    }
  },
  created: function () {
    const score = localStorage.getItem('rpsls')

    if (score !== null) {
      this.score = parseInt(score)
    }
  },
  methods: {
    image: function (image) {
      if (image) {
        return `images/icon-${image}.svg`
      }

      return ''
    },
    picked: function (pick) {
      const that = this

      this.pick = pick

      setTimeout(function () {
        that.house = that.actions[randomInt(0, that.actions.length)]
        that.score += that.award(that.judge())
      }, 2000)
    },
    judge: function () {
      if (this.pick !== this.house) {
        console.log(this.pick)
        switch (this.pick) {
          case 'scissors':
            if (this.house === 'paper' || this.house === 'lizard') {
              return 1
            }
            break
          case 'paper':
            if (this.house === 'rock' || this.house === 'spock') {
              return 1
            }
            break
          case 'rock':
            if (this.house === 'lizard' || this.house === 'scissors') {
              return 1
            }
            break
          case 'lizard':
            if (this.house === 'spock' || this.house === 'paper') {
              return 1
            }
            break
          case 'spock':
            if (this.house === 'scissors' || this.house === 'rock') {
              return 1
            }
            break
        }

        return -1
      }

      return 0
    },
    award: function (result) {
      const that = this

      switch (result) {
        case 1:
          this.winner = 'you'
          break
        case -1:
          this.winner = 'house'
          break
        default:
          this.winner = 'tie'
      }

      setTimeout(function () {
        that.again = true
      }, 2000)

      return result
    },
    reset: function () {
      this.pick = ''
      this.house = ''
      this.winner = ''
      this.again = false
    }
  },
  watch: {
    score: function (score) {
      localStorage.setItem('rpsls', score)
    }
  }
})

const vm = app.mount('#app')
