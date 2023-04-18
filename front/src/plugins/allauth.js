import VueAllAuth from "vue-all-auth";
import Vue from "vue";
import dotenv from 'dotenv'
dotenv.config()
const googleId = require("../../../back/.env").GOOGLE_CLIENT_ID;
const githubId = require("../../../back/.env").GOOGLE_CLIENT_ID;

if (!googleId || !githubId) {
    throw new Error("Missing Google or Github ID");
}

Vue.use(VueAllAuth, {
    google: {
        // keys for Google
        client_id: googleId,
        scope: "profile email",
    },
    github: {
        // keys for GitHub
        client_id: githubId,
        scope: "user:email",
    }
});

// init allauth
Vue.prototype.$allauth.init();