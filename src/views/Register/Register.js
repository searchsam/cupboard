import { AlertMixin } from '@/mixins/AlertMixin';
import { onLogin } from '@/vue-apollo';

export default {
  name: 'Login',

  mixins: [AlertMixin],

  data() {
    return {
      confirmation: '',
      email: '',
      name: '',
      password: '',
    };
  },

  methods: {
    async register() {
      try {
        const response = await this.$apollo.mutate({
          mutation: require('@/graphql/mutations/Register').default,
          variables: {
            input: {
              name: this.name,
              email: this.email,
              password: this.password,
              password_confirmation: this.confirmation,
              type: 2,
            },
          },
        });
        onLogin(
          this.$apollo.provider.defaultClient,
          response.data.register.accessToken
        );
        this.$router.push({ name: 'orders' });
      } catch (e) {
        this.error = e.message.split(':')[1];
      }
    },
  },
};
