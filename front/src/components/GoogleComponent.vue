<template>
    <div>
        <button id="googleButton"></button>
    </div>
</template>

<script>

export default {
    name: "GoogleComponent",
    created() {
        if (typeof window.google !== "undefined") {
            window.google.accounts.id.initialize({
                client_id: "945612893828-avg8vr8uk0nh599cg7gmdno57n8lc6rv.apps.googleusercontent.com",
                callback: this.handleCallbackResponse,
            });
        } else {
            console.log("Google lib not loaded, verify your config");
        }
    },
    mounted() {
        window.google.accounts.id.renderButton(
            document.getElementById("googleButton"),
            {
                theme: "filled_blue",
                text: "login_with_google",
                size: "large",
                shape: "rectangular",
                logo_alignment: "left",
            }
        );
    },
    methods: {
        handleCallbackResponse(response) {
            localStorage.setItem("token", response.credential)
            this.$router.push("/protected");
        },
    },
}
</script>