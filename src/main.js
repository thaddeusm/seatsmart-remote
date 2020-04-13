import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import store from './store'
import './registerServiceWorker'

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('https://seatsmart-remote-server.glitch.me')
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
