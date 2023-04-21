<template>
  <div>
      <GoogleLogin class="btn-google" :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login with Google</GoogleLogin>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
    name: "GoogleComponent",
    data() {
        return {
           params: {
               client_id: "39499664859-66cms54vlknh36is96s20oc1c8vq09lp.apps.googleusercontent.com",
           },
        };
    },
    components: {
        GoogleLogin,
    },
    methods: {
        onSuccess(googleUser) {
            console.log(googleUser);
            const token = googleUser.getAuthResponse().id_token;
            console.log(token);
            this.$router.push("/protected");
        },
        onFailure(error) {
            console.log(error);
        },
    },
}
</script>

<style>

.btn-google {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
    margin: 5px;
}

.btn-google:hover {
    background-color: #0f69ff;
}


</style>