<template>
  
  <div>
    <h1>Page de cache</h1>
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
      fetch('/cache')
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
