import Vue from "vue";
import Router from "vue-router";
import { AUTH_TOKEN } from "./vue-apollo";
import { USER_TYPE } from "./vue-apollo";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Order from "./views/Order.vue";
import Request from "./views/Request.vue";

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
      path: "/order",
      name: "order",
      component: Order,
      meta: {
        auth: true,
        admin: true
      }
    },
    {
      path: "/request",
      name: "request",
      component: Request,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!localStorage.getItem(AUTH_TOKEN)) {
      return router.push({ name: "login" });
    }

    next();
  }

  if (to.meta.admin) {
    if (
      localStorage.getItem(USER_TYPE) == "true" &&
      localStorage.getItem(USER_TYPE) <= 1
    ) {
      return next();
    }

    from();
  }

  return next();
});

export default router;
