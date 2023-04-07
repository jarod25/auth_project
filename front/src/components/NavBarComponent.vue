<template>
  <div class="navbar">
    <div class="navbar__logo">
      <img src="../assets/logo.png" alt="logo">
    </div>
    <div class="navbar__menu">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cache">Cache</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent.vue",

}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #383737;
}


.navbar__logo img {
  width: 20%;
}

.navbar__menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
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