<template lang="html">
  <nav class="flex center justify-between flex-wrap p-6">
    <div class="block flex-grow flex">
      <div class="flex-grow"></div>
      <div class="flex">
        <span class="block mx-3" v-if="me.type <= 1">
            <i class="ti-wand bg-white iconPill"></i>
            <h1 class="inline bg-white labelPill">{{ userType }}</h1>
        </span>
        <span class="block mx-3">
          <i class="ti-user mr-3 hackergotchi"></i>
          <p class="inline font-medium">{{ me.name }}</p>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',

  inject: ['me'],

  data() {
    return {
      explicitUserType: this.me.type
    };
  },

  computed: {
    userType() {
        return {
          0: "SUPER ADMIN",
          1: "ADMIN",
          2: "CLIENTE",
      }[this.explicitUserType];
    }
  }
};
</script>

<style lang="sass" scoped>
@import ../../assets/css/library.sass

.hackergotchi
  padding: .6rem
  background-color: $blue-dark
  border-radius: 9999px
  color: $text-light
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)

.iconPill
  background-color: $white
  padding: .6rem .3rem .7rem .8rem
  border-top-left-radius: 9999px
  border-bottom-left-radius: 9999px

.labelPill
  background-color: $white
  padding: .5rem .8rem .5rem .3rem
  border-top-right-radius: 9999px
  border-bottom-right-radius: 9999px

</style>
