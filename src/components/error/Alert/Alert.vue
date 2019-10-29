<script type="text/javascript" src="./Alert.js"></script>
<style lang="sass" src="./Alert.sass" scoped></style>

<template lang="html">
  <div
    id="alert"
    v-if="this.msg"
    class="flex center text-white px-4 py-3 rounded-lg shadow-md m-auto"
    role="alert"
  >
    <i class="ti-alert text-4xl rounded-full p-2"></i>
    <p class="text-lg font-medium">&nbsp;{{ this.msg }}</p>
  </div>
</template>
