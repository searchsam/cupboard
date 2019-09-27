import Vue from 'vue';
import Router from 'vue-router';
import { AUTH_TOKEN } from './vue-apollo';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Orders from '@/views/Orders.vue';
import Requests from '@/views/Requests.vue';
import Order from "@/views/Order";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/cupboard',
      component: Home,
      children: [
        {
          path: '/orders',
          name: 'orders',
          component: Orders,
        },
        {
          path: '/requests',
          name: 'requests',
          component: Requests,
          props: true,
        },
        {
          path: '/orders/:id',
          name: 'updateOrder',
          component: Order,
        },
      ],
      meta: {
        auth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!localStorage.getItem(AUTH_TOKEN)) {
      return next('/');
    }

    next();
  }

  return next();
});

export default router;
