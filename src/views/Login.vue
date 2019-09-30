<template lang="html">
  <div id="login" class="container mx-auto px-4 flex h-full">
    <div class="ml-auto mr-auto mt-20">
      <form method="POST" @submit.prevent="login" class="block bg-white p-5">
        <!-- Email Input -->
        <input
          class="mb-4 h-12 w-64 border-2 border-gray-400 placeholder-gray-400"
          type="email"
          v-model="username"
          placeholder="Correo Electronico"
        />
        <br />
        <!-- Password Input -->
        <input
          class="mb-4 h-12 w-64 border-2 border-gray-400 placeholder-gray-400"
          type="password"
          v-model="password"
          placeholder="Contraseña"
        />
        <!-- Error Message -->
        <Alert :msg="error" />
        <br />
        <!-- Submit Button -->
        <button
          class="mb-4 h-12 w-64 border bg-yellow-500 text-white hover:bg-yellow-400"
          type="submit"
        >
          Iniciar Sesion
        </button>
        <br />
        <!-- Show Register Form Button -->
        <button
          class="h-12 w-64 border bg-blue-500 text-white hover:bg-blue-400"
          type="button"
          @click="$router.push({ name: 'register' })"
        >
          Registrarse
        </button>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
import { onLogin } from '@/vue-apollo.js';
import Alert from '@/components/error/Alert.vue';

export default {
  name: 'Login',

  components: {
    Alert,
  },

  data() {
    return {
      error: null,
      username: '',
      email: '',
      password: '',
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
</script>

<style lang="sass" scoped></style>
