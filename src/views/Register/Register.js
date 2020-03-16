import { AlertMixin } from '@/mixins/AlertMixin';
import { onLogin } from '@/vue-apollo';
import REGISTER from '@/graphql/mutations/Register';

export default {
  name: 'Register',

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
          mutation: REGISTER,
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
