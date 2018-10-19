import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: []
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
            state.todos.map((todo, index) => {
                if (todo.done) {
                    state.todos.splice(index, 1)
                }
            })
        }
    },
    actions: {
        getTodosFromAPI (context) {
            axios.get("todos")
                .then(response => {
                    context.commit('getTodos', response.data)
                })
                .catch(error => console.log(error))
        },
        addTodo (context, name) {
            let newTodo = {
                name: name,
                done: false
            }

            // POST it to server and into DB
            axios.post("todos", newTodo)
                .then(response => {
                context.commit('addTodo', response.data)
                })
                .catch(error => console.log(error))
        },
        updateTodo (context, id) {
            // Find the todo with the right _id
            let updatedTodo = this.state.todos.find(todo => {
                return todo._id === id
            })
            updatedTodo.done = !updatedTodo.done

            // PUT it to server and into DB
            axios.put(`/todos/${id}`, updatedTodo)
                    .then(response => {
                    console.log(response.data)
                    context.commit('updateTodo', response.data)
                    })
                    .catch(error => console.log(error))
        },
        deleteTodo (context, id) {
            axios.delete(`/todos/${id}`)
                .catch(error => console.log(error))
            context.commit('deleteTodo', id)
        },
        deleteDoneTodos (context) {
            axios.delete('/todos/done')
                .catch(error => console.log(error))
            context.commit('deleteDoneTodos')
        }
    }
})
