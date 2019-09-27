<template>
  <div class="flex h-full">
    <div class="w-1/7">
      <NavBar />
    </div>
    <div class="w-6/7 w-full m-5">
      <RouterView v-if="this.me" />
    </div>
  </div>
</template>

<script type="text/javascript">
import NavBar from '@/components/nav/NavBar.vue';
export default {
  name: 'Home',

  components: {
    NavBar,
  },

  apollo: {
    me: {
      query: require('@/graphql/queries/CurrentUser').default,
    },
  },

  provide() {
    const data = {};

    Object.defineProperty(data, 'me', {
      enumerable: true,
      get: () => {
        return this.me;
      },
    });

    return data;
  },
};
</script>

<style lang="sass" scoped></style>
