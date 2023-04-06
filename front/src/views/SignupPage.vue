<template>
  <div>
    <h2>Signup</h2>
    <form @submit.prevent="submit">
      <label>
        Name:
        <input type="text" v-model="name" required />
      </label>
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
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
  },
};
</script>
