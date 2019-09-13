<template>
  <div class="home">
    <NavBar />
    <div class="container mx-auto px-4">
      <img alt="Vue logo" src="../assets/logo.png" />
      <Hello msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Hello from "@/components/Hello.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "home",
  components: {
    NavBar,
    Hello
  }
};
</script>
