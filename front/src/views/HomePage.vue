<template>
  <div>
    <NavBarComponent />
    <h2>Home Page</h2>
    <p>Welcome to the home page!</p>
  </div>
</template>

<script>
import NavBarComponent from "@/components/NavBarComponent.vue";
export default {
  name: "HomePage",
  components: {
    NavBarComponent,
  },
};
</script>
