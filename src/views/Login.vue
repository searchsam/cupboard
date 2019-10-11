<template lang="html">
  <div id="login" class="flex h-full bg-white">
    <div class="sidePanelLogin flex-1 container mx-auto flex">
      <div class="block p-5 m-auto">
        <img src="../assets/img/register_side_art.svg" class="sideImage mx-auto"/>
        <div class="flex">
        <!-- Show Register Form Button -->
        <button
          class="registerButton rounded-lg shadow-md mx-auto"
          :style="bottom"
          type="button"
          @click="$router.push({ name: 'register' })"
        >
          Registrarse
        </button>
        </div>
      </div>
    </div>
    <div class="flex-1 container mx-auto mt-32 flex">
      <form method="POST" @submit.prevent="login" class="block p-5 mx-auto">
        <h1 class="text-4xl font-semibold mb-8 text-center">Iniciar Sesión</h1>
        <!-- Email Input -->
        <input
          class="loginInput mb-8 rounded-lg"
          type="email"
          v-model="username"
          placeholder="Correo Electrónico"
          :style="username ? 'border: 1px solid #5e75f6;' : ''"
        />
        <br />
        <!-- Password Input -->
        <input
          class="loginInput mb-10 rounded-lg"
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

<style lang="sass" scoped></style>
