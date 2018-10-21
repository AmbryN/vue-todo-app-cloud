import Login from '../components/Login'
import TodoApp from '../components/TodoApp'

module.exports = {
    routes: [
        { path: '/login', component: Login, name: 'login' },
        { path: '/', component: TodoApp, name: 'app' }
    ]
}