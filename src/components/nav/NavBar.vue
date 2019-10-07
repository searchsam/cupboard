<template lang="html">
  <aside class="text-center relative sidebar bg-white h-full shadow">
    <div class="block p-5">
      <span class="object-center font-semibold text-xl text-yellow-400">
        CupBoard
      </span>
    </div>
    <div>
      <router-link
        to="/orders"
        class="route block rounded-lg hover:bg-yellow-400 hover:shadow"
      >
        ORDENES
      </router-link>
      <router-link
        to="/pantry"
        class="route block rounded-lg hover:bg-yellow-400 hover:shadow"
      >
        DESPENSA
      </router-link>
    </div>
    <div
      class="route inset-x-0 bottom-0 absolute rounded-lg hover:bg-gray-400 hover:shadow"
    >
      <a href="#" @click.prevent="logout" class="block">
        SALIR
      </a>
    </div>
  </aside>
</template>

<script type="text/javascript">
import { onLogout } from '@/vue-apollo';

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

.route
  margin: 1rem
  padding: 1rem
</style>
