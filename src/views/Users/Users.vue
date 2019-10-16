<script type="text/javascript" src="./Users.js"></script>
<style lang="sass" src="./Users.sass" scoped></style>

<template lang="html">
  <div id="orders">
    <h1 class="text-5xl px-5 pb-5 mx-5 mb-5">
      Usuarios
    </h1>

    <!-- Users List -->
    <div
      v-if="!$apollo.queries.users.loading"
      class="flex flex-wrap content-center p-5 m-5"
    >
      <!-- Users Cards -->
      <UserCard v-for="user in usersList" :key="user.id" :user="user" />
    </div>
    <div v-else>
      <span>Loading...</span>
    </div>
  </div>
</template>
