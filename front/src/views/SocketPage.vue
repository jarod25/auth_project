<template>
  <div>
    <h1>Something to tell</h1>
    <form @submit.prevent="sendMessage">
      <input type="text" v-model="message" placeholder="Enter message" />
      <v-btn class="mx-5" type="submit">Send</v-btn>
    </form>
    <ul class="my-2">
      <li v-for="message in messages" :key="message">{{ message }}</li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      message: "",
      messages: [],
      socket: null, // Ajout de la propriété socket
    };
  },

  mounted() {
    this.socket = io("http://localhost:3000"); // Assignation de la propriété socket
    if (this.$store.state.user) {
      this.socket.on("connect", () => {
        this.socket.emit("message", "Hello " + this.$store.state.user.name);
      });
    }
    this.socket.on("message", (data) => {
      this.messages.push(data);
    });
  },

  methods: {
    sendMessage() {
      this.socket.emit("message", this.message); // Utilisation de la même instance de socket
      this.message = "";
    },
  },
};
</script>
