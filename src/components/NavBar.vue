<template lang="html">
  <div id="nav">
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <a href="#" @click.prevent="logout">Logout</a>
  </div>
</template>

<script>
import { onLogout } from "../vue-apollo.js";

export default {
  name: "NavBar",
  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      this.$router.push("/");
    }
  }
};
</script>
