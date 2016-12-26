var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
// Setup Firebase
var config = {
    apiKey: "AIzaSyCw-ci4EIVVgw0lWTE5OVyFGPX9I1KKbXo",
    authDomain: "moses-fb9ff.firebaseapp.com",
    databaseURL: "https://moses-fb9ff.firebaseio.com",
    storageBucket: "moses-fb9ff.appspot.com",
    messagingSenderId: "70993165704"
  };
firebase.initializeApp(config)
var concertsRef = firebase.database().ref('concerts')

// create Vue app
var app = new Vue({
  // element to mount to
  el: '#app',
  // initial data
  data: {
    newConcert: {
      name: '',
      duration: '',
      date: Date
    }
  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  firebase: {
    concerts: concertsRef
  },
  // computed property for form validation state
  computed: {
    validation: function () {
      return {
        name: !!this.newConcert.name.trim(),
        duration: this.newConcert.duration
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  // methods
  methods: {
    addConcert: function () {
      if (this.isValid) {
        concertsRef.push(this.newConcert)
        this.newConcert.name = ''
        this.newConcert.description = ''
        this.newConcert.date = Date
        this.newConcert.duration = 1
      }
    },
    removeConcert: function (concert) {
      concertsRef.child(concert['.key']).remove()
    }
  }
})
