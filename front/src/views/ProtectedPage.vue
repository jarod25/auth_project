<template>
  <div>
    <h1>Protected Page</h1>
    <p>You are authenticated!</p>
    <div v-if="user">
      <p>User email: {{ user.email }}</p>
      <p>User name: {{ user.name }}</p>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      // Rediriger vers la page de connexion si le token n'est pas présent
      this.$router.push("/login");
      return;
    }
    axios
      .get("http://localhost:3000/auth/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Vérifier si la réponse contient des données avant de les stocker dans la variable user
        this.user = response.data;
        this.$store.commit("setUser", this.user);
      })
      .catch((error) => {
        console.error(error);
        // Si une erreur 401 est retournée, cela signifie que le token est invalide
        if (error.response.status === 401) {
          this.$router.push("/login");
        }
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.state.user = null;
      this.$router.push("/");
    },
  },
};
</script>
