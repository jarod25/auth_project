<template>
  <div>
    <h2>Protected Page</h2>
    <p>You are authenticated!</p>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("Protected page mounted.");
  },
};
</script>
