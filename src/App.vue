<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Todo-App</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li v-if="!isAuthenticated" class="nav-item">
            <a class="nav-link" href="#"><router-link to="/login">Login</router-link></a>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <a class="nav-link" href="#"><router-link to="/register">Register</router-link></a>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <a class="nav-link" href="#" @click.stop="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'app',
  mounted () {
    if (localStorage.getItem('user')){
      let user = JSON.parse(localStorage.getItem('user'))
      this.setLoggedInUser(user)
    }
    if (!this.isAuthenticated) {
      this.$router.push('/login')
    }
    else {
      this.$router.push('/')
      this.getTodosFromAPI()
    }
  },
  watch: {
      isAuthenticated () {
          if (!this.isAuthenticated) this.$router.push('/login')
          else {
            this.$router.push('/')
            this.getTodosFromAPI()
          }
      }
  },
  computed: {
    ...mapState([
      'isAuthenticated'
    ]),
  },
  methods: {
    setLoggedInUser (user) {
      this.$store.dispatch('loggedIn', user)
    },
    getTodosFromAPI () {
      this.$store.dispatch('getTodosFromAPI')
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
  @import "./assets/style.css";
</style>
