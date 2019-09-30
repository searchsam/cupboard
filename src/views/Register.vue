<template lang="html">
  <div id="login" class="container mx-auto px-4 flex h-full">
    <!-- Formulario de registro -->
    <div class="ml-auto mr-auto h-full w-1/2">
      <div class="bg-white m-5">
        <form method="POST" @submit.prevent="register" class="block p-10">
          <!-- Name Input -->
          <input
            class="mb-4 h-12 w-full border-2 border-gray-400 placeholder-gray-400"
            type="text"
            v-model="name"
            placeholder="Nombre"
          />
          <br />
          <!-- Email -->
          <input
            class="mb-4 h-12 w-full border-2 border-gray-400 placeholder-gray-400"
            type="email"
            v-model="email"
            placeholder="Correo Electronico"
          />
          <br />
          <!-- Password Input -->
          <input
            class="mb-4 h-12 w-full border-2 border-gray-400 placeholder-gray-400"
            type="password"
            v-model="password"
            placeholder="Contraseña"
          />
          <br />
          <!-- Confirm Password Input -->
          <input
            class="mb-4 h-12 w-full border-2 border-gray-400 placeholder-gray-400"
            type="password"
            v-model="confirmation"
            placeholder="Confirmar Contraseña"
          />
          <!-- Error Message -->
          <Alert :msg="error" />
          <br />
          <!-- Submit Button -->
          <button
            class="mb-4 h-12 w-full border bg-yellow-500 text-white hover:bg-yellow-400"
            type="submit"
          >
            Registar Usuario
          </button>
          <br />
          <!-- Cancel Button -->
          <button
            class="h-12 w-full border bg-gray-500 text-white hover:bg-gray-400"
            type="button"
            @click="$router.push({ name: 'login' })"
          >
            Cancelar
          </button>
        </form>
      </div>
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
      name: '',
      email: '',
      password: '',
      confirmation: '',
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
</script>

<style lang="sass" scoped></style>
