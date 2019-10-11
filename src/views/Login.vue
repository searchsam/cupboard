<template lang="html">
  <div id="login" class="container mx-auto px-4 flex h-full">
    <div class="ml-auto mr-auto mt-20">
      <form method="POST" @submit.prevent="login" class="block p-5">
        <!-- Email Input -->
        <input
          class="mb-4 h-16 w-64 rounded-lg placeholder-gray-400 shadow bg-white"
          type="email"
          v-model="username"
          placeholder="Correo Electrónico"
          :style="username ? 'background-color: #5e75f6;' : ''"
        />
        <br />
        <!-- Password Input -->
        <input
          class="mb-4 h-16 w-64 rounded-lg placeholder-gray-400 shadow bg-white"
          type="password"
          v-model="password"
          placeholder="Contraseña"
          :style="password ? 'background-color: #5e75f6;' : ''"
        />
        <!-- Error Message -->
        <Alert :msg="error" />
        <br />
        <!-- Submit Button -->
        <button
          class="loginButton mb-4 h-16 w-64 rounded-lg bg-yellow-500 text-white text-xl"
          type="submit"
        >
          Iniciar Sesion
        </button>
        <br />
        <!-- Show Register Form Button -->
        <button
          class="registerButton h-16 w-64 rounded-lg border bg-gray-500 text-white text-xl hover:bg-gray-400"
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
</script>

<style lang="sass" scoped>
input
  font-size: 1.25rem
  height: 3rem
  width: 24rem
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
    &:focus
      color: #5e75f6

  &:-moz-placeholder
    font-size: 1.25rem
    text-align: center
    &:focus
      color: #5e75f6

  &::-moz-placeholder
    font-size: 1.25rem
    text-align: center
    &:focus
      color: #5e75f6

  &:-ms-input-placeholder
    font-size: 1.25rem
    text-align: center
    &:focus
      color: #5e75f6

button
  height: 3rem
  width: 24rem

  &:focus
    outline: none

  &.loginButton
    background-color: #f1c842
    &:hover
      background-color: #f6df5e
</style>
