<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
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
            this.errorMessage =
              "Trop de tentatives de connexion. Veuillez réessayer dans quelques minutes.";
          } else {
            this.errorMessage =
              "Une erreur s'est produite lors de la connexion.";
          }
        });
    },
  },
  mounted() {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      this.token = storedToken;
      console.log(this.token);
      this.$router.push("/protected");
    }
  },
};
</script>
<style>
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
