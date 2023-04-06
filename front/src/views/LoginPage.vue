<template>
  <div>
      <v-card elevation="5" style="margin-top: 150px;">
          <div class="card-body">
              <v-card-title class="login-title">
                  Login
              </v-card-title>
              <v-form @submit.prevent="handleSubmit">
                  <label for="email">Email:</label>
                  <input type="email" id="email" v-model="email" /> <br>
                  <label for="password">Password:</label>
                  <input type="password" id="password" v-model="password" />
                  <br>
                  <v-btn type="submit">Login</v-btn>
              </v-form>
              <br>
              <g-signin-button
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError">
                  Log in with Google
              </g-signin-button>
              <div>
                  <br>
                  <router-link to="/signup">Sign Up</router-link>
              </div>
          </div>
      </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      token: null,
        // See https://developers.google.com/identity/sign-in/web/reference#users
        googleSignInParams: {
          client_id:
            'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
      },
    };
  },

    methods: {
    handleSubmit() {
      axios
        .post("http://localhost:3000/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          const token = response.data.token;
          if (token) {
            localStorage.setItem("token", token);
            this.token = token;
            console.log(this.token);
            this.$router.push("/protected");
          } else {
            console.error("Token is missing in response body");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onSignInSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      axios
        .post("http://localhost:3000/auth/google", {
          id_token: id_token,
        })
        .then((response) => {
          const token = response.data.token;
          if (token) {
            localStorage.setItem("token", token);
            this.token = token;
            console.log(this.token);
            this.$router.push("/protected");
          } else {
            console.error("Token is missing in response body");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onSignInError(err) {
      console.error(err);
    },
  },
};
</script>

<style>
.login-title {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}

#connexionComponent {
  display: flex;
  justify-content: center;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-card {
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.v-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input {
  margin-bottom: 10px;
  border-bottom: #333333 1px solid;;
}

.g-signin-button {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
}
</style>