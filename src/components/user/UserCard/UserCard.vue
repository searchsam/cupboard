<script type="text/javascript" src="./UserCard.js"></script>
<style lang="sass" src="./UserCard.sass" scoped></style>

<template lang="html">
  <div
    id="usercard"
    class="card-order content-center w-auto mr-6 mb-6 relative"
  >
    <div class="cardContent p-5 rounded-lg bg-white shadow-md">
      <div class="mx-auto block header w-full flex mb-5">
        <i
          class="ti-user text-5xl m-auto p-6 rounded-full text-white userBadge shadow-md"
        ></i>
      </div>
      <div class="block flex">
        <h1 class="text-2xl mx-auto">
          {{ user.name }}
        </h1>
      </div>
      <div class="block flex">
        <span class="block m-auto rounded-full px-2 typePill shadow-md">
          <i class="mr-2" :class="userType.icon"></i>
          <p class="inline font-semibold">{{ userType.type }}</p>
        </span>
      </div>
      <div class="block flex mt-3">
        <p class="text-lg m-auto">
          <i class="ti-calendar mr-2"></i>
          {{ user.createdAt.split(' ')[0] }}
        </p>
      </div>
    </div>

    <div
      class="cardFooter absolute my-auto top-0 right-0 table-row"
      v-if="user.type > 1"
    >
      <a href="#" type="button" class="rounded-full p-2" @click="doAdmin">
        <i class="ti-wand text-2xl"></i>
      </a>
    </div>

    <Alert :msg="error" />
  </div>
</template>
