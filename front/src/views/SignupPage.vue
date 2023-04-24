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
              <GoogleComponent />
              <GithubComponent />
              <div>
                  <br>
                  Already have an account ? <router-link to="/login">Login</router-link>
              </div>
              <br>
              <div v-if="errorMessage" class="alert alert-danger">
                  {{ errorMessage }}
              </div>
          </div>
      </v-card>
  </div>
</template>

<script>
import axios from "axios";
import GithubComponent from "@/components/GithubComponent.vue";
import GoogleComponent from "@/components/GoogleComponent.vue";

export default {
    components: {GoogleComponent, GithubComponent},
  data() {
    return {
      name: "",
      email: "",
      password: "",
      token: null,
      errorMessage: null,
    };
  },
  methods: {
    async submit() {
      axios
          .post("http://localhost:3000/auth/signup", {
            name: this.name,
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
              if (error.response && error.response.status === 429) {
                  this.errorMessage = "Too many attempts, please try again later";
              }
              else if (error.response && error.response.status === 400) {
                  this.errorMessage = "Please fill all the fields";
              }
              else if (error.response && error.response.status === 409) {
                  this.errorMessage = "Email already exists";
              }
              else if (error.response && error.response.status === 500) {
                  this.errorMessage = "Internal server error";
              }
              else {
                  this.errorMessage = "Something went wrong";
              }
          });
    },
  },
    mounted() {
        const token = localStorage.getItem("token");
        if (token && token.isValid) {
            this.token = token;
            this.$router.push("/protected");
        }
    }
};
</script>
