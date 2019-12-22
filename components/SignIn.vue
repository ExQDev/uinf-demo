<template>
  <div>
    <h1>Sign In</h1>
    <form>
      <b-field label="Username">
        <b-input
          v-model="username"
          type="text"
          name="username"
          required
        />
      </b-field>
      <b-field label="Password">
        <b-input
          v-model="password"
          type="password"
          name="password"
        />
      </b-field>
      <div>
        <b-button @click="handleSubmit">
          Login
        </b-button>
      </div>
    </form>
    <slot />
  </div>
</template>

<script>
import qs from 'query-string'

export default {
  data () {
    return {
      username: '',
      password: '',
      status: {
        loggingIn: false
      },
      submitted: false
    }
  },
  methods: {
    handleSubmit (e) {
      this.submitted = true
      const { username, password } = this
      if (username && password) {
        this.login({ username, password })
      }
    },
    login (payload) {
      const query = qs.stringify(payload)
      this.$axios.$get(`${process.env.AUTH_API_ENDP}/auth/?${query}`).then((response) => {
        sessionStorage.setItem('token', response.token)
        this.$router.push('/user')
      }).catch((error) => {
        console.error(error)
        this.$buefy.toast.open({
          duration: 5000,
          message: error,
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>

<style>
h1 {
  font-size: 32px;
  margin-bottom: 20px;
}
</style>
