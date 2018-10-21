<template>
<div>
    <div class="row">
        <button v-if="hasDoneTodos" @click.stop="deleteDoneTodos()" class="btn btn-warning mx-auto mt-1">Delete done todos</button>
    </div>
    <div class="row">
        <div v-if="todos.length > 0" class="col-10 offset-1 col-md-2 mx-auto mt-3">
            <ul class="list-group">
                <li v-for="todo in todos" :class="{ disabled:todo.done }" 
                    @click="updateTodo(todo._id)" class="list-group-item text-center d-flex mt-1" :key="todo._id">
                        <i v-if="todo.done" class="material-icons">check</i>{{todo.name}} <button @click.stop="deleteTodo(todo._id)" class="btn btn-danger ml-auto">Delete</button>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: 'TodoList',
    computed: {
        ...mapState([
            'todos', 'isAuthenticated'
        ]),
        hasDoneTodos () {
            for(let i=0; i<this.todos.length; i++) {
                if (this.todos[i].done) {
                    return true
                }
            }
            return false;
        }
    },
    methods: {
        getTodosFromAPI () {
            this.$store.dispatch('getTodosFromAPI')
        },
        addTodo (name) {
            this.$store.dispatch('addTodo', name)
        },
        updateTodo (id) {
            this.$store.dispatch('updateTodo', id)
        },
        deleteTodo (id) {
            this.$store.dispatch('deleteTodo', id)
        },
        deleteDoneTodos () {
            this.$store.dispatch('deleteDoneTodos')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
