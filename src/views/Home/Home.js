import NavBar from '@/components/nav/NavBar/NavBar.vue';
import SideBar from '@/components/nav/SideBar/SideBar.vue';
import CURRENT_USER from '@/graphql/queries/CurrentUser';

export default {
  name: 'Home',

  components: {
    NavBar,
    SideBar,
  },

  apollo: {
    me: {
      query: CURRENT_USER,
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
