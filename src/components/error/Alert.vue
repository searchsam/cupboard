<template lang="html">
  <div
    id="alert"
    v-if="this.msg"
    class="flex items-center bg-red-400 text-white px-4 py-3 rounded-lg shadow"
    role="alert"
  >
    <i class="pe-7s-attention pe-2x pe-va"></i>
    <p>{{ this.msg }}</p>
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

<style lang="sass" scoped></style>
