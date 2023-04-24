<template>
  <div class="navbar">
    <div class="navbar__logo">
        <router-link to="/">
      <img src="../assets/logo.png" alt="logo"/>
        </router-link>
    </div>
      <div class="navbar__menu">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/cache">Cache</router-link></li>
            <li><router-link to="/races">Races F1</router-link></li>
            <li><router-link to="/socket">Socket</router-link></li>
        </ul>
    </div>
    <div v-if="logged" class="navbar__menu">
        <ul>
            <li><router-link to="/protected">Protected</router-link></li>
            <li><v-btn style="background-color: #333333;" variant="text" class="text-white" @click="logout">Logout</v-btn></li>
        </ul>
    </div>
    <div v-else class="navbar__menu">
        <ul>
            <li><router-link to="/login">Login </router-link></li>
            <li><router-link to="/signup"> Signup</router-link></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent.vue",
    data() {
        return {
            logged : false,
        };
    },
    methods: {
      isLogged() {
        this.logged = !!localStorage.getItem("token");
      },
        logout() {
            localStorage.removeItem("token");
            this.$router.push("/");
        },
    },
    mounted() {
        this.isLogged();
    },
    watch: {
        $route() {
            this.isLogged();
        },
    },

};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #383737;
  padding: 1rem;
  font-size: 1.2rem;
}

.navbar__logo img {
  width: 20%;
}

.navbar__menu {
  display: flex;
  justify-content: space-between;
}

.navbar__menu ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

.navbar__menu ul li {
  margin: 0 1rem;
}

.navbar__menu ul li a {
  color: #fff;
  text-decoration: none;
}
</style>
