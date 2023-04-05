<template>
  <main>
    <v-card elevation="5" style="margin-top: 150px;">
      <div class="card-body">
        <v-card-title class="login-title">
          Connexion
        </v-card-title>
        <v-form @submit.prevent="submit">
          <v-text-field
              v-model="login"
              label="Pseudo"
              name="login"
              :rules="loginRules"
              prepend-icon="mdi-account-circle"
              type="text"
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              label="Mot de passe"
              name="password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              required
              @click:append="showPassword = !showPassword"
          ></v-text-field>
          <br>
          <v-btn :disabled="invalid" type="submit">Se connecter</v-btn>
          <v-btn @click="reset">Annuler</v-btn>
        </v-form>
        <br>
        <div id="connexionComponent">
          <GithubLogin name="Github"></GithubLogin>
        </div>
        <br>
        <div id="connexionComponent">
          <GoogleLogin name="Google"></GoogleLogin>
        </div>
        <div>
          <br>
          <router-link to="/register">Inscrivez-vous</router-link>
        </div>
      </div>
    </v-card>
    <v-snackbar
        v-model="snackbar"
        :timeout="-1"
        :value="true"
        absolute
        bottom
        :color="snackbarColor"
        outlined
        right
    >
      {{ snackbarText }}
      <v-btn
          text
          @click="snackbar = false"
      >
        Fermer
      </v-btn>
    </v-snackbar>
  </main>
</template>

<script>
import GithubLogin from './GithubRegisterComponent.vue'
import GoogleLogin from './GoogleRegisterComponent.vue'
export default {
  name: "ConnexionComponent",
  components: {
    GithubLogin,
    GoogleLogin
  },
  data() {
    return {
      login: "",
      invalid: null,
      loginRules: [
        v => !!v || 'Un pseudo est requis',
      ],
      password: "",
      showPassword: false,
      passwordRules: [
        v => !!v || 'Un mot de passe est requis',
      ],
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
    };
  },
  methods: {
    successRequest(message) {
      this.snackbar = true;
      this.snackbarText = message;
      this.snackbarColor = "success";
    },
    errorRequest(message) {
      this.snackbar = true;
      this.snackbarText = message;
      this.snackbarColor = "error";
    },
    submit: function() {
      this.$store.dispatch('connexionUser', {
        login: this.login,
        password: this.password
      }).then(response => {
        if (response.error) {
          this.errorRequest(response.message)
        } else {
          this.successRequest(response.message)
        }
      })
          .catch(error => {
            this.errorRequest(error.response)
          });
    },
    reset() {
      this.login = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>

</style>

