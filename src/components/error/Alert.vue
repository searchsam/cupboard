<template lang="html">
  <div
    id="alert"
    v-if="this.msg"
    class="flex items-center text-white px-4 py-3 rounded-lg shadow-md"
    role="alert"
  >
    <i class="ti-alert text-4xl rounded-full p-2"></i>
    <p class="text-lg font-medium">&nbsp;{{ this.msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    msg: {
      type: String,
    },
  },
};
</script>

<style lang="sass" scoped>
@import ../../assets/css/library.sass

#alert
  background-color: $red
</style>
