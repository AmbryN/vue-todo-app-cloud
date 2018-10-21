<template>
  <div class="row">
    <div class="col-md-12">
      <form>
        <div class="form-group row mt-2">
          <div class="ml-auto">
            <input id="todo" type="text" placeholder="New todo" autocomplete="off" class="form-control" v-model="name"/>
          </div>
          <div class="mr-auto ml-1">
            <button @click.prevent="addTodo(name)" id="add-btn" class="btn btn-primary">Add</button>
          </div>
        </div>
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
