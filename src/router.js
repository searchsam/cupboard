import Vue from 'vue';
import Router from 'vue-router';
import { AUTH_TOKEN } from './vue-apollo';

import Home from '@/views/Home/Home.vue';
import Login from '@/views/Login/Login.vue';
import Order from '@/views/Order/Order.vue';
import Orders from '@/views/Orders/Orders.vue';
import Pantry from '@/views/Pantry/Pantry.vue';
import Register from '@/views/Register/Register.vue';
import Users from '@/views/Users/Users.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: '404',
    },
    {
      path: '/',
      redirect: {
        name: 'login',
      },
      meta: {
        auth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem(AUTH_TOKEN)) {
          return next({ name: 'orders' });
        }

        next();
      },
      meta: {
        auth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem(AUTH_TOKEN)) {
          return next({ name: 'orders' });
        }

        next();
      },
      meta: {
        auth: false,
      },
    },
    {
      path: '/cupboard',
      component: Home,
      children: [
        {
          path: '/orders',
          name: 'orders',
          component: Orders,
          meta: {
            auth: true,
          },
        },
        {
          path: '/orders/:id',
          name: 'requests',
          component: Order,
          meta: {
            auth: true,
          },
        },
        {
          path: '/pantry',
          name: 'pantry',
          component: Pantry,
          meta: {
            auth: true,
          },
        },
        {
          path: '/users',
          name: 'users',
          component: Users,
          meta: {
            auth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!localStorage.getItem(AUTH_TOKEN)) {
      return next({ name: 'login' });
    }

    next();
  }

  return next();
});

export default router;
