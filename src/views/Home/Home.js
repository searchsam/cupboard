import NavBar from '@/components/nav/NavBar/NavBar.vue';
import SideBar from '@/components/nav/SideBar/SideBar.vue';

export default {
  name: 'Home',

  components: {
    NavBar,
    SideBar,
  },

  apollo: {
    me: {
      query: require('@/graphql/queries/CurrentUser').default,
    },
  },

  provide() {
    const data = {};
    Object.defineProperty(data, 'me', {
      enumerable: true,
      get: () => {
        return this.me;
      },
    });

    return data;
  },
};
