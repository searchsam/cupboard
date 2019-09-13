import Vue from "vue";
import Router from "vue-router";
import { AUTH_TOKEN } from "./vue-apollo";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!localStorage.getItem(AUTH_TOKEN)) {
      console.log("here too");
      return router.push({ name: "login" });
    }

    next();
  }

  return next();
});

export default router;
