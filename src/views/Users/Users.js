import UserCard from '@/components/user/UserCard/UserCard.vue';

export default {
  name: 'Users',

  components: {
    UserCard,
  },

  inject: ['me'],

  apollo: {
    users: {
      query: require('@/graphql/queries/AllUsers').default,
    },
  },

  computed: {
    usersList: function() {
      return (this.users || []).sort((a, b) => (a.type < b.type ? 1 : -1));
    },
  },
};
