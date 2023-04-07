<template>
  <div>
      <v-card elevation="5" style="margin-top: 150px;">
          <div class="card-body">
              <v-card-title class="login-title">
                  Signup
              </v-card-title>
              <v-form @submit.prevent="submit">
                  <label for="name">Name:</label>
                  <input type="text" id="name" v-model="name" /> <br>
                  <label for="email">Email:</label>
                  <input type="email" id="email" v-model="email" /> <br>
                  <label for="password">Password:</label>
                  <input type="password" id="password" v-model="password" />
                  <br>
                  <v-btn type="submit">Signup</v-btn>
              </v-form>
              <br>
              <button class="btn-google" @click="login('google')">Login with Google</button>
              <button class="btn-github" @click="login('github')">Login with GitHub</button>
              <div>
                  <br>
                  Already have an account ? <router-link to="/login">Login</router-link>
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
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post("http://localhost:3000/auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          this.token = token;
          console.log(this.token);
          this.$router.push("/protected");
        } else {
          console.error("Token is missing in response body");
        }
      } catch (error) {
        console.error(error);
      }
    },
      login(provider) {
          window.open(
              `http://localhost:3000/auth/${provider}`,
              "popup",
              "width=600,height=600"
          );
      },
  },
    mounted() {
        const token = localStorage.getItem("token");
        if (token) {
            this.token = token;
            this.$router.push("/protected");
        }
    }
};
</script>
