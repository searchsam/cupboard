<template lang="html">
  <form class="p-4" action="" method="POST" @submit.prevent="login()">
    <div class="mb-4">
      <input
        class="h-12 border"
        type="email"
        v-model="username"
        name="username"
        placeholder="Email"
      />
    </div>
    <div class="mb-4">
      <input
        class="h-12 border"
        name="password"
        type="password"
        v-model="password"
        placeholder="Password"
      />
    </div>
    <div
      v-if="error"
      class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
      role="alert"
    >
      <p>An error occurred: {{ error }}</p>
    </div>
    <div class="mb-4">
      <button class="h-12 w-48 border bg-blue-400 text-white" type="submit">
        Login
      </button>
    </div>
  </form>
</template>

<script type="text/javascript">
import Vue from "vue";
import { onLogin } from "@/vue-apollo.js";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      error: null
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
            onLogin(this.$apollo.provider.defaultClient, login.access_token);
            Vue.prototype.$authUser = login.user.id;
            Vue.prototype.$authUserType = login.user.type;
          }
        })
        .then(() => {
          this.$router.push({ name: "home" });
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
