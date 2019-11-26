<script type="text/javascript" src="./SideBar.js"></script>
<style lang="sass" src="./SideBar.sass" scoped></style>

<template lang="html">
  <aside id="sidebar" class="text-center h-full top-0">
    <div class="block p-3">
      <img src="../../../assets/img/cupboard_logo.svg" class="h-20 m-auto" />
      <h1 class="object-center text-xl"></h1>
    </div>
    <div class="static">
      <!-- Ordenes -->
      <router-link
        to="/orders"
        class="route block rounded-lg hover:shadow-md"
        :class="currentRouteName == 'orders' ? 'active' : ''"
      >
        <i class="ti-receipt text-3xl"></i>
      </router-link>
      <!-- Despensa -->
      <router-link
        to="/pantry"
        class="route block rounded-lg hover:shadow-md"
        :class="currentRouteName == 'pantry' ? 'active' : ''"
      >
        <i class="ti-package text-3xl"></i>
      </router-link>
      <!-- Usuarios -->
      <router-link
        to="/users"
        class="route block rounded-lg hover:shadow-md"
        :class="currentRouteName == 'users' ? 'active' : ''"
        v-if="me.type <= 1"
      >
        <i class="ti-id-badge text-4xl"></i>
      </router-link>
    </div>
    <div class="route inset-x-0 bottom-0 absolute rounded-lg hover:shadow-md">
      <a href="#" @click.prevent="logout" class="block">
        <i class="ti-shift-left text-3xl"></i>
      </a>
    </div>
  </aside>
</template>
