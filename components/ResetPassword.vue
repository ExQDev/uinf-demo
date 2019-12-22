<template>
  <div>
    <h1>Reset password</h1>
    <form>
      <b-field label="Username">
        <b-input
          v-model="username"
          type="text"
          name="username"
          required
        />
      </b-field>
      <b-field label="Finance Password">
        <b-checkbox
          v-model="type"
          name="newPassword"
          true-value="1"
          false-value="0"
        />
      </b-field>
      <div class="form_group">
        <b-button @click="handleSubmit">
          Reset
        </b-button>
      </div>
    </form>
    <slot />
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      type: 0
    }
  },
  methods: {
    handleSubmit (e) {
      const { username, type } = this
      if (username) {
        this.changePass({ username, type })
      }
    },
    changePass (payload) {
      this.$axios.$post(`${process.env.AUTH_API_ENDP}/user/resetPassword/`, JSON.stringify(payload)).then((response) => {
        console.log(response)
        this.$router.push('/user')
        this.$buefy.toast.open({
          message: 'Success!',
          type: 'is-success',
          position: 'is-bottom'
        })
      }).catch((error) => {
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
