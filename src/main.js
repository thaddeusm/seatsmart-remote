import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import store from './store'

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:4000')
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
