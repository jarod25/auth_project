<template>
  <div>
    <NavBarComponent />
    <div class="container">
      <div class="row">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavBarComponent from "@/components/NavBarComponent.vue";
export default {
  name: "App",
  components: { NavBarComponent },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
</style>
