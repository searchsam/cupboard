<template lang="html">
  <nav
    id="nav"
    class="navbar flex items-center justify-between flex-wrap p-6 shadow bg-white"
  >
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <img
        alt="Vue logo"
        src="@/assets/logo_nerdify.svg"
        class="fill-current h-8 w-8 mr-2"
        width="54"
        height="54"
      />
      <span class="font-semibold text-xl tracking-tight text-yellow-500">
        CupBoard
      </span>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          to="/home"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-yellow-500 mr-4"
        >
          Inicio
        </router-link>
        <router-link
          to="/order"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-yellow-500 mr-4"
          v-show="user_type <= 1"
        >
          Orden
        </router-link>
        <router-link
          to="/request"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-yellow-500 mr-4"
        >
          Solicitud
        </router-link>
      </div>
      <div>
        <a
          href="#"
          @click.prevent="logout"
          class="inline-block text-sm px-4 py-2 leading-none hover:text-black mt-4 lg:mt-0"
        >
          Salir
        </a>
      </div>
    </div>
  </nav>
</template>

<script type="text/javascript">
import Vue from "vue";
import { onLogout } from "@/vue-apollo.js";

export default {
  name: "NavBar",
  data: () => ({
    user_type: Vue.prototype.$authUserType
  }),
  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      Vue.prototype.$authUser = null;
      Vue.prototype.$authUserType = null;
      this.$router.push({ name: "login" });
    }
  }
};
</script>
