import Vue from 'vue';
import Router from 'vue-router';
import { AUTH_TOKEN } from './vue-apollo';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Orders from '@/views/Orders.vue';
import Request from '@/views/Request.vue';

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
          component: Request,
          props: true,
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
