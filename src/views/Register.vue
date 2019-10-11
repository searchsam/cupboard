<template lang="html">
  <div id="login" class="flex h-full bg-white">
    <div class="flex-1 container mx-auto mt-32 flex">
      <form method="POST" @submit.prevent="login" class="block p-5 mx-auto">
        <h1 class="text-4xl mb-8 text-center">
          Registrar Usuario
        </h1>
        <!-- Name Input -->
        <input
          class="loginInput mb-8 rounded-lg"
          type="text"
          v-model="name"
          placeholder="Nombre"
          :class="name ? 'activeInput' : ''"
        />
        <br />
        <!-- Email -->
        <input
          class="loginInput mb-8 rounded-lg"
          type="email"
          v-model="email"
          placeholder="Correo Electronico"
          :class="email ? 'activeInput' : ''"
        />
        <br />
        <!-- Password Input -->
        <input
          class="loginInput mb-8 rounded-lg shadow-md"
          type="password"
          v-model="password"
          placeholder="Contraseña"
          :class="password ? 'activeInput' : ''"
        />
        <br />
        <!-- Confirm Password Input -->
        <input
          class="loginInput mb-10 rounded-lg shadow-md"
          type="password"
          v-model="confirmation"
          placeholder="Confirmar Contraseña"
          :class="confirmation ? 'activeInput' : ''"
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
            Registar Usuario
          </button>
        </div>
      </form>
    </div>
    <div class="sidePanelLogin flex-1 container mx-auto flex">
      <div class="block p-5 m-auto">
        <img src="../assets/img/login_side_art.svg" class="sideImage mx-auto" />
        <div class="flex">
          <!-- Cancel Button -->
          <button
            class="registerButton rounded-lg shadow-md mx-auto"
            type="button"
            @click="$router.push({ name: 'login' })"
          >
            Iniciar Sesión
          </button>
        </div>
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

<style lang="sass" scoped></style>
