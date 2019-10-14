<template>
  <div class="h-full">
    <NavBar v-if="this.me" />
    <div class="flex relative">
      <div class="w-1/7 static">
        <SideBar class="fixed" />
      </div>
      <div class="ml-24 w-6/7 w-full static">
        <RouterView v-if="this.me" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import NavBar from '@/components/nav/NavBar';
import SideBar from '@/components/nav/SideBar';

export default {
  name: 'Home',

  components: {
    NavBar,
    SideBar,
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
