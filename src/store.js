import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [],
        isAuthenticated: false,
        user: {},
        apiSuccess: true,
        apiMessage: ""
    },
    mutations: {
        getTodos (state, todos) {
            state.todos = todos
        },
        addTodo (state, newTodo) {
            state.todos.push(newTodo)
        },
        updateTodo (state, updatedTodo) {
            state.todos.map(todo => {
                if (todo._id === updatedTodo._id) {
                    return updatedTodo
                } else {
                    return todo
                }
            })
        },
        deleteTodo (state, id) {
            state.todos.map((todo, index) => {
                if (todo._id === id){
                    state.todos.splice(index, 1)
                }
            })
        },
        deleteDoneTodos (state) {
            for (let i = state.todos.length -1; i >= 0; i--){
                if (state.todos[i].done) {
                    state.todos.splice(i, 1)
                }
            }
        },
        login (state, user) {
            state.isAuthenticated = true
            state.user = {
                _id: user._id,
                email: user.email,
                token: `JWT ${user.token}`
            } 
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        loggedIn (state, user) {
            state.isAuthenticated = true
            state.user = user
        },
        logout (state) {
            state.isAuthenticated = false
            state.user = {}
            state.todos = []
            localStorage.removeItem("user")
        },
        API_SUCCESS (state) {
            state.apiSuccess = true
        },
        API_FAILURE (state, error) {
            state.apiSuccess = false
            state.apiMessage = error
        }
    },
    actions: {
        getTodosFromAPI (context) {
            let config = {
                headers: {
                    "Authorization": this.state.user.token
                }
            }
            axios.get("/api/todos", config)
                .then(response => {
                    context.commit('API_SUCCESS')
                    context.commit('getTodos', response.data)
                })
                .catch(error => context.commit('API_FAILURE', "Couldn't fetch todos"))
        },
        addTodo (context, name) {
            let config = {
                headers: {
                    "Authorization": this.state.user.token
                }
            }
            let newTodo = {
                name: name,
                done: false,
                userId: this.state.user._id
            }

            // POST it to server and into DB
            axios.post("/api/todos", newTodo, config)
                .then(response => {
                    context.commit('API_SUCCESS')
                    context.commit('addTodo', response.data)
                })
                .catch(error => context.commit('API_FAILURE', "Couldn't add todo"))
        },
        updateTodo (context, id) {
            let config = {
                headers: {
                    "Authorization": this.state.user.token
                }
            }
            // Find the todo with the right _id
            let updatedTodo = this.state.todos.find(todo => {
                return todo._id === id
            })
            updatedTodo.done = !updatedTodo.done

            // PUT it to server and into DB
            axios.put(`api/todos/${id}`, updatedTodo, config)
                    .then(response => {
                        context.commit('API_SUCCESS')
                        context.commit('updateTodo', response.data)
                    })
                    .catch(error => context.commit('API_FAILURE', "Couldn't update todo"))
        },
        deleteTodo (context, id) {
            let config = {
                headers: {
                    "Authorization": this.state.user.token
                }
            }
            axios.delete(`api/todos/${id}`, config)
                .then(() => {
                    context.commit('API_SUCCESS')
                    context.commit('deleteTodo', id)
                })
                .catch(error => context.commit('API_FAILURE', "Couldn't delete todo"))
        },
        deleteDoneTodos (context) {
            let config = {
                headers: {
                    "Authorization": this.state.user.token
                }
            }
            axios.delete('api/todos/done', config)
                .then(() => {
                    context.commit('API_SUCCESS')
                    context.commit('deleteDoneTodos')
                })
                .catch(error => context.commit('API_FAILURE', "Couldn't delete all done todos"))
        },
        login (context, user) {            
            axios.post('login', user)
                .then((response) => {
                    context.commit('API_SUCCESS')
                    context.commit('login', response.data.user)
                })
                .catch(error => {
                    context.commit('API_FAILURE', "There was an error while trying to log in")
                })
        },
        loggedIn (context, user) {
            context.commit('loggedIn', user)
        },
        logout (context) {
            context.commit('logout')
        },
        register (context, user) {
            axios.post('register', user)
                .then((response) => {
                    context.commit('API_SUCCESS')
                    context.commit('login', response.data.user)
                })
                .catch(error => context.commit('API_FAILURE', "There was an error while trying to register"))
        }
    }
})
