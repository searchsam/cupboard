import UserCard from '@/components/user/UserCard/UserCard.vue';
import USERS from '@/graphql/queries/AllUsers';

export default {
  name: 'Users',

  components: {
    UserCard,
  },

  inject: ['me'],

  apollo: {
    users: {
      query: USERS,
    },
  },

  computed: {
    usersList() {
      return (this.users || []).sort((a, b) => (a.type < b.type ? 1 : -1));
    },
  },
};
