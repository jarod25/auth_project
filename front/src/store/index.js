import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem("token") || "",
    GOOGLE_CLIENT_ID: null,
    GITHUB_CLIENT_ID: null,
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
  },
  mutations: {
    setUser(state, user) {
        state.user = user
    },
    setToken(state, token) {
      state.token = token;
    },
    setEnv(state, env) {
        state.GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID
        state.GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID
    }
  },
  actions: {
    signUp({commit}, user) {
      return fetch('http://localhost:3000/auth/signup', {

        method: 'POST', headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
          login: user.login,
          password: user.password,
        })
      })
          .then(response => response.json())
          .then(response => {
            commit('setUser', "toto")
            return response
          })
          .catch(error => console.error('Error:', error))
    },
    takeEnv({commit}) {
      return fetch('http://localhost:3000/env')
          .then(response => response.json())
          .then(response => {
            commit('setEnv', response)
            return response
          })
          .catch(error => console.error('Error:', error))
    }
  }
})
