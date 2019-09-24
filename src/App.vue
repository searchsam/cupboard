<template>
  <body id="app">
    <NavBar />
    <RouterView />
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
    // color: #C7C7C7
    background-color: #f5f5f5
    // font-weight: bold
</style>
