import Vue from "vue";
import Router from "vue-router";
import { AUTH_TOKEN } from "./vue-apollo";

import Home from "@/views/Home.vue";
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
      meta: { auth: false }
    },
    {
      path: "/cupboard",
      component: Home,
      children: [
        { path: "/orders", name: "orders", component: Order },
        { path: "/requests", name: "requests", component: Request, props: true }
      ],
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
