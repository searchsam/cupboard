<script type="text/javascript" src="./Home.js"></script>
<style lang="sass" src="./Home.sass" scoped></style>

<template lang="html">
  <div class="h-full">
    <NavBar v-if="this.me" />
    <div class="flex relative">
      <div class="w-1/7 static">
        <SideBar class="fixed" v-if="this.me" />
      </div>
      <div class="ml-24 w-6/7 w-full static">
        <RouterView v-if="this.me" />
      </div>
    </div>
  </div>
</template>
