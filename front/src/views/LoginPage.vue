<template>
  <div>
    <v-card elevation="5" style="margin-top: 150px">
      <div class="card-body">
        <v-card-title class="login-title"> Login </v-card-title>
        <v-form @submit.prevent="handleSubmit">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" autocomplete/> <br />
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" autocomplete/>
          <br />
          <v-btn type="submit">Login</v-btn>
        </v-form>
        <br />
        <GoogleComponent />
        <GithubComponent />
        <div>
          <br />
          Not register yet ? <router-link to="/signup">Sign Up</router-link>
          <br />
          <br />
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import GoogleComponent from "@/components/GoogleComponent.vue";
import GithubComponent from "@/components/GithubComponent.vue";

export default {
    components: {GithubComponent, GoogleComponent},
  data() {
    return {
      email: "",
      password: "",
      token: null,
      errorMessage: null,
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
          else if (error.response && error.response.status === 401) {
            this.errorMessage = "Wrong email or password";
          }
          else {
            this.errorMessage = "Something went wrong, please try again later";
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
  height: auto;
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
  border-bottom: #333333 1px solid;
}

.alert {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
}
.alert-danger {
  color: #842029;
  background-color: #f5c2c7;
  border-color: #f5c2c7;
}
</style>
