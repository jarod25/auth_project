<template>
  
  <div>
    <h1>Caching page</h1>
    <p>{{ message }}</p>
  </div>

</template>

<script>

export default {
  name: 'CachePage',
  data() {
    return {
      message: '',
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch('http://localhost:3000/cache')
        .then((response) => response.text())
        .then((data) => {
          this.message = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};

</script>
