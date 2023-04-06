<template>
  <a @click="signin" class="btn btn-social btn-github">
    <i class="fa fa-github"></i>Connect with {{name}}
  </a>
</template>

<script>
export default {
  props: {
    name: String
  },
  methods: {
    signin() {
      window.OAuth.initialize('BTfcjv51Sd9sJJrfLVp8QyIBZUM');

      window.OAuth.popup('github').then((github) => {
        console.log('github:', github);
        github.me().then((data) => {
          console.log("data: ", data);
          alert("Your Github email: " + data.email + ".\nCheck console logs for more info.");

          this.$store.dispatch('signUp', {
            name: data.alias,
            email: data.email,
            password: 'password'
          }).then(response => {
            if (response.error) {
              this.errorRequest(response.message)
            } else {
              this.successRequest(response.message)
            }
          });
        });
      });
    }
  },
}
</script>

<style scoped>




</style>
