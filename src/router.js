import Vue from "vue";
import Router from "vue-router";
import { AUTH_TOKEN } from "./vue-apollo";

import Login from "@/views/Login.vue";
import Order from "@/views/Order.vue";
import Request from "@/views/Request.vue";

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
      path: "/orders",
      name: "orders",
      component: Order,
      meta: {
        auth: true
      }
  },
  {
    path: "/request:id",
    name: "request",
    component: Request,
    meta: { auth: true }
  }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!localStorage.getItem(AUTH_TOKEN)) {
      return next("/");
    }

    next();
  }

  if (to.meta.admin) {
    if (!(Vue.prototype.$authUserType <= 1)) {
      return next(from.path);
    }

    next();
  }

  return next();
});

export default router;
