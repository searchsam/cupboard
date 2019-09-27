<template lang="html">
  <div id="login" class="container mx-auto px-4">
    <form method="POST" @submit.prevent="login" class="block">
      <!-- Email Input -->
      <input
        class="mb-4 h-12 border-2 border-gray-400 placeholder-gray-400"
        type="email"
        v-model="username"
        name="username"
        placeholder="Email"
      />
      <br />
      <!-- Password Input -->
      <input
        class="mb-4 h-12 border-2 border-gray-400 placeholder-gray-400"
        name="password"
        type="password"
        v-model="password"
        placeholder="Password"
      />
      <!-- Error Message -->
      <Alert :msg="error" />
      <br />
      <!-- Submit Button -->
      <button class="h-12 w-56 border bg-blue-400 text-white" type="submit">
        Iniciar Sesion
      </button>
    </form>
  </div>
</template>

<script type="text/javascript">
import { onLogin } from '@/vue-apollo.js';
import Alert from '@/components/error/Alert.vue';

export default {
  name: 'Login',
  data() {
    return {
      error: null,
      password: '',
      username: '',
    };
  },
  methods: {
    login() {
      this.$apollo
        .mutate({
          mutation: require('@/graphql/LoginMutation.gql'),
          variables: {
            input: { username: this.username, password: this.password },
          },
          update: (store, { data: { login } }) => {
            onLogin(this.$apollo.provider.defaultClient, login.accessToken);
            localStorage.setItem('auType', login.user.type);
          },
        })
        .then(() => {
          this.$router.push({ name: 'orders' });
        })
        .catch(error => {
          this.error = error.message.split(':')[1];
        });
    },
  },
  components: {
    Alert,
  },
};
</script>

<style lang="sass" scoped></style>
