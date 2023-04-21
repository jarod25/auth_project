<template>
    <div>
        <button class="btn-github" @click="login()">Login with Github</button>
    </div>
</template>

<script>
export default {
    name: "GithubComponent",
    created() {
        const url = window.location.search;
        const params = new URLSearchParams(url);
        const code = params.get("code");
        console.log(code);
        if (code && (localStorage.getItem("token") === null)) {
            this.getAccessToken(code);
            this.getUserData();
        }
    },
    data() {
        return {
            CLIENT_ID: "2d9824eeee4ccf5cdd09",
        };
    },
    methods: {
        login() {
            window.location.assign("https://github.com/login/oauth/authorize?client_id=" + this.CLIENT_ID)
        },
        async getUserData() {
            await fetch("http://localhost:3000/getUserData", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        },
        async getAccessToken(code) {
            await fetch("http://localhost:3000/getAccessToken?code=" + code, {
                method: "GET"
            })
            .then((response) => {
                console.log("Response");
                console.log(response);
                response.json()
            })
            .then((data) => {
                console.log("Data");
                console.log(data);
                if (data.access_token) {
                    localStorage.setItem("token", data.access_token);
                } else {
                    console.error("Token is missing in response body");
                }
            });
        }
    },
    mounted() {
        const token = localStorage.getItem("token");
        if (token) {
            this.token = token;
            this.$router.push("/protected");
        }
    }
}
</script>

<style scoped>
.btn-github {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: rgb(118, 106, 225);
    color: #fff;
    box-shadow: 0 3px 0 rgb(77, 59, 225);
    margin: 5px;
}

.btn-github:hover {
    background-color: rgb(77, 59, 225);
}

</style>