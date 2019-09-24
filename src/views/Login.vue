<template lang="html">
  <div id="login" class="container mx-auto px-4 p4">
    <form
      id="login"
      class="p-4"
      action=""
      method="POST"
      @submit.prevent="login()"
    >
      <!-- Email Input -->
      <div class="mb-4">
        <input
          class="h-12 border"
          type="email"
          v-model="username"
          name="username"
          placeholder="Email"
        />
      </div>
      <!-- Password Input -->
      <div class="mb-4">
        <input
          class="h-12 border"
          name="password"
          type="password"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <!-- Error Message -->
      <div
        v-if="error"
        class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
        role="alert"
      >
        <p>{{ error }}</p>
      </div>
      <!-- Submit Button -->
      <div class="mb-4">
        <button class="h-12 w-48 border bg-blue-400 text-white" type="submit">
          Iniciar Sesion
        </button>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
import { onLogin } from "@/vue-apollo.js";

export default {
  name: "login",
  data() {
    return {
      error: null,
      password: "",
      username: ""
    };
  },
  methods: {
    login() {
      this.$apollo
        .mutate({
          mutation: require("@/graphql/LoginMutation.gql"),
          variables: {
            data: { username: this.username, password: this.password }
          },
          update: (store, { data: { login } }) => {
            onLogin(this.$apollo.provider.defaultClient, login.accessToken);
            localStorage.setItem("auType", login.user.type);
          }
        })
        .then(() => {
          this.$router.push({ name: "orders" });
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style lang="sass" scoped>
form
  font-weight: bold
</style>
