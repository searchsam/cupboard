<template>
  <div class="about">
    <NavBar />
    <div class="container mx-auto px-4">
      <h1>This is an about page</h1>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "about",
  components: {
    NavBar
  }
};
</script>
