<template>
  <div>
    <h1>Register</h1>
    <form>
      <b-field
        v-for="field in vfields"
        v-bind:key="field.name"
        :label="field.label"
        :message="errors.first(field.name)"
        :type="{'is-danger': errors.has(field.name)}"
      >
        <b-input
          v-model="user[field.name]"
          :type="field.type"
          :name="field.name"
          v-bind="field.addition"
          v-events="{ ...field.events }"
          v-validate="field.veeValidate"
        />
      </b-field>
      <div>
        <b-button @click="handleSubmit">
          Register
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import requiredFields from '@/data/requiredFields.js'

export default {
  inject: ['$validator'],
  data () {
    return {
      user: {
        firstName: '',
        secondName: '',
        username: '',
        password: '',
        finPassword: '',
        country: 'RU',
        email: '',
        sponsor: 'testareg1',
        phone: ''
      },
      vfields: requiredFields
    }
  },
  methods: {
    handleSubmit (e) {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.register(this.user)
        }
      })
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$buefy.toast.open({
            message: 'Form is valid!',
            type: 'is-success',
            position: 'is-bottom'
          })
          return
        }
        this.$buefy.toast.open({
          message: 'Form is not valid! Please check the fields.',
          type: 'is-danger',
          position: 'is-bottom'
        })
      })
    },
    register (user) {
      this.$axios.$post(`${process.env.AUTH_API_ENDP}/user/`, JSON.stringify(user)).then((response) => {
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
$font-family:   "Roboto";
$font-size:     14px;
</style>
