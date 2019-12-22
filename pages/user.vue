<template>
  <div class="container">
    <h1>Profile</h1>
    <form>
      <span v-if="user && user.sponsor">
        Sponsor: {{ user.sponsor.username }}
      </span>
      <div class="m-grid">
        <b-field
          v-for="field in ufields"
          v-bind:key="field.name"
          :label="field.label"
          :message="errors.first(field.name)"
          :type="{'is-danger': errors.has(field.name)}"
          class="m-field"
        >
          <b-input
            v-if="field.type !== 'checkbox' && field.type !== 'date'"
            v-model="user[field.name]"
            :name="field.name"
            :type="field.type"
            v-bind="field.addition"
            v-events="{ ...field.events }"
            v-validate="field.veeValidate"
          />
          <b-datepicker
            v-if="field.type === 'date'"
            v-model="user[field.name]"
            :name="field.name"
            v-bind="field.addition"
            v-events="{ ...field.events }"
            placeholder="Click to select..."
            icon="calendar-today"
          />
          <b-checkbox
            v-if="field.type === 'checkbox'"
            v-model="user[field.name]"
            true-value="1"
            false-value="0"
          />
          <div v-if="submitted && errors.length > 0" class="invalid-feedback">
            {{ errors[0] }}
          </div>
        </b-field>
      </div>
      <div>
        <b-button @click="handleSubmit" class="m-btn">
          Save
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import moment from 'moment'
import userFields from '@/data/userFields.js'

export default {
  inject: ['$validator'],
  data () {
    return {
      submitted: false,
      user: {},
      persistentUser: {},
      ufields: userFields
    }
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push('/auth')
    } else {
      this.token = sessionStorage.getItem('token')
      this.$axios.get(`${process.env.AUTH_API_ENDP}/user/?token=${this.token}`).then((response) => {
        this.setUser(response.data)
      }).catch(console.error)
    }
  },
  methods: {
    setUser (kPersistentUser) {
      this.persistentUser = kPersistentUser
      this.user = this.ufields.reduce((accum, ufield) => {
        let newField
        if (Object.keys(this.persistentUser.links).some(key => key === ufield.name)) {
          newField = this.persistentUser.links[ufield.name]
        } else if (Object.keys(this.persistentUser.settings).some(key => key === ufield.name)) {
          newField = this.persistentUser.settings[ufield.name]
        } else {
          newField = ufield.type === 'date' ? moment(this.persistentUser[ufield.name]).toDate() : this.persistentUser[ufield.name]
        }
        return {
          ...accum,
          [ufield.name]: newField
        }
      }, {})
    },
    handleSubmit (e) {
      this.submitted = true
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.save(this.user)
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
    save (user) {
      Object.keys(user).forEach(field => !user[field] && delete user[field])
      user.token = sessionStorage.getItem('token')
      this.$axios.$put(`${process.env.AUTH_API_ENDP}/user/`, JSON.stringify(user)).then((response) => {
        this.setUser(response)
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

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
$font-family:   "Roboto";
$font-size:     14px;
h1 {
  font-size: 32px;
}

.m-grid {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  max-width: 750px;
}

.m-field {
  width: 220px;
}
</style>
