<template>
  <LogInComponent v-if="$router.currentRoute.path === '/login'"/>
  <SignUpComponent v-else/>
</template>

<script>
import LogInComponent from "@/components/LogInComponent.vue";
import SignUpComponent from "@/components/SignUpComponent.vue";
export default {
  name: "LoginSignupView",
  components: {
    LogInComponent,
    SignUpComponent
  }
}
</script>

<style scoped>

</style>