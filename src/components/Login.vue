<template>
  <div class="col-8 offset-2 col-md-4 offset-md-4 mt-3">
    <form>
        <div class="row">
            <div class="col-12 col-md-8 offset-md-2">
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input v-model="email" type="text" id="email" class="form-control" placeholder="Enter your e-mail"> 
                </div>
            </div>
            <div class="col-12 col-md-8 offset-md-2">
                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter password">
                </div>
            </div>
            <div class="col-12 col-md-4 offset-md-2 mt-1">
                <button @click.stop="login" class="btn btn-primary btn-block">Login</button>
            </div>
            <div class="col-12 col-md-4 mt-1">
                <button @click.stop="redirectToRegister" class="btn btn-primary btn-block">Register</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
import TodoForm from './TodoForm.vue'
import TodoList from './TodoList.vue'
import { mapState } from 'vuex'
export default {
  name: 'login',
  data: () => {
      return {
        email: "",
        password: ""
      }
  },
  computed: {
      ...mapState([
      'isAuthenticated'
    ]),
    isEmail () {
        if (this.email.search('@') != -1) {
            return true
        } 
        else return false
    }
  },
  methods: {
    login () {
        if (this.isEmail) {
        let data = {
            user: {
                email: this.email,
                password: this.password
            }
        }
        this.$store.dispatch('login', data)
        }
        else alert("Your email doesn't match the pattern name@domain.com")
    },
    redirectToRegister () {
        this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
  
</style>
