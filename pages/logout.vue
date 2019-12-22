<template>
  <div />
</template>

<script>

export default {
  mounted () {
    sessionStorage.removeItem('token')
    this.$router.push('/')
  }
}
</script>
