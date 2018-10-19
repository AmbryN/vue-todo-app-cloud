<template>
  <div class="row">
    <div class="col-md-12">
      <h1>Todo-App</h1>
    </div>
    <div class="col-md-8 offset-md-2">
        <form id="form" class="form-group">
            <input id="todo" type="text" placeholder="New todo" autocomplete="off" class="form-control" v-model="name"/>
            <button @click.prevent="addTodo(name)" id="add-btn" class="btn btn-primary mt-2">Add</button>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoForm',
  data: () => {
    return {
      name: ""
    }
  },
  methods: {
    addTodo (name) {
      this.$store.dispatch('addTodo', name)
      this.name = ""
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
