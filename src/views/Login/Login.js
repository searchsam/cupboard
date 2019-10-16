import { AlertMixin } from '@/mixins/AlertMixin';
import { onLogin } from '@/vue-apollo';

export default {
  name: 'Login',

  mixins: [AlertMixin],

  data() {
    return {
      email: '',
      password: '',
      username: '',
    };
  },

  methods: {
    async login() {
      try {
        const response = await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/Login').default,
          variables: {
            input: {
              username: this.username,
              password: this.password,
            },
          },
        });
        onLogin(
          this.$apollo.provider.defaultClient,
          response.data.login.accessToken
        );
        this.$router.push({ name: 'orders' });
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
  },
};
