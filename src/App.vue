<template>
  <div id="todo-app" class="col-md-4 offset-md-4 text-center">
    <TodoForm></TodoForm>
    <TodoList></TodoList>
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'app',
  components: {
    TodoForm, TodoList
  }
}
</script>

<style>
  @import "./assets/style.css";
</style>
