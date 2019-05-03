import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Exit from './views/Exit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: (route) => ({
          room: route.query.room,
      })
    },
    {
      path: '/exit',
      name: 'exit',
      component: Exit
    }
  ],
})
