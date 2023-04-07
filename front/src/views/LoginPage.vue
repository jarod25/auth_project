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
              <button class="btn-google" @click="login('google')">Login with Google</button>
              <button class="btn-github" @click="login('github')">Login with GitHub</button>
              <div>
                  <br>
                  Not register yet ? <router-link to="/signup">Sign Up</router-link>
                  <br>
                <br>
                <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
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
            console.log(this.token);
            this.$router.push("/protected");
          } else {
            console.error("Token is missing in response body");
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 429) {
            this.errorMessage = "Too many attempts, please try again later";
          } else {
            this.errorMessage = "Invalid credentials";
          }
        });
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

.btn-google {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
    margin: 5px;
}

.btn-github {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: rgb(118, 106, 225);
    color: #fff;
    box-shadow: 0 3px 0 rgb(77, 59, 225);
    margin: 5px;
}

.alert {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.alert-danger {
  color: #842029;
  background-color: #f5c2c7;
  border-color: #f5c2c7;
}
</style>