<template lang="html">
  <aside id="sidebar" class="text-center h-full">
    <div class="block p-5">
      <img src="../../assets/cupboard_logo.svg" class="h-24 m-auto">
      <span class="object-center font-semibold text-xl"></span>
    </div>
    <div class="static">
      <router-link
        to="/orders"
        class="route block rounded-lg hover:shadow-md"
        :class="currentRouteName == 'orders' ? 'active' : ''"
      >
        <i class="ti-receipt text-4xl"></i>
      </router-link>
      <router-link
        to="/pantry"
        class="route block rounded-lg hover:shadow-md"
        :class="currentRouteName == 'pantry' ? 'active' : ''"
      >
        <i class="ti-package text-4xl"></i>
      </router-link>
    </div>
    <div class="route inset-x-0 bottom-0 absolute rounded-lg hover:shadow-md">
      <a href="#" @click.prevent="logout" class="block">
        <i class="ti-shift-left text-4xl"></i>
      </a>
    </div>
  </aside>
</template>

<script type="text/javascript">
import { onLogout } from '@/vue-apollo';

export default {
  name: 'SideBar',

  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },

  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="sass">
@import ../../assets/css/library.sass

#sidebar
  flex-direction: column
  background-color: $blue
  color: $text-light

.route
  margin: 1rem
  padding: 1rem
  &:hover
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
    background-color: $white
    color: $text

.active
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
  background-color: $gray
  color: $text

.sysIcon
  margin: 1rem
  padding: 1rem
  &:hover
    border-radius: .5rem
    background-color: $blue-dark

</style>
