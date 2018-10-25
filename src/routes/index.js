import Login from '../components/Login'
import TodoApp from '../components/TodoApp'
import Register from '../components/Register.vue'

export const routes = [
    { path: "/register", component: Register, name: 'register'},
    { path: '/login', component: Login, name: 'login' },
    { path: '/', component: TodoApp, name: 'app' }
]
