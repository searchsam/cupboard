<template lang="html">
  <aside class="text-center relative sidebar bg-white h-full">
    <div class="block p-5">
      <span class="object-center font-semibold text-xl text-yellow-400">
        CupBoard
      </span>
    </div>
    <div>
      <router-link to="/orders" class="block hover:bg-yellow-400 p-5">
        ORDENES
      </router-link>
    </div>
    <div class=" inset-x-0 bottom-0 absolute hover:bg-gray-400">
      <a href="#" @click.prevent="logout" class="block p-5">
        SALIR
      </a>
    </div>
  </aside>
</template>

<script type="text/javascript">
import { onLogout } from '@/vue-apollo.js';

export default {
  name: 'NavBar',
  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="sass">
.sidebar
  flex-direction: column
</style>
