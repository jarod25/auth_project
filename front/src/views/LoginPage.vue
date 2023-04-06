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
  },
};
</script>
