<template>
  <div>
    <h1>Change password</h1>
    <form>
      <b-field label="Old Password">
        <b-input
          v-model="oldPassword"
          type="password"
          name="oldPassword"
          required
          password-reveal
        />
      </b-field>
      <b-field label="New Password">
        <b-input
          v-model="newPassword"
          type="password"
          name="newPassword"
          password-reveal
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
      <div>
        <b-button @click="handleSubmit">
          Change
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
      oldPassword: '',
      newPassword: '',
      type: '0',
      submitted: false
    }
  },
  methods: {
    handleSubmit (e) {
      this.submitted = true
      const { oldPassword, newPassword, type } = this
      if (oldPassword && newPassword) {
        this.changePass({ oldPassword, newPassword, type, token: sessionStorage.getItem('token') })
      }
    },
    changePass (payload) {
      this.$axios.$post(`${process.env.AUTH_API_ENDP}/user/changePassword`, JSON.stringify(payload)).then((response) => {
        this.$router.push('/user')
        this.$buefy.toast.open({
          message: 'Success!',
          type: 'is-success',
          position: 'is-bottom'
        })
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
