<template>
  <div class="container">
    <h1>Partners</h1>
    <b-table
      :data="partners"
      :columns="columns"
      class="m-table"
    >
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large"
              />
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  data () {
    return {
      partners: [],
      columns: [
        {
          field: 'username',
          label: 'Username'
        },
        {
          field: 'email',
          label: 'Email'
        },
        {
          field: 'online',
          label: 'Online'
        }
      ]
    }
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push('/auth')
    } else {
      this.token = sessionStorage.getItem('token')
      this.$axios.get(`${process.env.AUTH_API_ENDP}/user/personalPartners/?token=${this.token}`).then((response) => {
        this.setPartners(response.data)
      }).catch(console.error)
    }
  },
  methods: {
    setPartners (kPartners) {
      this.partners = kPartners
    }
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 70vh;
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

.m-table {
  min-width: 600px;
}
</style>
