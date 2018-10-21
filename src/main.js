import Vue from 'vue'
import App from './App.vue'
import store from './store.js'
import VueRouter from 'vue-router'

import Register from './components/Register'
import Login from './components/Login'
import TodoApp from './components/TodoApp'

const routes = [
  { path: "/register", component: Register, name: 'register'},
  { path: '/login', component: Login, name: 'login' },
  { path: '/', component: TodoApp, name: 'app' }
]

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
