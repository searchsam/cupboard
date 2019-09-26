<template>
  <div class="flex h-full">
    <div class="w-1/7"><NavBar /></div>
    <div class="w-6/7 w-full m-5"><RouterView /></div>
  </div>
</template>

<script type="text/javascript">
import NavBar from "@/components/NavBar.vue";
export default {
  name: "home",
  components: {
    NavBar
  }
};
</script>

<style lang="sass" scoped></style>
