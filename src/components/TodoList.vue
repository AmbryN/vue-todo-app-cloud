<template>
<div class="row">
    <div v-if="hasDoneTodos" class="col-md-5 mx-auto">
        <button @click.stop="deleteDoneTodos()" class="btn btn-warning btn-block ml-auto">Delete done todos</button>
    </div>
    <div v-if="todos.length > 0" class="mt-3 col-md-8 offset-md-2">
        <ul class="list-group">
            <li v-for="todo in todos" :class="{ disabled:todo.done }" 
                @click="updateTodo(todo._id)" class="list-group-item text-center d-flex" :key="todo._id">
                    <i v-if="todo.done" class="material-icons">check</i>{{todo.name}} <button @click.stop="deleteTodo(todo._id)" class="btn btn-danger ml-auto">Delete</button>
            </li>
        </ul>
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
