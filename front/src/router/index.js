import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import SignupPage from "../views/SignupPage.vue";
import loginPage from "../views/LoginPage.vue";
import ProtectedPage from "../views/ProtectedPage.vue";
import Socket from "../views/SocketPage.vue";
import Races from "../views/RacesPage.vue";
// Simon (Response>-Caching)
import CachePage from "../views/CachePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupPage,
  },
  {
    path: "/login",
    name: "Login",
    component: loginPage,
  },
  {
    path: "/protected",
    name: "Protected",
    component: ProtectedPage,
    meta: {
      requiresAuth: true,
    },
  },
  // JAROD (Socket.io)
  {
    path: "/socket",
    name: "Socket",
    component: Socket,
  },
  // Raph (F1 API BIG DATA)
  {
    path: "/races",
    name: "Races",
    component: Races,
  },
  // Simon (Response-Caching)
  {
    path: "/cache",
    name: "CachePage",
    component: CachePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
