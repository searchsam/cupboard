<template lang="html">
  <div id="login" class="flex h-full bg-white">
    <div class="sidePanelLogin flex-1 container mx-auto flex">
      <div class="block p-5 mx-auto">
        <!-- Show Register Form Button -->
        <button
          class="registerButton rounded-lg shadow-md"
          :style="bottom"
          type="button"
          @click="$router.push({ name: 'register' })"
        >
          Registrarse
        </button>
      </div>
    </div>
    <div class="flex-1 container mx-auto mt-32 flex">
      <form method="POST" @submit.prevent="login" class="block p-5 mx-auto">
        <h1 class="text-4xl font-semibold mb-8 text-center">Iniciar Sesión</h1>
        <!-- Email Input -->
        <input
          class="loginInput mb-8 rounded-lg shadow-md"
          type="email"
          v-model="username"
          placeholder="Correo Electrónico"
          :style="username ? 'border: 1px solid #5e75f6;' : ''"
        />
        <br />
        <!-- Password Input -->
        <input
          class="loginInput mb-10 rounded-lg shadow-md"
          type="password"
          v-model="password"
          placeholder="Contraseña"
          :style="password ? 'border: 1px solid #5e75f6;' : ''"
        />
        <!-- Error Message -->
        <Alert :msg="error" />
        <br />
        <div class="container mx-auto flex">
          <!-- Submit Button -->
          <button
            class="loginButton rounded-lg shadow-md ml-auto mr-auto"
            type="submit"
          >
            Iniciar Sesion
          </button>
        </div>
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
@import ../assets/css/library.sass

.loginInput
  width: 26rem
  height: 3.5rem
  border: 1px solid $gray-shadow

.loginButton
  margin-left: auto
  width: 18rem
  height: 4rem

.sidePanelLogin
  background-color: $blue
  background: rgb(47,58,123)
  background: -moz-linear-gradient(0deg, rgba(47,58,123,1) 0%, rgba(94,117,246,1) 25%)
  background: -webkit-linear-gradient(0deg, rgba(47,58,123,1) 0%, rgba(94,117,246,1) 25%)
  background: linear-gradient(0deg, rgba(47,58,123,1) 0%, rgba(94,117,246,1) 25%)
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2f3a7b",endColorstr="#5e75f6",GradientType=1)

.registerButton
  margin-top: 40rem
  background-color: $gray
  color: $text
  &:hover
    background-color: $white
</style>
