<template>
    <div>
        <button id="googleButton"></button>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
    name: "GoogleComponent",
    created() {
        if (typeof window.google !== "undefined") {
            // Votre code pour utiliser la bibliothèque Google ici
            window.google.accounts.id.initialize({
                client_id: "945612893828-avg8vr8uk0nh599cg7gmdno57n8lc6rv.apps.googleusercontent.com",
                callback: this.handleCallbackResponse,
            });
        } else {
            console.log("La bibliothèque Google n'est pas chargée");
        }
    },
    mounted() {
        window.google.accounts.id.renderButton(
            document.getElementById("googleButton"),
            {
                theme: "filled_blue",
                text: "login with google",
                size: "large",
                shape: "rectangular",
                logo_alignment: "left",
            }
        );
    },
    methods: {
        handleCallbackResponse(response) {
            this.$store.state.user = jwt_decode(response.credential);
            localStorage.setItem("token", response.credential)
            this.$router.push("/protected");
        },
    },
}
</script>