<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component v-bind:is="component" />
</template>

<script>
/* eslint-disable vue/no-unused-components */
import ResetPassword from '~/components/ResetPassword.vue'
import ChangePassword from '~/components/ChangePassword.vue'

export default {
  components: {
    ResetPassword,
    ChangePassword
  },
  data () {
    return {
      component: ResetPassword
    }
  },
  mounted () {
    if (sessionStorage.getItem('token')) { this.component = ChangePassword } else { this.component = ResetPassword }
  },
  methods: {

  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.btn {
  margin-top: 15px;
}
</style>
