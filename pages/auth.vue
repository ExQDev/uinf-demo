<template>
  <div class="container">
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component v-bind:is="component" />
    <b-button @click="toggleSignUp()" class="btn">
      Swap view
    </b-button>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import SignIn from '~/components/SignIn.vue'
import SignUp from '~/components/SignUp.vue'

export default {
  components: {
    SignIn,
    SignUp
  },
  data () {
    return {
      component: SignIn
    }
  },
  methods: {
    toggleSignUp () {
      this.component = this.component === SignIn ? SignUp : SignIn
    }
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
