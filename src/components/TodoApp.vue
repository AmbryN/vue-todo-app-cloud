<template>
  <div>
    <TodoForm></TodoForm>
    <TodoList></TodoList>
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
  }
}
</script>

<style scoped>
  
</style>
