<template>
  <body id="app" class="h-screen">
    <div class="flex h-full">
      <div class="w-1/6"><NavBar /></div>
      <div class="w-5/6 w-full m-5"><RouterView /></div>
    </div>
  </body>
</template>

<script type="text/javascript">
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar
  }
};
</script>

<style lang="sass">
@tailwind base
@tailwind components
@tailwind utilities

@import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,300,400,700)

body
    font-family: 'Open Sans', sans-serif
    background-color: #F5F5F5
</style>
