<script type="text/javascript" src="./NavBar.js"></script>
<style lang="sass" src="./NavBar.sass" scoped></style>

<template lang="html">
  <nav class="flex center justify-between flex-wrap p-6">
    <div class="block flex-grow flex">
      <div class="flex-grow"></div>
      <div class="flex">
        <span class="block mx-3" v-if="me.type <= 1">
          <i class="bg-white iconPill" :class="userType.icon"></i>
          <h1 class="inline bg-white labelPill">{{ userType.type }}</h1>
        </span>
        <span class="block mx-3">
          <i class="ti-user mr-3 hackergotchi"></i>
          <p class="inline font-medium">{{ me.name }}</p>
        </span>
      </div>
    </div>
  </nav>
</template>
