import { AlertMixin } from '@/mixins/AlertMixin';

export default {
  name: 'UserCard',

  mixins: [AlertMixin],

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  inject: ['me'],

  computed: {
    userType() {
      return {
        0: { type: 'SUPER ADMIN', icon: 'ti-wand' },
        1: { type: 'ADMIN', icon: 'ti-crown' },
        2: { type: 'CLIENTE', icon: 'ti-light-bulb' },
      }[this.user.type];
    },
  },

  methods: {
    async doAdmin() {
      try {
        await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/DoAdmin').default,
          variables: { id: this.user.id },
        });
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
  },
};
