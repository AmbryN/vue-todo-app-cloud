<template>
  <div class="col-8 offset-2 col-md-4 offset-md-4 mt-3">
    <form class="needs-validation">
        <div class="row">
            <div v-if="!apiSuccess" class="alert alert-warning text-center col-12 col-md-8 offset-md-2">
                {{ apiMessage }}
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-8 offset-md-2">
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input v-model="email" type="text" id="email" class="form-control" placeholder="Enter your e-mail" required> 
                </div>
            </div>
            <div class="col-12 col-md-8 offset-md-2">
                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter password" required>
                </div>
            </div>
            <div class="col-12 col-md-8 offset-md-2">
                <div class="form-group">
                    <label for="confirmation">Confirm password</label>
                    <input v-model="confirmation" type="password" id="confirmation" class="form-control" placeholder="Confirm password" required>
                </div>
            </div>
            <div class="col-12 col-md-4 offset-md-2">
                <button @click.stop="register" class="btn btn-primary btn-block">Register</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'register',
  data: () => {
      return {
        email: "",
        password: "",
        confirmation: ""
      }
  },
  computed: {
    ...mapState([
      'apiSuccess', 'apiMessage'
    ]),
    isEmail () {
        if (this.email.search('@') != -1) {
            return true
        } 
        else return false
    }
  },
  methods: {
      register () {
          if (this.isEmail) {
            let data = {
                user: {
                email: this.email,
                password: this.password,
                confirmation: this.confirmation
                }
            }
            this.$store.dispatch('register', data)
          } 
          else {
              alert("Your email doesn't match the pattern name@domain.com")
          }
      }
  }
}
</script>

<style scoped>
  
</style>
