<template lang="html">
  <div id="login" class="container mx-auto px-4 flex h-full">
    <!-- Formulario de registro -->
    <div class="ml-auto mr-auto h-full w-1/2">
      <div class="m-5">
        <form method="POST" @submit.prevent="register" class="block p-10">
          <!-- Name Input -->
          <input
            class="mb-4 w-full rounded-lg shadow placeholder-gray-400 bg-white"
            type="text"
            v-model="name"
            placeholder="Nombre"
            :style="name ? 'background-color: #5e75f6;' : ''"
          />
          <br />
          <!-- Email -->
          <input
            class="mb-4 h-12 w-full rounded-lg shadow placeholder-gray-400 bg-white"
            type="email"
            v-model="email"
            placeholder="Correo Electronico"
            :style="email ? 'background-color: #5e75f6;' : ''"
          />
          <br />
          <!-- Password Input -->
          <input
            class="mb-4 h-12 w-full rounded-lg shadow placeholder-gray-400 bg-white"
            type="password"
            v-model="password"
            placeholder="Contraseña"
            :style="password ? 'background-color: #5e75f6;' : ''"
          />
          <br />
          <!-- Confirm Password Input -->
          <input
            class="mb-4 h-12 w-full rounded-lg shadow placeholder-gray-400 bg-white"
            type="password"
            v-model="confirmation"
            placeholder="Confirmar Contraseña"
            :style="confirmation ? 'background-color: #5e75f6;' : ''"
          />
          <!-- Error Message -->
          <Alert :msg="error" />
          <br />
          <!-- Submit Button -->
          <button
            class="loginButton mb-4 h-12 w-full bg-yellow-500 text-white text-xl rounded-lg shadow"
            type="submit"
          >
            Registar Usuario
          </button>
          <br />
          <!-- Cancel Button -->
          <button
            class="h-12 w-full bg-gray-500 text-white text-xl hover:bg-gray-400 rounded-lg shadow"
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
</script>

<style lang="sass" scoped>
input
  font-size: 1.25rem
  height: 3rem
  color: #CBD5E0

  &:focus
    outline: none
    background-color: #5e75f6
    box-shadow: none
    color: #fff
    &::-webkit-input-placeholder
      color: #5e75f6

    &:-moz-placeholder
      color: #5e75f6

    &::-moz-placeholder
      color: #5e75f6

    &:-ms-input-placeholder
      color: #5e75f6

  &::-webkit-input-placeholder
    font-size: 1.25rem
    text-align: center

  &:-moz-placeholder
    font-size: 1.25rem
    text-align: center

  &::-moz-placeholder
    font-size: 1.25rem
    text-align: center

  &:-ms-input-placeholder
    font-size: 1.25rem
    text-align: center

button
  height: 3rem

  &:focus
    outline: none

  &.loginButton
    background-color: #f1c842
    &:hover
      background-color: #f6df5e
</style>
