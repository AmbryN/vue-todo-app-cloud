<template>
  <div class="row">
    <div id="todo-app" class="col-8 offset-2 col-md-4 offset-md-4 text-center">
      <TodoForm></TodoForm>
      <TodoList></TodoList>
    </div>
  </div>
</template>

<script>
import TodoForm from './TodoForm.vue'
import TodoList from './TodoList.vue'
import { mapState } from 'vuex'

export default {
  name: 'todo-app',
  components: {
    TodoForm, TodoList
  }, 
  computed: {
      ...mapState([
      'isAuthenticated'
    ]),
  }
}
</script>

<style scoped>
  
</style>
