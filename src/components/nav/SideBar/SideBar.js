import { onLogout } from '@/vue-apollo';

export default {
  name: 'SideBar',

  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },

  inject: ['me'],

  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      this.$router.push({ name: 'login' });
    },
  },
};
